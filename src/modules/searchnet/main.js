import 'babel-polyfill'
import * as FastClick from "fastclick"
import App from './App.vue'
import router from './router'
import {vantTool} from '@/function/commonTools'
import functions from '@/function/function'
import rem from '@/rem/rem'
import store from '@/store/store'
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$Tools = vantTool;
Vue.prototype.$Functions = functions;
import wechat from '@/function/wechat';

import vMessage from '@/components/tips/tip' 
Vue.use(vMessage)

Vue.prototype.$Wechat=wechat;
// wechat.getCode();//生产删除

new Vue({
    router,
    store,
    beforeCreate(){  
    },
    render: h => h(App)
}).$mount('#app')