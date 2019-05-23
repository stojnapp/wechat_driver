<!--备案详情-->
<template>
    <div id="box_content">
        <div class="main_box markshow" v-if="info">
            <dl>
                <dt>备案信息</dt>
                <dd>
                    <span>备案类型</span>
                    <div>{{info.secondCategoryName}}</div>
                </dd>
                <dd>
                    <span>备案时间</span>
                    <div>{{info.beginTime}}</div>
                </dd>
                <dd>
                    <span>备案说明</span>
                    <div>
                        <p>
                            {{info.description}}
                        </p>
                        <template v-if="info.accessory&&info.accessory.length">
                            <div class="img_list pt_32">
                                <img v-for="(imgitem,itemindex) in info.accessory" @click="previewImageForshow(imgitem.attachmentPath)" :key="itemindex" :src="imgitem.attachmentPath" alt="">
                            </div>
                        </template>
                    </div>
                    
                </dd>
            </dl>
            <dl>
                <dt>审核信息</dt>
                <dd>
                    <span>审核状态</span>
                    <div>{{info.auditType|checkeState}}</div>
                </dd>
                <dd>
                    <span>当前审核网点</span>
                    <div>{{info.auditSite?info.auditSite:'暂无'}}</div>
                </dd>
            </dl>
            <dl v-if="info.dynamicField&&info.dynamicField.length">
                <dt>运输任务</dt>
                <dd v-for="(item,index) in info.dynamicField" :key="index">
                    <span>{{item.fieldName}}</span>
                    <div>{{item.fieldValue}}</div>
                </dd>
            </dl>
        </div>
    </div>    
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
   mixins:[CheckedOpenID],
   data() {
       return {
           index:0,
           info:null,
           registrationCode:null
       }
   }, 
   created () {
       this.registrationCode=this.$route.params.registrationCode;
   },
   mounted () {
       this.getWxconfig()
   },
   methods:{
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
                    jsApiList: ['getLocation','openLocation','chooseImage','uploadImage','getLocalImgData','previewImage'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function(){
                   _self.getRecordDetail();
                })
                wx.error(function(res){
                    _self.$Tools.sendMessage('微信JDK配置有误！'+res.errMsg);
                });

            })
        },

        //获取备案详情
        getRecordDetail(){
            this.$store.dispatch('getRecordshow',{openId:this.openId,registrationCode:this.registrationCode})
            .then(res=>{
                console.info(res,'res')
                if(res.data){
                    this.info=res.data;
                    console.info(this.info,'show')
                }
            })
        },

        //过滤预览图片列表
        getpreviewlist(){
            var _self=this;
            var imglist=[];
            if(_self.info.accessory&&_self.info.accessory.length){
                for (let index = 0; index < _self.info.accessory.length; index++) {
                    imglist.push(_self.info.accessory[index].attachmentPath);
                }
            }
            return imglist;
        },

        previewImageForshow(current){
            var _self=this; 
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: _self.getpreviewlist() // 需要预览的图片http链接列表
            });
        }

   }
   
}
</script>
<style scoped>
    @import '../css/addmark.css';
</style>

