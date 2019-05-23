<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view v-if="show"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data(){
    return {
       openId:null,
        phone:null,
        show:false,
    }
  },
  created () {
     var _self=this;
        // 生产获取openid
        var code = _self.$Wechat.getUrlCode().code
             if (code == null || code === ''){
               _self.$Wechat.redirectUrl();
               return ;
             }
             _self.$store.dispatch('getConfig', {code})
            .then(res=>{
                if(!res){
                    return ;
                }else{
                  if(res.success){
                      _self.openId=res.data.openid;
                      _self.$store.state.openId=res.data.openid;
                      _self.$store.dispatch('getPhone',{openId:_self.openId})
                      .then(phone=>{
                          if(!phone){
                            //跳转到绑定
                            _self.$router.push({name:'changebind',params:{title:'绑定手机号',type:'bind'}})
                          }else{
                              _self.$store.state.phone=phone;
                              _self.phone=_self.$store.state.phone;
                              //更换
                              _self.$router.push({name:'home'})
                          }
                          _self.show=true;
                      })

                  }
                }
                
            })

  },
  mounted() {
    var _self=this;
    window.addEventListener("popstate", function(e) {  //回调函数中实现需要的功能
     _self.$Wechat.redirectUrl();
    }, false);
  },  
}
</script>
<style type="text/css">
@import '~assets/css/reset.css';
@import '~assets/css/common.css';
</style>


