<!--新增备案-->
<template>
    <div id="box_content">
        <div class="main_box">
            <div class="addmark_title text_333 f_30 bg_white mb_20">
                <div class="mark_cell">
                    <span>运输任务单</span>
                    <div>{{info.shipMentNo}}</div>
                </div>
            </div>
            <div class="addmark_title text_999 f_30 bg_white mb_20">
                <div class="mark_cell ">
                    <span>运输线路</span>
                    <div>{{info.shipMentLineName}}</div>
                </div>
                <div class="mark_cell ">
                    <span>车牌号</span>
                    <div>{{info.vehicleNo}}</div>
                </div>
                <div class="mark_cell ">
                    <span>规定发车时间</span>
                    <div>{{info.planDepartureTime}}</div>
                </div>
            </div>
            <div class="addmark_title text_333 f_30 bg_white mb_20">
                <div @click="openType" class="mark_cell">
                    <span>备案类型</span>
                    <div class="mr_20">{{checkedType?checkedType.text:'请选择'}}</div>
                    <van-icon color="#999999" name="arrow" />
                </div>
            </div>

            <div class="full_box bg_white">
                <p class="text_333 f_30 mb_20">备案说明</p>
                <div class="clearfix" @click="focus_input">
                    <textarea class="f_30 mb_16" @blur="pageHeight" placeholder="请输入备案原因" ref="elInput" v-model="description"></textarea>
                    <p class="f_24 text_999 text_r">{{wordsize}}/{{maxinfosize}}</p>
                </div>
                <div class="upload_box">
                        <dl v-for="(item,index) in wxcheckedImg" :key="index">
                            <img :src="item" alt="" @click="getPicforshow(index)">
                            <div class="close" @click="delImg(index)"><img src="~assets/img/text-delete_black@3x.png" alt=""></div>
                        </dl>
                    <dl class="upload_btn needsclick" @click="getcameraForpic">
                        <dt></dt>
                        <dd>{{picStreamList.length}}/{{maxpic}}</dd>
                    </dl>
                </div>
            </div>
            <div class="footer_btn_box bg_white">
                <button @click="addRecordsInfo" class="btn_submit submit_btn_active">提交</button>
            </div>

        </div>

        <van-actionsheet v-model="show"  title="请选择备案类型">
        <van-picker :columns="type" @change="onChange"></van-picker>
        </van-actionsheet>

        
    </div>
    
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            description:'',
            licensePlate:'',
            maxinfosize:50,
            maxpic:3,
            info:null,
            type:[],
            checkedType:null,
            show:false,
            wxcheckedImg:[],
            picStreamList:[],//图片base64
            test:null,
            issubmiting:false
        }
    },
    created(){
        this.info=this.$route.params;
        this.getType();
    },
    mounted() {
        this.getWxconfig();
    },
    computed:{
        wordsize(){
            var count=0;
            if(this.description.length){
                count=this.description.length;
            }
            if(this.description.length>this.maxinfosize){
                this.description=this.description.substring(0,this.maxinfosize);
                return this.maxinfosize;
            }
            return count;
        }
    },
    methods:{
        //防止软键盘压缩页面布局
        pageHeight(){
            setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
        },

        focus_input(){
            this.$refs.elInput.focus()//显示键盘
        },

        openType(){
            if(!this.checkedType){
                this.checkedType=this.type[0];
            }
            this.show=true;
        },
        addRecordsInfo(){
            if(!this.checkedType){
                this.$Tools.sendMessage('请您选择备案类型！');
                return ;
            }
            if(this.issubmiting){
                this.$Tools.sendMessage('请勿重新提交!');
                return ;
            }
            this.issubmiting=true;
            this.$store.dispatch('addTransportRecord',{
                openId:this.openId,
                transportOrder:this.info.shipMentNo,
                transportLine:this.info.shipMentLineName,
                licensePlate:this.info.vehicleNo,
                departureTime:this.info.planDepartureTime,
                secondCategoryId:this.checkedType.id,
                description:this.description,
                picStreamList:this.picStreamList
                })
            .then(res=>{
                this.issubmiting=false;
                if(res.respCode=='000'){
                    this.$Tools.sendMessage(res.resMessage);
                    this.$router.push({name:'home'});
                }else{
                     this.$Tools.sendMessage(res.resMessage);
                }
            })    
        },

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
                wx.error(function(res){
                    _self.$Tools.sendMessage('微信JDK配置有误！'+res.errMsg);
                });

            })
        },

        //拍照选择图片
        getcameraForpic(){
            var _self=this;
            if(_self.picStreamList.length>=_self.maxpic){
                _self.$Tools.sendMessage(`最多可传${_self.maxpic}张图片！`);
                return ;
            }
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'],
                sourceType: ['camera'],
                success: function (res) {
                    var localIds = res.localIds;
                    _self.getBaseImg(localIds);
                }
            });
        },

        //获取base64 图片
        getBaseImg(localId){
            var _self=this;
            for(var i=0;i<localId.length;i++){
                _self.wxcheckedImg.push(localId[i]);
                wx.getLocalImgData({
                    localId: localId[i], // 图片的localID
                    success: function (res) {
                        // var localData = _self.codeForBase64(res.localData); // localData是图片的base64数据，可以用img标签显示
                        var localData;
                        if (window.__wxjs_is_wkwebview) { // 如果是IOS，需要去掉前缀
                            localData = res.localData.replace('jpg', 'jpeg');
                        } else {
                            localData = 'data:image/jpeg;base64,' + res.localData;
                        }
                        localData = _self.codeForBase64(localData);
                        _self.picStreamList.push(localData)
                    }
                });
            }
        },

        //上传图片到微信服务器
        uploadImgTowx(localId){
            wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                }
            });
        },


        //下载图片
        downLoadImg(){
            wx.downloadImage({
                serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var localId = res.localId; // 返回图片下载后的本地ID
                }
            });
        },




        //格式化base64代码
        codeForBase64(code){
            var strs=code.split(",")[1]; //字符分割
            return strs;
        },


        //预览图片,需要使用和下载 把图片放到本地 然后预览
        getPicforshow(index){
            var _self=this; 
            wx.previewImage({
                current: _self.wxcheckedImg[index], // 当前显示图片的http链接
                urls: _self.wxcheckedImg // 需要预览的图片http链接列表
            });
        },



        getType(){
            this.$store.dispatch('searchRecordType',{openId:this.openId})
            .then(res=>{
               this.type=this.pickerFormatter(res.data);
            })
        },
        pickerFormatter(data){
            var back=[];
            if(data){
                for(let i=0;i<data.length;i++){
                    back.push({text:data[i].categoryName,id:data[i].id})
                }
            }
            return back;
        },
        onChange(picker, value, index){
            this.checkedType=value;
        },
        delImg(index){
            if(this.picStreamList&&this.picStreamList.length>0){
                this.picStreamList.splice(index,1) 
                this.wxcheckedImg.splice(index,1) 
            }
        },
      


    }

}
</script>
<style type="text/css" scope>
    @import '../css/addmark.css';
</style>


