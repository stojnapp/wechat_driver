import 'babel-polyfill'
import * as FastClick from "fastclick"
import App from './App.vue'
import router from './router'
import rem from '@/rem/rem'
FastClick.attach(document.body)

Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')