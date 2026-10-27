import {initNavigation} from './navigation.js';
import {renderServices} from './service-renderer.js?v=20261027-showcase';

function boot(){
  renderServices();
  initNavigation();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
