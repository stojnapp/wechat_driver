import 'babel-polyfill'
import * as FastClick from "fastclick"
import App from './App.vue'
import router from './router'
import {vantTool} from '@/function/commonTools'
import functions from '@/function/function'
import rem from '@/rem/rem'
import wechat from '@/function/wechat';
import store from '@/store/store'


FastClick.attach(document.body)

Vue.config.productionTip = false;
Vue.prototype.$Wechat=wechat;
Vue.prototype.$Tools = vantTool;
Vue.prototype.$Functions = functions;

import Nodate from '@/components/nodata'
Vue.component('Nodate', Nodate)
// var code=wechat.getCode();
new Vue({
        store,
        router,
    render: h => h(App)
}).$mount('#app')