import 'babel-polyfill'
import * as FastClick from "fastclick"
import App from './App.vue'
import router from './router'
import {vantTool} from '@/function/commonTools'
import functions from '@/function/function'
import wechat from '@/function/wechat';
import rem from '@/rem/rem'
import store from '@/store/store'
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$Tools = vantTool;
Vue.prototype.$Functions = functions;
Vue.prototype.$Wechat=wechat;
var code=wechat.getCode();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')