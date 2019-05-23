<!--备案列表-->
<template>
    <div id="box_content">
        <Nodate v-show="nodata"></Nodate>
        <div class="main_box" v-show="!nodata">
            <div class="marklist_box pl_16 pr_16 pb_32 clearfix">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check='false'
                @load="onLoad"
                style="height:100%;width:100%;overflow-y:auto"
                >
                <dl v-for="(item,index) in list" :key="index" @click="showinfo(item.registrationCode)">
                    <dt>{{item.createOn|dataFormatter}}</dt>
                    <div class="tag_box">{{String(item.status)|checkedFormatterFormarklist}}</div>
                    <dd>
                       <span>运输任务单</span>
                       <div>{{item.taskNumber}}</div>
                    </dd>
                    <dd>
                       <span>备案类型</span>
                       <div>{{item.secondCategoryName}}</div>
                    </dd>
                    <dd>
                       <span>备案说明</span>
                       <div>{{item.description}}</div>
                    </dd>
                </dl>
                </van-list>
            </div>
        </div>
        <div @click="add" class="btn_add_mark" style="z-index:999"><img src="~assets/img/plus@3x.png" alt=""></div>
    </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            pageIndex:1,
            loading: false,
            finished: false,
            total:null,
            list:[]
        }
    },
    created () {
        this.onLoad();
    },
    methods: {
        onLoad(){
            var pagesize=10;
            this.$store.dispatch('getRecordInfo',{openId:this.openId,index:this.pageIndex})
            .then(res=>{
                this.loading = false;
                if(!res||!res.data){
                   this.nodata=true;
                   return ; 
                }
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

        add(){
            this.$store.dispatch('getNowrecord', {openId:this.openId})
            .then(res=>{
                if(res){
                    this.$router.push({name:'add',params:res})
                }else{
                    this.$Tools.sendMessage('您没有在途任务需要备案！');
                }
            })
        },
        
        showinfo(registrationCode){
            this.$router.push({name:'show',params:{registrationCode}});
        }
    },


}
</script>
<style scope type="text/css">
    @import '../css/addmark.css';
</style>

