import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SERVICES} from '../data/services.js';
import {NOTICES} from '../data/notices.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
test('서비스 목록은 한 곳에서 관리되고 ID가 중복되지 않는다',()=>{
 assert.equal(SERVICES.length,4);
 assert.equal(new Set(SERVICES.map(s=>s.id)).size,SERVICES.length);
 assert.deepEqual(SERVICES.filter(s=>s.status==='active').map(s=>s.id),['documents','rules','monitoring']);
 assert.equal(SERVICES.find(s=>s.id==='settlement-lab').href,null);
});
test('운영 중인 세 서비스 URL과 경로는 기존 사이트를 정확하게 참조한다',()=>{
 const paths=SERVICES.filter(s=>s.status==='active').map(s=>new URL(s.href).pathname);
 assert.deepEqual(paths,['/osan/','/osan/','/osan-monitoring-2026/']);
 assert.equal(new URL(SERVICES[0].href).hash,'#downloads');
 assert.equal(new URL(SERVICES[1].href).hash,'#rules');
});
test('공지 링크는 모두 신뢰된 기존 운영 사이트를 참조한다',()=>{
 assert.equal(NOTICES.length,3);
 for(const item of NOTICES){const url=new URL(item.href);assert.equal(url.protocol,'https:');assert.equal(url.hostname,'hanjinjoo.github.io')}
});
test('기본 화면 구성과 접근성 요소',()=>{
 const html=read('index.html');
 for(const value of ['lang="ko"','id="main-content"','id="services"','id="guide"','id="notices"','id="contact"','aria-expanded="false"','id="services-grid"','id="notice-list"','rel="stylesheet"','type="module"'])assert.ok(html.includes(value),value);
});
test('HTML에서 호출하는 모든 로컬 CSS·JavaScript 파일이 존재한다',()=>{
 const html=read('index.html');
 for(const [,ref] of html.matchAll(/(?:src|href)="(\.\/assets\/[^\"]+)"/g))assert.ok(fs.existsSync(path.join(root,ref)),ref);
});
test('메인 및 코드 구조는 기존 자료실 파일이나 Supabase 프로젝트에 의존하지 않는다',()=>{
 assert.equal(fs.existsSync(path.join(root,'supabase')),false);
 assert.equal(fs.existsSync(path.join(root,'files')),false);
 assert.ok(!read('assets/js/main.js').includes('SUPABASE_'));
});
test('자료실과 통합된 브랜드 디자인 토큰·서체·섹션 구성을 유지한다',()=>{
 const tokens=read('assets/css/tokens.css');
 const html=read('index.html');
 const layout=read('assets/css/layout.css');
 assert.ok(tokens.includes('--navy:#003876;'));
 assert.ok(tokens.includes('--navy-deep:#00234d;'));
 assert.ok(tokens.includes('Playfair Display'));
 assert.ok(tokens.includes('Noto Sans KR'));
 for(const item of ['Club<br>Portal','Services','How to Use','Notice'])assert.ok(html.includes(item),item);
 assert.ok(layout.includes('.site-header.is-solid'));
});
