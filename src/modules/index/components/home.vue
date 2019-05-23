<!--我的任务,待执行任务列表-->
<template>
     <div id="box_content" class="bg_white">
        <p class="pt_64 pb_64 f_44 pl_40 text_333" style="width:100%">我的任务</p>

        <div class="main_box bg_white">
            <Nodate v-show="nodata"></Nodate>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" v-show="!nodata" @load="onLoad" :immediate-check='false' style="height:100%;width:100%;overflow-y:scroll">
                <dl class="task_box" v-for="(item,index) in list" :key="index">
                    <dt>
                        <div class="task_cell">
                            <p>运输任务单</p>
                            <div>{{item.shipMentNo}}</div>
                        </div>
                        <div class="task_cell">
                            <p>运输线路</p>
                            <div>{{item.shipMentLineName?item.shipMentLineName:'暂无数据信息'}}</div>
                        </div>
                        <div class="task_cell">
                            <p>车牌号</p>
                            <div>{{item.vehicleNo}}</div>
                        </div>
                        <div class="task_cell">
                            <p>规定发车时间</p>
                            <div>{{item.planDepartureTime}}</div>
                        </div>
                    </dt>
                    <dd @click="showTaskinfo(item.shipMentNo)">
                        <div class="do_btn_box">查看该任务</div>
                    </dd>
                </dl>
            </van-list>
        </div>
    </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            list:[],
            loading: false,
            finished: false,
            pageIndex:1,
            error: false,
            total:null,
        }
    },
    created(){
       this.onLoad();
    },
    methods:{
         onLoad(){
            var pagesize=10;
            this.$store.dispatch('getTasklist',{openId:this.openId,pageIndex:this.pageIndex,total:this.total?this.total:0})
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
            fetchSomeThing().catch(() => {
                this.error = true;
            })
        },

        showTaskinfo(No){
            this.$router.push({name:'sendcar',params:{No}})
        },
    }

}
</script>
<style type="text/css" scope>
    @import '~assets/css/reset.css';
    @import '~assets/css/common.css';
    @import '../css/home.css';
</style>


