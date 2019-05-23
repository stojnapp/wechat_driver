<template>
    <div id="box_content" class="bg_white">
        <div class="search_header bt-b">
            <div class="input_box" @click="focus_input">
                <input type="text"  v-model="search" ref="elInput" placeholder="请输入车牌号">
                <div v-if="clearbtn" @click="clearSearch" class="clear_btn"><img src="~assets/img/text-delete_black@3x.png" alt=""></div>
            </div>
            <button @click="submitGet">检索</button>
        </div>
        <div class="main_box">
            <Nodate v-show="nodata"></Nodate>
            <van-list
            v-model="loading"
            v-show="!nodata"
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
                    运输线路<span>{{item.shipMentLineName?item.shipMentLineName:'暂无数据信息'}}</span>
                </div>
                <div class="task_cell">
                    <img src="~assets/img/punch_card@3x.png" alt="">
                    车牌号<span>{{item.vehicleNo}}</span>
                </div>
                <div class="task_cell">
                    <img src="~assets/img/punch_time@3x.png" alt="">
                    规定发车时间<span>{{item.planDepartureTime}}</span>
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
                            <tr v-for="(item,index) in moreinfo" :key="index">
                                <td>{{item.fullName}}</td>
                                <td>{{item.planDepartureTime}}</td>
                                <td>{{item.signTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </template>
                </div>
                <dd @click="showmore(item.shipMentNo,index)">
                   <img v-show="activemore!=index" src="~assets/img/transport_up@3x.png"/>
                    <img v-show="activemore==index" src="~assets/img/transport_down@3x.png"/>
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
            total:null,
            more:false,
            search:'',
            moreinfo:null,
            activemore:null
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
            this.finished=false;
            this.pageIndex=1;
            this.total=null;
        },
        focus_input(){
            this.$refs.elInput.focus()//显示键盘
        },

        focus_input(){
            this.$refs.elInput.focus()//显示键盘
        },

        submitGet(){
            this.list=[];
            this.loading=false;
            this.nodata=false;
            this.finished=false;
            this.pageIndex=1;
            this.total=null;
            this.onLoad()
        },
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
            if(!this.search||this.search==''){
                this.loading=false;
                this.nodata=false;
                this.finished=false;
                return ;
            }
            var pagesize=10;
            this.$store.dispatch('getCarriagelist',{openId:this.openId,pageIndex:this.pageIndex,total:this.total,charStr:this.search})
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
    @import '../css/carriage.css';
</style>

