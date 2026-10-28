import {initNavigation} from './navigation.js';
import {renderServices} from './service-renderer.js?v=20261028-showcase-home';

function boot(){
  renderServices();
  initNavigation();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
