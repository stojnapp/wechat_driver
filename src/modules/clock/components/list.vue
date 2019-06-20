<!--打卡记录-->
<template>
    <div id="box_content">
        <Nodate v-if="nodata"></Nodate>
        <div class="main_box search_list" v-if="!nodata">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check='false'
            @load="onLoad"
            style="height:100%;width:100%;overflow-y:auto"
            >
            <dl v-for="(item,index) in list" :key="index">
                <div :class="['tags',{'send':!item.trackType},{'get':item.trackType}]">{{item.trackType?'到车':'发车'}}</div>
                <dt>
                    <span>站点</span>
                    <div>{{item.siteFullName?item.siteFullName:item.shipmentName}}</div>
                </dt>
                <dt>
                    <span>时间</span>
                    <div>{{item.signTime}}</div>
                </dt>
                <dd class="bt-t">
                    <p>运输任务单：{{item.taskId}}</p>
                    <p>任务名称：{{item.lineName}}</p>
                    <p>车牌号：{{item.vehicleNo}}</p>
                </dd>
            </dl>
           </van-list>
        </div>
        <div @click="$router.push({name:'list'})" class="btn_add_mark"><img src="~assets/img/search-clock@3x.png" alt=""></div>
    </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            pageIndex:1,
            total:null,
            loading: false,
            finished: false,
            list:[]
        }
    },
    created(){
        this.onLoad();
    },
    methods:{
        onLoad(){
            var pagesize=10;
            this.$store.dispatch('getMarkhistoryByOpenid',{openId:this.openId,pageIndex:this.pageIndex,total:this.total})
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
    @import '../css/clock.css';
</style>


