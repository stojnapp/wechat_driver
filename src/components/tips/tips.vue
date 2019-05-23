<template>
        <div id="tips_layer_box">
              <van-popup ref="tips" class="layer_tips">
                  <div class="layer_content">
                      <h4>{{title}}</h4>
                      <img src="~assets/img/phone_illustration@3x.png" alt="">
                      <p class="text_c f_30 text_333">{{info}}</p>
                      <div class="btn_box">
                          <!-- <button @click.self.stop="cancel">取消</button> -->
                          <button @click="do_btn" class="active" style="flex:0.6">{{suretext}}</button>
                      </div>
                  </div>
              </van-popup>
        </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'message',
    props: {
       title:{
          type: String, 
          default: '温馨提示',
       }, 
      info: {
        type: String,
        default: '您还未绑定手机号 请先绑定手机号！',
      },
      suretext: {
        type: String,
        default: '去绑定'
      },
      type: {
        type: String,
        default: 'info',
        validator: val => ['info', 'success', 'warning', 'error'].includes(val)
        //['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
      },
      params:{
        //如果是单页面路由则跳转，如果是地址则跳转url
        //type@url 则启用
        type: Object,
        default: function () {
            return {type:'url',router:'http://www.baidu.com'}
        }
      }
    },
    methods:{
        do_btn(){
            var _self=this;
            switch(_self.params.type){
                case 'url':
                window.location.href=_self.params.router;
                break;
                case 'vue':
                _self.$router.push({path:_self.params.router});
                break;
                default:
                _self.$Tools.sendMessage('参数错误！');
                break;
            }
        },
        cancel(){
          this.$nextTick(()=>{
             var tipsbox=document.querySelector('#tips_layer_box');
              if(tipsbox){
                tipsbox.parentNode.removeChild(tipsbox);
              }
          })
        }
    }
}
</script>

<style type="text/css" scope>
@import '~@/modules/index/css/task.css';
  .fade-enter-active,
  .fade-leave-active {transition: opacity .3s} 
  .fade-enter,
  .fade-leave-to{
         opacity: 0
     }
  .layer_tips_hiddden{
    display: none
  }
  #tips_layer_box{
    height:100%;
    width: 100%;
    z-index:999;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    box-shadow: 0px 0px 0.40rem rgba(128,128,128,0.4)
  }
</style>


