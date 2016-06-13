/**
 * Created by namdv on 12/06/2016.
 */
import Riot from 'riot';
import '../../tags/helloword.tag';
import AjaxHelper from "../lib/vtracAjaxHelper.js";
Riot.mount('#helloTag','hello-word',{title:'Nam',ajaxHelper:new AjaxHelper()});
