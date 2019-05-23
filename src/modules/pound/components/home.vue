<!--磅单记录-->
<template>
  <div id="box_content">
    <div class="header_pound bt-b">
      <div class="menu_box" @click="activeMenu(index)" v-for="(item,index) in headerTitle" :key="index">
        <span :class="[{'active':activeheader==index}]">{{item.name}}</span>
      </div>
    </div>
    <div class="main_box markshow" v-show="activeheader===0">
        <template v-if="info">
            <dl>
                <dt>车辆信息</dt>
                <dd>
                    <span>车牌号</span>
                    <div>{{info.plateNumber?info.plateNumber:'暂无车牌信息'}}</div>
                </dd>
                <dd>
                    <span>称重站点</span>
                    <div>{{info.siteName}}</div>
                </dd>
                <dd>
                    <span>进出站类型</span>
                    <div>{{info.optionType=='1'?'发车':'到车'}}</div>
                </dd>
                <dd>
                    <span>称重时间</span>
                    <div>{{info.weightMentTime}}</div>
                </dd>
            </dl>
            <dl>
                <dt>称重信息</dt>
                <dd>
                    <span>毛重</span>
                    <div>{{info.gross}}</div>
                </dd>
                <dd>
                    <span>皮重</span>
                    <div>{{info.veGross}}</div>
                </dd>
                <dd>
                    <span>净重</span>
                    <div>{{info.realGross}}</div>
                </dd>
            </dl>
            <dl>
                <dt>司机信息</dt>
                <dd>
                    <span>司机</span>
                    <div>{{info.driverName}}</div>
                </dd>
                <dd>
                    <span>联系方式</span>
                    <div>{{info.phone}}</div>
                </dd>
            </dl>
            <dl>
                <dt>运输任务</dt>
                <dd>
                    <span>运输任务单</span>
                    <div>{{info.transportTaskNo}}</div>
                </dd>
                <dd>
                    <span>运输线路</span>
                    <div>{{info.transportLine}}</div>
                </dd>
                <dd>
                    <span>规定发车时间</span>
                    <div>{{info.planDepartureTime}}</div>
                </dd>
            </dl>
        </template>
        <Nodate v-else v-show="true"></Nodate>
    </div>
    <div class="main_box markhistory" v-show="activeheader===1">
             <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check='false'
            @load="onLoad"
            v-if="histroylist&&histroylist.length"
            >
                <dl v-for="(item,index) in histroylist" :key="index" @click="showinfo(item.id)">
                <dt>
                    <div class="info">
                        <p class="f_36 text_333 pb_16">{{item.plateNumber}}</p>
                        <div class="cell_info">
                            <span>称重站点</span>
                            <div>{{item.siteName}}</div>
                        </div>
                        <div class="cell_info">
                            <span>称重时间</span>
                            <div>{{item.weightMentTime}}</div>
                        </div>
                    </div>
                    <div class="info_more">详情</div>
                </dt>
                <dd class="bt-t">
                    <p>运输任务单：{{item.transportTaskNo}}</p>
                    <p>运输线路：{{item.transportLine}}</p>
                    <p>车牌号：{{item.plateNumber}}</p>
                </dd>
            </dl>
             </van-list>
            <Nodate v-else></Nodate>

    </div>
  </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data() {
        return {
            headerTitle: [{ name: "最新磅单" }, { name: "历史磅单" }],
            activeheader:0,
            info:null,
            histroylist:[],
            pageIndex:1,
            total:null,
            loading: false,
            finished: false,
            isLoading:false,
        };
  },
  created() {
        this.getLatestlist();
        this.onLoad();
  },
  mounted() {},
  computed: {
    clearbtn() {
      var back = false;
      if (this.search && this.search.length) {
        back = true;
      }
      return back;
    },
    
  },

  methods: {
    activeMenu(index){
        this.activeheader=index;
    },
    getLatestlist(){
        this.$store.dispatch('getLatestweightlist',{openId:this.openId})
        .then(res=>{
            this.info=res.data?res.data:null;
        })
    },
    onRefresh() {
          this.histroylist=[];
          this.loading=false;
          this.finished=false;
          this.pageIndex=1;
          this.total=null;
          this.onLoad();
        },
    onLoad(){
        var pagesize=10;
        this.$store.dispatch('getThreeDayslist',{openId:this.openId,pageIndex:this.pageIndex,total:this.total?this.total:0})
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
                        this.histroylist=res.data;
                        this.finished=true;
                    }else{
                        this.histroylist=res.data;
                        this.pageIndex=this.pageIndex+1;
                    }
                }else{
                    if(res.data.length===0){
                        this.finished=true;
                    }else if(res.data.length<pagesize){
                        this.histroylist=this.histroylist.concat(res.data);
                        this.finished=true;
                    }else{
                        this.histroylist=this.histroylist.concat(res.data);
                        this.pageIndex=this.pageIndex+1;
                    }
                }
                
        })
    },

    showinfo(id){
        this.$router.push({name:'show',params:{id}});
    }
  }
};
</script>
<style type="text/css" scope>
@import "../css/pound.css";
</style>


