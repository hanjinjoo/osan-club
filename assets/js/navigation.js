/** 헤더 고정/스크롤 스타일 및 모바일 메뉴만 담당. 서비스 상태는 변경하지 않는다. */
export function initNavigation(){
 const header=document.getElementById('top');
 const toggle=document.getElementById('nav-toggle');
 const nav=document.getElementById('primary-nav');
 if(!header||!toggle||!nav)return;
 const updateHeader=()=>header.classList.toggle('is-solid',window.scrollY>36);
 const setOpen=open=>{
   toggle.setAttribute('aria-expanded',String(open));
   toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
   header.classList.toggle('is-open',open);
   nav.classList.toggle('is-open',open);
 };
 updateHeader();
 window.addEventListener('scroll',updateHeader,{passive:true});
 toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
 nav.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')setOpen(false)});
 document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!toggle.contains(event.target))setOpen(false)});
 window.addEventListener('resize',()=>{if(window.innerWidth>720)setOpen(false)});
}
