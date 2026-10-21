import {SERVICES} from '../../data/services.js';
import {NOTICES} from '../../data/notices.js';

const ICONS = Object.freeze({
  documents:'<rect x="4" y="3" width="11" height="15" rx="2"/><path d="M8 7h3M8 11h3M16 8h4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1M13 15h4"/>',
  rules:'<path d="M4 5.4C6.5 4.4 9 4.8 12 6.6c3-1.8 5.5-2.2 8-1.2v14c-2.5-1-5-.6-8 1.2-3-1.8-5.5-2.2-8-1.2zM12 6.6v14"/><path d="M7 9h2M7 12h2M15 9h2M15 12h2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15l3 3 5-5"/>',
  game:'<path d="M6 10h12c1.8 0 3 1.3 3.5 3.2l1 3.8c.4 2-1.9 3.4-3.5 2.1L16 17H8l-3 2.1C3.4 20.4 1.1 19 1.5 17l1-3.8C3 11.3 4.2 10 6 10Z"/><path d="M7 13v5M4.5 15.5h5M16 13.5h.01M19 16h.01"/>'
});
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.65" aria-hidden="true">${ICONS[name]||ICONS.documents}</svg>`;
const escapeText=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function destination(href){
  if(!href)return null;
  const url=new URL(href);
  if(url.protocol!=='https:'||url.hostname!=='hanjinjoo.github.io')throw new Error('승인되지 않은 서비스 URL입니다.');
  return url.href;
}
function serviceCard(service){
 const active=service.status==='active';
 const link=active?destination(service.href):null;
 const tag=active?'바로 이용':'개발 예정';
 const content=`<div class="service-card__top"><span class="service-card__icon service-card__icon--${escapeText(service.tone)}">${icon(service.icon)}</span><span class="service-card__status ${active?'':'service-card__status--planned'}">${tag}</span></div><div class="service-card__content"><small>${escapeText(service.category)}</small><h3>${escapeText(service.title)}</h3><p>${escapeText(service.description)}</p></div><div class="service-card__bottom"><span>${escapeText(service.cta)}</span><span class="service-card__arrow" aria-hidden="true">${active?'↗':'·'}</span></div>`;
 return active?`<a class="service-card" href="${escapeText(link)}" target="_blank" rel="noopener noreferrer">${content}</a>`:`<article class="service-card service-card--planned" aria-label="${escapeText(service.title)} · 개발 예정">${content}</article>`;
}
function noticeRow(notice){
 const link=destination(notice.href);
 return `<a class="notice-row" href="${escapeText(link)}" target="_blank" rel="noopener noreferrer"><span class="notice-row__tag notice-row__tag--${escapeText(notice.tone)}">${escapeText(notice.tag)}</span><div class="notice-row__info"><strong>${escapeText(notice.title)}</strong><p>${escapeText(notice.description)}</p></div><span class="notice-row__arrow" aria-hidden="true">↗</span></a>`;
}
export function renderServices(){
 const servicesRoot=document.getElementById('services-grid');
 if(servicesRoot)servicesRoot.innerHTML=SERVICES.map(serviceCard).join('');
 const noticeRoot=document.getElementById('notice-list');
 if(noticeRoot)noticeRoot.innerHTML=NOTICES.map(noticeRow).join('');
}
