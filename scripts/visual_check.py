from pathlib import Path
from playwright.sync_api import sync_playwright
import re
path=Path(__file__).resolve().parents[1]
html=(path/'index.html').read_text()
css='\n'.join((path/x).read_text() for x in ['assets/css/tokens.css','assets/css/base.css','assets/css/layout.css','assets/css/components.css'])
html=re.sub(r'<link rel="stylesheet"[^>]*>', '',html)
# 시각 회귀 검사에서는 원격 Google Fonts 다운로드를 기다리지 않는다.
html=re.sub(r'<link[^>]*href="https://fonts.googleapis.com[^"]*"[^>]*>', '',html)
html=re.sub(r'<link[^>]*href="https://fonts.gstatic.com[^"]*"[^>]*>', '',html)
html=re.sub(r'<script type="module"[^>]*></script>', '',html)
html=html.replace('</head>','<style>'+css+'</style></head>')
js='\n'.join(re.sub(r'^import .*?;\s*$', '',(path/x).read_text(), flags=re.MULTILINE).replace('export const ', 'const ').replace('export function ', 'function ') for x in ['data/services.js','data/notices.js','assets/js/service-renderer.js','assets/js/navigation.js'])+'\nrenderServices();initNavigation();'
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for name,w,h in [('desktop',1440,900),('mobile',390,844),('tablet',768,1024)]:
        page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.set_content(html,wait_until='load')
        page.evaluate(js)
        assert page.locator('.service-card').count()==4,(name,page.locator('.service-card').count())
        assert page.locator('.service-card[href]').count()==3
        assert page.locator('a[href="https://hanjinjoo.github.io/osan-monitoring-2026/"]').count()>=1
        assert not errors,errors
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),(name,page.evaluate('document.documentElement.scrollWidth'),w)
        if name=='mobile':
            assert page.locator('#primary-nav').evaluate('(e)=>!e.classList.contains("is-open")')
            page.locator('#nav-toggle').click()
            assert page.locator('#primary-nav').evaluate('(e)=>e.classList.contains("is-open")')
            assert page.locator('#nav-toggle').get_attribute('aria-expanded')=='true'
            page.locator('#primary-nav a[href="#services"]').click()
            assert page.locator('#nav-toggle').get_attribute('aria-expanded')=='false'
            page.evaluate('window.scrollTo(0,0)')
        screenshot=str(path.parent/f'osan-club-portal-{name}.png')
        page.screenshot(path=screenshot,full_page=True)
        print(name,'cards',page.locator('.service-card').count(),'width',page.evaluate('document.documentElement.scrollWidth'),'screenshot',screenshot,'errors',len(errors))
        page.close()
    browser.close()
