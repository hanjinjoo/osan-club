import {initNavigation} from './navigation.js';
import {renderServices} from './service-renderer.js';

function boot(){
  renderServices();
  initNavigation();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
