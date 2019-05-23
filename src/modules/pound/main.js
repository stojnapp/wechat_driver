import 'babel-polyfill'
import * as FastClick from "fastclick"
import App from './App.vue'
import router from './router'
import {vantTool} from '@/function/commonTools'
import functions from '@/function/function'
import rem from '@/rem/rem'
import store from '@/store/store'
import Nodate from '@/components/nodata'
Vue.component('Nodate', Nodate)

import vMessage from '@/components/tips/tip' 
Vue.use(vMessage)


FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$Tools = vantTool;
Vue.prototype.$Functions = functions;
import wechat from '@/function/wechat';
Vue.prototype.$Wechat=wechat;
// var code=wechat.getCode();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')