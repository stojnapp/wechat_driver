<template>
  <div id="box_content">
      <div class="main_box markshow">
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
      </div>
  </div>
</template>
<script>
import {CheckedOpenID} from '@/mixins/common.mixin'
export default {
    mixins:[CheckedOpenID],
    data(){
        return{
            info:null,
            id:null,
        }
    },
    created () {
        this.id=this.$route.params.id;
        this.getinfo()
    },
    methods: {
        getinfo(){
            this.$store.dispatch('getInfoById',{openId:this.openId,id:this.id})
            .then(res=>{
                this.info=res.data;
            })
        }
    },
}
</script>

<style type="text/css" scope>
@import "../css/pound.css";
</style>
