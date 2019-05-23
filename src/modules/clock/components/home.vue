<!--打卡查询-->
<template>
    <div id="box_content">
        <div class="search_header bt-b">
            <div class="input_box" @click="focus_input">
                <input type="text"  v-model="search" ref="elInput" placeholder="请输入站点名称或运输任务号">
                <div v-if="clearbtn" @click="clearSearch" class="clear_btn"><img src="~assets/img/text-delete_black@3x.png" alt=""></div>
            </div>
            <button @click="submitGet">检索</button>
        </div>
        <div class="main_box pos_r" v-if="nodata">
            <Nodate></Nodate>
        </div>
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
                    <p>运输线路：{{item.lineName}}</p>
                    <p>车牌号：{{item.vehicleNo}}1</p>
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
            search:'',
            pageIndex:1,
            total:null,
            loading: false,
            finished: false,
            list:[]
        }
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
            this.list=[];
            this.loading=false;
            this.nodata=false;
            this.finished=false;
            this.pageIndex=1;
            this.total=null;
        },
        focus_input(){
            this.$refs.elInput.focus()//显示键盘
        },

        submitGet(){
            this.list=[];
            this.loading=false;
            this.finished=false;
            this.pageIndex=1;
            this.total=null;
            this.nodata=false;
            this.onLoad()
        },

        onLoad(){
            if(!this.search||this.search==''){
                this.loading=false;
                this.finished=false;
                return ;
            }
            var pagesize=10;
            this.$store.dispatch('getMarkhistoryByOpenid',{openId:this.openId,pageIndex:this.pageIndex,total:this.total?this.total:0,charStr:this.search})
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
    @import '~assets/css/searchHeader.css';
    @import '../css/clock.css';
</style>


