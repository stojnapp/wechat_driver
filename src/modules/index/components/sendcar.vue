<!--发车-->
<template>
    <div id="box_content" class="bg_white pos_r">
        <div class="main_box bg_white" id="map">

        </div>
        <div @click="resetMap" class="map_btn_refresh"></div>
        <div class="info_box">
            <div class="info_content">
                <div class="openmore bt-b" @click="showmore">
                    <img v-if="more" src="~assets/img/arrow_off@3x.png" alt="">
                    <img v-else src="~assets/img/arrow_on@3x.png" alt="">
                </div>
                <div class="info_detail bt-b" v-show="more">
                    <template v-if="overview">
                        <div class="cell_info">
                            <img src="~assets/img/car_task@3x.png" alt="">
                            <div>运输任务：{{shipMentNo}}</div>
                        </div>
                        <div class="cell_info">
                            <img src="~assets/img/car_path@3x.png" alt="">
                            <div>任务名称：{{overview.shipMentLineName}}</div>
                        </div>
                        <div class="cell_info">
                            <img src="~assets/img/car_number@3x.png" alt="">
                            <div>车牌号：{{overview.vehicleNo}}</div>
                        </div>
                        <div class="cell_info">
                            <img src="~assets/img/car_driver@3x.png" alt="">
                            <div>司机：{{overview.driver?overview.driver:'未找到驾驶人信息'}}</div>
                        </div>
                        <div class="cell_info">
                            <img src="~assets/img/car_phone@3x.png" alt="">
                            <div>电话：<cite class="text_007">{{overview.phone}}</cite></div>
                        </div>
                    </template>
                </div>
                <div class="step_box pos_r">
                        <template v-if="info">
                            <div v-for="(item,index) in info" :key="index"  class="step_info">
                                <div class="tag_box" v-if="item.sortNum==1">
                                    <div :class="['info_tag',{'info_tag_active':item.trackType!=null}]">发</div>
                                </div>

                                <div class="tag_box" v-else-if="item.sortNum<item.stops&&item.sortNum>1">
                                    <template v-if="item.trackType===null">
                                        <div class="info_tag">到</div>
                                        <div class="info_tag">发</div>
                                    </template>
                                    <template v-if="item.trackType==='0'">
                                        <div class="info_tag info_tag_active">到</div>
                                        <div class="info_tag info_tag_active">发</div>
                                    </template>
                                    <template v-if="item.trackType==='1'">
                                        <div class="info_tag info_tag_active">到</div>
                                        <div class="info_tag">发</div>
                                    </template>
                                </div>
                                <div class="tag_box" v-else-if="item.sortNum==item.stops">
                                    <div :class="['info_tag',{'info_tag_active':item.trackType!=null}]">到</div>
                                </div>
                                <p :class="{'info_tag_active_p':item.trackType!=null}">{{item.shortName}}</p>
                            </div>
                        </template>
                </div>
            </div>
            <button @click="carryOut" class="send_btn">{{sendcarText}}</button>
        </div>
        <van-popup class="layer_tips" v-model="show">
            <div class="layer_content">
                <h4>温馨提示</h4>
                <img src="~assets/img/navigation@3x.png" alt="">
                <p class="text_c f_30 text_333">是否导航?</p>
                <div class="btn_box">
                    <button @click="show=false">取消</button>
                    <button @click="guide_forpage" class="active">导航</button>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            more:false,
            show:false,
            // showdialog:true,
            shipMentNo:null,
            overview:null,//接收到的车辆信息
            info:null,//显示的
            hiddeninfo:null,//所有的途径节点数据
            maxshowPath:3,
            map:null,
            markerArr:[],
            sendcarText:'',
            latitude:null,//用户坐标
            longitude:null,
            //发车导航坐标
            guide:null,
            //站点场地集合
            site:null,
            //任务已完成
            done:false,
            ischecking:false,//是否正在执行签到
        }
    },
    created () {
        this.shipMentNo=this.$route.params.No;
    },
    mounted() {
        this.getWxconfig();
    },
    methods: {
        resetMap(){
            var _self=this;
            _self.resetgetPath();
        },

        //加载地图数据
        setmapViewForPage(){
            var _self=this;
            this.$store.dispatch('getTaskinfo',{openId:this.openId,shipMentNo:this.shipMentNo})
            .then(res=>{
                var list=res.data;
                _self.site=list;
                _self.reflashMine(list);
            })
        },

        getNoinfo(){
            this.$store.dispatch('getMapInfo',{openId:this.openId,shipMentNo:this.shipMentNo})
            .then(res=>{
                var list=res.data;
                var arr=new Array();
                arr=arr.concat(res.data);
                this.info=this.getThreePath(list);
                this.getpageInfo(list);
                this.hiddeninfo=arr;
            })
        },
        
        // 执行发到车
        carryOut(){
            var _self=this;
            if(_self.done){
                return ;
            }

            if(!_self.guide){
                _self.$Tools.sendMessage('参数错误！')
                return ;
            }
            
            if(_self.ischecking){
               _self.$Tools.sendMessage('正在执行签到操作，请稍后！')
                return ; 
            }
            _self.ischecking=true;

            _self.resetgetPath();

            var dothingTitle=_self.getSigntrackType()?'到车':'发车';
            var doneType=_self.getSigntrackType();

            //检验漏打卡
                _self.$store.dispatch('checkSigninfo',{openId:_self.openId,shipMentNo:_self.shipMentNo,sortNum:_self.guide.sortNum,longitude:_self.longitude,latitude:_self.latitude,trackType:parseInt(_self.getSigntrackType())})
                .then(res=>{
                        if(res.respCode=='000'){
                            //有漏打卡
                            if(res.data){
                                var sortNum=res.data.sortNum;
                                var trackType=res.data.trackType;
                                var dothing=trackType?'到车':'发车';
                                var msg=res.data.siteShortName+'没有做'+dothing+'操作！是否补卡?';
                                _self.$Tools.Dialogconfirm(msg,'提示','补卡',(action, done)=>{
                                    if(action=='confirm'){
                                        //执行补卡操作
                                        _self.$store.dispatch('signAtrue',{
                                            openId:_self.openId,
                                            shipMentNo:_self.shipMentNo,
                                            sortNum:sortNum,
                                            trackType:trackType,
                                            signTime:_self.$Functions.getFormatterTime(),
                                            supplement:'1',
                                            longitude:_self.longitude,
                                            latitude:_self.latitude
                                            })
                                        .then(sign=>{
                                            if(sign){
                                                _self.resetMapforPage()
                                                done()
                                            }
                                        })   
                                    }else{
                                        done()
                                    }
                                    _self.ischecking=false;
                                })   

                            }else{
                                
                                //无漏卡,执行打卡
                                _self.$store.dispatch('signAtrue',{
                                    openId:_self.openId,
                                    shipMentNo:_self.shipMentNo,
                                    sortNum:_self.guide.sortNum,
                                    trackType:_self.getSigntrackType(),
                                    signTime:_self.$Functions.getFormatterTime(),
                                    supplement:'0',
                                    longitude:_self.longitude,
                                    latitude:_self.latitude
                                    })
                                .then(sign=>{
                                    if(sign){
                                        _self.resetMapforPage();
                                        _self.$Tools.DialogSuccess(dothingTitle+'成功！')
                                        if(!_self.done){
                                            //如果是发车才导航
                                            if(doneType===0){
                                                _self.show=true;//弹出导航
                                            }
                                        }
                                    }
                                    _self.ischecking=false;
                                })

                            }
                            _self.ischecking=false;
                        }else{
                            _self.$Tools.sendMessage(res.resMessage);
                            _self.ischecking=false;
                        }
                        _self.ischecking=false;
                    
                })
        },

        //判断当前打卡列表的状态
        reviewList(){
            
            var _self=this;
            
            //获取当前打卡的记录编号
            var signsortNum= _self.guide.sortNum;

            //当前原始节点列表
            var allpath=_self.hiddeninfo;

            if(!allpath){
                _self.getNoinfo(); 
                return ;
            }

            for(let i=0;i<allpath.length;i++){
                if(allpath[i].sortNum===signsortNum){
                    allpath[i].trackType=_self.getSigntrackTypeforstring();
                }
            }
            _self.hiddeninfo=allpath;
            _self.info=_self.getThreePath(allpath);

        
        },


        //微信导航
        guide_forpage(){
            var _self=this;
            if(!_self.guide.latitude||!_self.guide.longitude){
                _self.$Tools.sendMessage('缺少导航信息！') 
                return ;
            }
            wx.openLocation({
                        latitude: _self.guide.latitude, // 纬度，浮点数，范围为90 ~ -90
                        longitude: _self.guide.longitude, // 经度，浮点数，范围为180 ~ -180。
                        name: _self.guide.fullName, // 位置名
                        address: '线路名称:'+_self.guide.shipMentLineName, // 地址详情说明
                        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
        },

        //计算打卡trackType
        getSigntrackType(){
            var _self=this;
            var guide=_self.guide;
            var trackType;
            if(guide.sortNum===1){
                trackType=0;
            }else if(guide.sortNum===guide.stops){
                trackType=1;
            }else{
                switch(guide.trackType){
                    case null:
                    trackType=1;
                    break;
                    case '1':
                    trackType=0;
                    break; 
                }
            }
            return trackType;
        },


         getSigntrackTypeforstring(){
            var _self=this;
            var guide=_self.guide;
            var trackType;
            if(guide.sortNum===1){
                trackType='0';
            }else if(guide.sortNum===guide.stops){
                trackType='1';
            }else{
                switch(guide.trackType){
                    case null:
                    trackType='1';
                    break;
                    case '1':
                    trackType='0';
                    break; 
                }
            }
            return trackType;
        },


        //把站点信息标注到地图
        reflashMine(data){
            var _self=this;
            if(data&&data.length&&_self.map){
                for(let i=0;i<data.length;i++){
                    if(!data[i].longitude||!data[i].latitude){
                        continue;
                    }
                    var carposition = new AMap.LngLat(data[i].longitude,data[i].latitude);
                    _self.markerCircle(carposition,{name:data[i].fullName,sitename:data[i].name,code:data[i].code,gpsFence:data[i].gpsFence});
                }
            }
        },

        // 过滤概述信息
        getpageInfo(data){
            var _self=this;
            if(data&&data.length){
                _self.overview={
                    shipMentLineName:data[0].shipMentLineName,
                    vehicleNo:data[0].vehicleNo,
                    driver:data[0].driverName,
                    phone:data[0].driverTel
                }
            }
        },

        //根据站点序号拿出途径站点数据
        getinfoBysortNum(sortNum,trackType){
            var _self=this;
            var back='';
            var tips='';
            //根据站点序号拿出总途径站点数
            var stops=_self.hiddeninfo[sortNum-1].stops;
            if(sortNum===1||sortNum==stops){
                //如果是第一站完成补卡
                back=_self.hiddeninfo[sortNum].shortName+'-到车';
                //更改下次打卡信息
                _self.guide=_self.hiddeninfo[sortNum];
            }else{
                if(trackType){
                    tips='发车';
                    back=_self.hiddeninfo[sortNum-1].shortName+'-'+tips;
                    _self.guide=_self.hiddeninfo[sortNum-1];
                }else{
                    //如果是缺发车，那补卡成功之后应该是下一站的到车
                    tips='到车';
                    back=_self.hiddeninfo[sortNum].shortName+'-'+tips;
                    _self.guide=_self.hiddeninfo[sortNum];
                }
            }
            return back;
        },

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
                    jsApiList: ['getLocation','openLocation'] // 必填，需要使用的JS接口列表
                });
                 wx.ready(function(){
                        wx.getLocation({
                            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            //var speed = res.speed; // 速度，以米/每秒计
                            //var accuracy = res.accuracy; // 位置精度

                            //注意 这里是腾讯经纬度 需要转换成高德，暂无接口！
                            _self.latitude=res.latitude; 
                            _self.longitude=res.longitude;

                            //标注个人坐标
                            _self.setUserMap(res.longitude,res.latitude);

                            //获取途径点信息并标注
                            _self.getNoinfo();

                            _self.setmapViewForPage();
                            }
                        });
                 })
                wx.error(function(res){
                    _self.$Tools.sendMessage('微信JDK配置有误！'+res.errMsg);
                });

            })
        },

        //重新获取经纬度
        resetgetPath(){
            var _self=this;
            // _self.map.clearMap();
            //注意 获取配置信息的url一定不能有hash部分
                wx.getLocation({
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        //注意 这里是腾讯经纬度 需要转换成高德，暂无接口！
                        _self.latitude=res.latitude; 
                        _self.longitude=res.longitude;
                        _self.map.remove(_self.map.getLayers());
                        _self.setUserMap(longitude,latitude);
                        _self.reflashMine(_self.site);
                    }
                });

        },





        //格式化途经点显示[如果大于3个则显示最新的三个节点信息]
        getThreePath(data){
            var back=[];
            var _self=this;
            if(data.length>_self.maxshowPath){
                for(let i=0;i<data.length;i++){
                    //第一站什么都没做取三条
                    if(data[i].sortNum===1&&data[i].trackType==null){

                       back=data.splice(0,_self.maxshowPath);
                        _self.sendcarText=back[0].shortName+'-发车';
                        _self.guide=back[0];
                        break ;   
                        
                    }else if(data[i].sortNum===data[i].stops){
                        
                        if(data[i].trackType==null){
                            //最后一站
                            back=data.slice(parseInt('-'+_self.maxshowPath));
                            _self.sendcarText=back[back.length-1].shortName+'-到车';
                            _self.guide=back[back.length-1];

                        }else{
                             back=data.slice(parseInt('-'+_self.maxshowPath));
                             _self.done=true;
                             _self.sendcarText='任务已完成！';

                        }
                       break ;   
                    }else{
                        // alert(data[i].sortNum+'-'+data[i].trackType+typeof(data[i].trackType))
                        //第一条已经操作过
                        if(data[i].sortNum===1&&data[i].trackType!==null||data[i].sortNum===data[i].stops&&data[i].trackType!==null){
                            continue ;
                        }else{
                            //如果该转运中心做过发车 则说明操作已经结束则继续遍历
                            if(data[i].trackType==='0'){
                                 console.info('-----888---')
                                continue ;
                            }else{
                                console.info('-----999---')
                                //该转运中心未操作完成
                                switch (data[i].trackType) {
                                    case null:
                                        back=new Array(data[i-1],data[i],data[i+1]);
                                        _self.sendcarText=data[i].shortName+'-到车';
                                        _self.guide=data[i];
                                        break;
                                    case '1':
                                        back=new Array(data[i-1],data[i],data[i+1]);
                                        _self.sendcarText=data[i].shortName+'-发车';
                                        _self.guide=data[i];
                                        break;
                                }
                                break ;
                            }
                        }
                    }
                }
            }else{

                        for(let a=0;a<data.length;a++){
                            if(data[a].sortNum===1){
                                if(data[a].trackType===null){
                                    _self.sendcarText=data[a].shortName+'-发车';
                                    _self.guide=data[a];
                                    break;
                                }
                            }else if(data[a].sortNum===data[a].stops){
                                if(data[a].trackType===null){
                                    _self.sendcarText=data[a].shortName+'-到车';
                                    _self.guide=data[a];
                                    break;
                                }else{
                                    _self.done=true;
                                    _self.sendcarText='任务已完成！';
                                }
                            }else{

                                if(data[a].trackType==='0'){
                                    continue ;
                                }else{
                                    //该转运中心未操作完成
                                    switch (data[a].trackType) {
                                        case null:
                                            _self.sendcarText=data[a].shortName+'-到车';
                                            _self.guide=data[a];
                                            break;
                                        case '1':
                                            _self.sendcarText=data[a].shortName+'-发车';
                                            _self.guide=data[a];
                                            break;
                                    }
                                    break ;
                                }

                            }
                        }
                    

               back= data;
            }
            return back;
        },

        showmore(){
            this.more=this.more?false:true;
        },

        //标注个人坐标
        setUserMap(longitude,latitude){
            var position = new AMap.LngLat(longitude,latitude);
            var map =  new AMap.Map('map', {
                center:position,
                zoom:11,
                viewMode: '3D', // 开启 3D 模式
                pitch: 55,
                rotation: 35,
                features: ['bg', 'road','building','point'],
                zoomEnable:true,
                dragEnable: true,
            });
            
            var carContent="<div class='car_position'></div>";
            var markerCar = new AMap.Marker({
                position: position,
                content: carContent,
                zIndex:16,
                offset: new AMap.Pixel(-28, -50)
            });
            map.add(markerCar);
            map.setFitView();
            this.map=map;
        },

        resetMapforPage(){
            var _self=this;
            // this.map.clearMap();
            //获取途径点信息并标注
            // _self.getNoinfo();
            // _self.setUserMap(_self.longitude,_self.latitude);
            // _self.reflashMine(_self.site);
            // this.getWxconfig();
             _self.reviewList()
        },





        //刷新个人坐标
        reRefreshMine(){
                var position = new AMap.LngLat(this.longitude,this.latitude);
                var carContent="<div class='car_position'></div>";
                var markerCar = new AMap.Marker({
                    position: position,
                    content: carContent,
                    zIndex:16,
                    offset: new AMap.Pixel(-28, -50)
                });
                map.add(markerCar);
                map.setFitView();
        },

        /* params@[position:参考点位置坐标,carposition:当前车辆所在位置]*/
        markerCircle(carposition,data=null){
            var _self=this;
            // _self.map.remove([marker, markerlayer,circle]);

            //站点图标
            var markerContent=`<div class='map_info'></div>`;
            var marker = new AMap.Marker({
                position: carposition,
                content: markerContent,
                zIndex:20,
                offset: new AMap.Pixel(-20, -50)
            });

            var markerContentlayer=`<div class='ino_window'>
                <div class='window_content'>
                    <p>站点编号:${data.code}</p>
                    <p>站点名称:${data.name}-${data.sitename}</p>
                </div>
                <div class='downsanjiao'></div>
            </div>`;
            var markerlayer = new AMap.Marker({
                position: carposition,
                content: markerContentlayer,
                zIndex:21,
                offset: new AMap.Pixel(-65, -65)
            });

            if(data&&data.gpsFence){
                var circle = new AMap.Circle({
                    center: carposition, 
                    radius: data.gpsFence,  //半径
                    strokeColor: "#FE7621",  //线颜色
                    strokeOpacity: 0.5,  //线透明度
                    strokeWeight: 1,  //线粗细度
                    fillColor: "#FE7621",  //填充颜色
                    fillOpacity: 0.2, //填充透明度,
                    zIndex:10
                });
            }
            // marker.on('click',function(){
            //    _self.$Tools.DialogMessage(data.name+'-'+data.sitename);
            // })

            if(circle){
                _self.map.add([markerlayer,marker,circle]);
            }else{
                _self.map.add([markerlayer,marker]);
            }
            
           
            


            // AMap.event.addListener(marker, 'click', function () {
            //     // alert('aa')
            //     // var info = [];
            //     // info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
            //     // info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
            //     // info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
            //     // info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

            //     // var infoWindow = new AMap.InfoWindow({
            //     //     content: info.join("")  //使用默认信息窗体框样式，显示信息内容
            //     // });   
            //     // infoWindow.open(_self, _self.getCenter());
            //     // infoWindow.open(_self.map, marker.getPosition());


            //         var infoWindow = new AMap.InfoWindow({
            //             content: '这是信息窗体！这是信息窗体！'+data.name,
            //         });

            //         infoWindow.open(_self.map,[116.401337,39.907886])


            // });

            
            // _self.map.setFitView();
        },

       

    },
}
</script>
<style type="text/css" scope>
    @import '~assets/css/reset.css';
    @import '~assets/css/common.css';
    @import '../css/task.css';
</style>
