<!--打卡查询-->
<template>
    <div id="box_content">
        <div class="main_box user_main bg_white">
           <div class="userinfo">
               <img src="~assets/img/phone_illustration@3x.png" alt="">
               <p class="pt_64 pb_50">
                   <cite class="text_666 f_30">当前手机号：</cite>
                   <span class="text_333 f_48">{{$store.state.phone}}</span>
               </p>
               <div class="warning_text">
                   若更换手机号，账号信息不会受到影响。请确认更换手机号和梧桐系统维护手机号一致。
               </div>
               <button @click="$router.push({name:'changebind',params:{title:'更换手机号',type:'changebind'}})">更换手机号</button>
               <button class="close mt_18" @click="closewindowForwx">回到主页</button>
           </div>
        </div>
    </div>
</template>
<script>
import {UserMixin} from '@/mixins/user.mixin'
export default {
    mixins:[UserMixin],
    data(){
        return{
           
        }
    },
    created () {
        if(this.$store.state.phone){
            this.$router.push({name:'home'})
        }
    },
    mounted() {
        
    },
    computed:{
       
    },
    methods:{
       
        //微信jdk配置
        getWxconfig(){
            var _self=this;
            //注意 获取配置信息的url一定不能有hash部分
            this.$store.dispatch('getJdk',{pageUrl:window.location.href.split('#')[0],openId:_self.openId})
            .then(res=>{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId,
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名
                    jsApiList: ['getLocation','openLocation','closeWindow'] // 必填，需要使用的JS接口列表
                });
                 wx.ready(function(){
                 })
                wx.error(function(res){
                    _self.$Tools.sendMessage('微信JDK配置有误！'+res.errMsg);
                });

            })
        },

        closewindowForwx(){
            wx.closeWindow();
        }

    }

}
</script>
<style type="text/css" scope>
    @import '../css/user.css';
</style>


