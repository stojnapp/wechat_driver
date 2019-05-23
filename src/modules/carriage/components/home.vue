<!--我的运输任务列表-->
<template>
    <div id="box_content" class="bg_white pos_r">
        <p class="pt_64 pb_64 f_44 pl_40 text_333" style="width:100%">我的运输任务</p>
        <div class="main_box bg_white">
            <Nodate v-show="nodata"></Nodate>
            <van-list
            v-show="!nodata"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check='false'
             style="height:100%;width:100%;overflow-y:auto"
            >
            <dl class="task_box_carr" v-for="(item,index) in list" :key="index">
                <dt class="title">运输单<span>{{item.shipMentNo}}</span></dt>
                <div class="task_cell">
                    <img src="~assets/img/punch_line@3x.png" alt="">
                    <cite>运输线路</cite>
                    <span>{{item.shipMentLineName?item.shipMentLineName:'暂无数据信息'}}</span>
                </div>
                <div class="task_cell">
                    <img src="~assets/img/punch_card@3x.png" alt="">
                    <cite>车牌号</cite>
                    <span>{{item.vehicleNo}}</span>
                </div>
                <div class="task_cell">
                    <img src="~assets/img/punch_time@3x.png" alt="">
                    <cite>规定发车时间</cite>
                    <span>{{item.planDepartureTime}}</span>
                </div>
                <div class="more" v-show="activemore==index">
                    <template v-if="moreinfo">
                    <table class="cell_table" border="0" cellpadding="0" cellspacing='0'>
                        <tbody>
                            <tr>
                                <td>签到网点</td>
                                <td>规定时间</td>
                                <td>实际时间</td>
                            </tr>
                            <tr  v-for="(item,index) in moreinfo" :key="index">
                                <td>{{item.fullName}}-{{item.trackType|formatterForinit}}</td>
                                <td>{{item.trackType===1?item.planArrivalTime:item.planDepartureTime}}</td>
                                <td>{{item.signTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </template>
                </div>
                <dd @click="showmore(item.shipMentNo,index)" class="pt_8 pb_8">
                    <img v-show="activemore!=index" src="~assets/img/transport_up@3x.png"/>
                    <img v-show="activemore==index" src="~assets/img/transport_down@3x.png"/>
                </dd>
            </dl>
            </van-list>
        </div>
        <div @click="$router.push({name:'search'})" class="btn_add_mark"><img src="~assets/img/search-clock@3x.png" alt=""></div>
    </div>
    
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins: [CheckedOpenID],
    data(){
        return{
            list:[],
            loading: false,
            finished: false,
            pageIndex:1,
            total:null,
            more:false,
            moreinfo:null,
            activemore:null
        }
    },
    created(){
        this.onLoad();
    },

    methods:{
        showmore(shipMentNo,index){
            if(this.activemore==index){
                this.activemore=null;
                return ;
            }
            this.activemore=index;
            this.moreinfo=null;
            this.$store.dispatch('getSiterecord',{openId:this.openId,shipMentNo})
            .then(res=>{
                this.moreinfo=res.data;
            })
        },
        onLoad(){
            var pagesize=10;
            this.$store.dispatch('getCarriagelist',{openId:this.openId,pageIndex:this.pageIndex,total:this.total})
            .then(res=>{
                this.loading = false;
                if(this.pageIndex===1){
                    if(res.data.length===0){
                        this.finished=true;
                        this.nodata=true;
                    }else if(res.data.length<pagesize){
                        this.list=res.data;
                        this.finished=true;
                    }else{
                        this.list=res.data;
                        this.pageIndex=this.pageIndex+1;
                    }
                }else{
                    if(res.data.length===0){
                        this.finished=true;
                    }else if(res.data.length<pagesize){
                        this.list=this.list.concat(res.data);
                        this.finished=true;
                    }else{
                        this.list=this.list.concat(res.data);
                        this.pageIndex=this.pageIndex+1;
                    }
                }
            })
        },



    }

}
</script>
<style type="text/css" scope>
    @import '../css/carriage.css';
</style>


