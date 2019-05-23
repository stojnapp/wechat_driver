<!--网点查询-->
<template>
    <div id="box_content">
        <div class="search_header bt-b">
            <div class="input_box" @click="focus_input">
                <input type="text"  v-model="search" ref="elInput" placeholder="请输入查询地址">
                <div v-if="clearbtn" @click="clearSearch" class="clear_btn"><img src="~assets/img/text-delete_black@3x.png" alt=""></div>
            </div>
            <button @click="getlist">检索</button>
        </div>
        <div class="main_box bg_white search_list">
            <template v-if="searchlist&&searchlist.length">
                <div v-for="(item,index) in searchlist" :key="index" @click="guideFun(item.latitude,item.longitude,item.fullName)" class="search_cell bt-b-32">
                    <span>{{item.fullName}}</span>
                    <img src="~assets/img/position@3x.png" alt="">
                </div>
                <div @click='clearData' class="search_cell bt-b" v-show="searchlist.length">
                    <span class="f_26 text_999 text_c" style="flex:1">清空检索历史</span>
                </div>
            </template>
            <div v-if="searchlist&&!searchlist.length" class="f_30 text_999 text_c pt_64">未找到您需要的结果...</div>
            
        </div>
    </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            search:'',
            searchlist:null
        }
    },
    mounted() {
      this.getWxjdk();  
    },
    computed:{
        clearbtn(){
            var back=false;
            if(this.search&&this.search.length){
                back=true;
            }
            return back;
        },
    },
    methods:{
        clearSearch(){
            this.search='';
        },
        focus_input(){
            this.$refs.elInput.focus()//显示键盘
        },
        getWxjdk(){
            var _self=this;
            //注意 获取配置信息的url一定不能有hash部分
            this.$store.dispatch('getJdk',{pageUrl:window.location.href.split('#')[0],openId:this.openId})
            .then(res=>{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId,
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名
                    jsApiList: ['getLocation','openLocation'] // 必填，需要使用的JS接口列表
                });
                 wx.ready(function(){
                        
                 })
                wx.error(function(res){
                    _self.$Tools.sendMessage('微信JDK配置有误！'+res.errMsg);
                });
            })
        },

        getlist(){
            if(!this.search){
                this.$Tools.sendMessage('请输入检索关键词！');
                return ;
            }
            this.searchlist=null;
            this.$store.dispatch('getLocationList',{fullName:this.search,openId:this.openId})
            .then(res=>{
                this.searchlist=res.data;
            })
        },
        clearData(){
            this.search='';
            this.searchlist=null;
        },
        guideFun(latitude,longitude,fullName){
            if(!latitude||!longitude||!fullName){
                this.$Tools.sendMessage('缺少导航参数！');
                return ;
            }

            latitude=parseFloat(latitude);
            longitude=parseFloat(longitude)

            // latitude=31.532425;
            // longitude=120.925388;
            
            wx.openLocation({
                latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                name: fullName, // 位置名
                address: '', // 地址详情说明
                scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            }); 
        }
    }

}
</script>
<style type="text/css" scope>
    @import '~assets/css/searchHeader.css';
    @import '../css/net.css';
</style>


