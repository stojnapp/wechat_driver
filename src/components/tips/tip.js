import Tips from '@/components/tips/tips.vue'
const MESSAGE = {
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('Message', Tips)
    function msg(type,info,params={type:'url',router:'aaa'},title,suretext) {
      let VueMessage = Vue.extend({
        render(h) {
          let props = {
            title,
            type,
            info,
            suretext,
            params,
            show: this.show
          }
          return h('message', {props})
        },
        data() {
          return {
            show: true
          }
        }
      })
      let newMessage = new VueMessage()
      let vm = newMessage.$mount()
      let el = vm.$el
      document.body.appendChild(el) // 把生成的提示的dom插入body中
      vm.show = true
    }

// 挂载到vue原型上，暴露方法
    Vue.prototype.$message = {
      info(text, params) {
        if (!text) return
        msg('info',text,params)
      },
    } 
  }
}
export default MESSAGE