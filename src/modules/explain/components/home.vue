<!--打卡查询-->
<template>
    <div id="box_content">
        <div class="main_box bg_white">
            <van-cell-group>
                <van-cell v-for="(item,index) in list" :key="index" @click="checkedCell(index)" :title='(index+1)+"."+item.title' is-link></van-cell>
            </van-cell-group>
        </div>
        <van-popup class="fullscreenBox" position="right" v-model="show">
            <div id="box_content">
                <van-nav-bar style="width:100%" :title="title"  @click-left="onClickLeft">
                    <div class="header_back_box" slot="left"><img src="~assets/img/back@2x.png"/></div>
                </van-nav-bar>
                <div class="main_box">
                    <div class='pt_32 pr_32 pl_32 text_333 pb_32 f_30 lh_48 expain_box' v-html="content"></div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import p1 from '../img/1_pic1@2x.png';
import p2 from '../img/1_pic2@2x.png';
import p3 from '../img/1_pic3@2x.png';
import channel2_01 from '../img/2_pic1@2x.png';
import channel2_02 from '../img/2_pic2@2x.png';
import channel3_01 from '../img/3_pic1@2x.png';
import channel3_02 from '../img/3_pic2@2x.png';
import channel4_01 from '../img/4_pic1@2x.png';
import channel4_02 from '../img/4_pic2@2x.png';
import channel4_03 from '../img/4_pic3@2x.png';
import channel6_01 from '../img/6_pic1@2x.png';
import channel6_02 from '../img/6_pic2@2x.png';
import channel7_01 from '../img/7_pic1@2x.png';
import channel8_01 from '../img/8_pic1@2x.png';
import channel8_02 from '../img/8_pic2@2x.png';
import channel8_03 from '../img/8_pic3@2x.png';
import channel8_04 from '../img/8_pic4@2x.png';
import channel9_01 from '../img/9_pic1@2x.png';
import channel9_02 from '../img/9_pic2@2x.png';
export default {
    data(){
        return{
           show:false,
           acitve:0,
           title:'',
           content:'',
           list:[
                {
                   title:'发车到车',
                   content:`<span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机未执行运输任务时查看我的待运输任务，或执行任务时驶出始发站、驶入/驶出途经站、驶入目的站进行签到操作。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤1：</span>「申雪智慧运营公众号」，点击【发车到车】<br/>
                   <img class='mb_20' src='${p1}'/>
                   <span class='text_000 f_32 f_w'>步骤2：</span>进入到我的任务列表，选择您要执行的任务，点击【查看该任务】<br/>
                   <img class='mb_20' src='${p2}'/>
                   <span  class='text_000 f_32 f_w'>步骤3：</span>进入到任务详情,您可以正常做到车发车了<br/>
                   <img class='mb_20' src='${p3}'/>
                   <p>注:</p>
                   <p>1.司机在执行签到操作时必须在对应站点规定的签到范围内方可签到成功，在规定范围外无法进行签到;</p>
                   <p>2.司机在上一站如果未打卡，将在本站提示补卡，但此次补卡无效，时效考核仍会按照罚款规则进行罚款;</p>
                   <p>3.执行任务时此界面无法查看待运输任务，在待运输任务执行完成后方可查看;</p>
                   <p class='mb_20 mt_32'>签到功能按钮包括查看任务、查看该任务、发车、到车。</p>
                   <p>1.查看任务：点击查看任务按钮，如果司机当前没有在途任务，则进入我的任务页面查看待执行任务；如果当前有在途任务，则进入发车/到车签到页面；当开始执行在途任务后，该按钮会自动更改成“发车到车”按钮，更改后点击将直接进入签到页面
                   <p>2.查看该任务：点击进入发车/到车签到页面;</p>
                   <p>3.发车：在站点的规定范围内，点击发车按钮进行签到;</p>
                   <p>4.到车：在站点的规定范围内，点击到车按钮进行签到;</p>`
                },
                {
                   title:'磅单记录',
                   content:`
                   <span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机查看磅单记录，磅单记录分为最新磅单和历史磅单，便于司机查看并核对运输任务的车辆信息、称重信息和司机信息。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤1：</span>打开[申雪智慧运营公众号]，点击[我的]选择[磅单记录]<br/>
                   <img class='mb_20' src='${channel2_01}'/>
                    <span class='text_000 f_32 f_w '>步骤2：</span>选择[最新磅单]或[历史磅单]查看记录
                    <img class='mb_20' src='${channel2_02}'/>
                    <p class='mb_20 mt_32'>该页面包含最新磅单和历史磅单查看功能、历史数据查询功能。</p>
                    <p>1.最新磅单：点击显示最新磅单的车辆信息、称重信息和司机信息，便于司机核对信息；</p>
                    <p>2.历史磅单：点击显示历史磅单信息，点击详情进入磅单详情页面，便于司机查看历史磅单的详细信息；</p>
                    `,
                },
                {
                   title:'签到记录',
                   content:`<span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机查看历史签到记录，便于司机查看签到的历史所有记录。<br/><br/>
                    <span class='text_000 f_32 f_w'>步骤1：</span>打开[申雪智慧运营公众号]，点击[我的]选择[签到记录]<br/>
                   <img class='mb_20' src='${channel3_01}'/>
                    <span class='text_000 f_32 f_w'>步骤2：</span>进入到记录详情，您可以查看记录了
                    <img class='mb_20' src='${channel3_02}'/>
                    <p class='mb_20 mt_32'>该功能包含签到记录显示和查询功能。</p>
                    <p>1.签到记录显示：显示历史打卡记录，每条记录显示打卡地点、打卡时间、打卡状态（发车/到车）、运输任务单号、运输线路和车牌号；</p>
                    <p>2.签到记录查询：点击右下角查询按钮，进入查询界面，输入站点名称或运输任务号后进行查询（支持模糊查询）；</p>
                    `,
                },
                {
                   title:'备案',
                   content:`<span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机于执行运输任务中遇突发事件时进行备案，方便后期追溯原因。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤1：</span>打开[申雪智慧运营公众号]，点击[服务]选择[备案]<br/>
                   <img class='mb_20' src='${channel4_01}'/>
                   <span class='text_000 f_32 f_w '>步骤2：</span>进入到备案记录，您可以查看历史备案及状态了<br/>
                   <img class='mb_20' src='${channel4_02}'/>
                   <span class='text_000 f_32 f_w '>步骤3：</span>也可选择“+”添加新的备案记录<br/>
                   <img class='mb_20' src='${channel4_03}'/>
                   <p class='mb_20 mt_32'>该功能包含备案新增和查询功能。</p>
                   <p>1.备案记录查看：点击备案后进入备案记录查看界面，可查看我的备案信息。信息中显示运输任务号、备案类型、备案说明和备案状态，备案状态有“已提交”、“审核通过”、“已打回”。点击每条备案进入备案详情中，显示该条备案的所有详情。</p>
                   <p>2.备案记录新增：在备案查看界面点击右下角“+”进入新增备案页面，当前运输基本信息系统会自动填入，司机核对无误后选择备案类型，并在备案说明中填写情况说明，拍摄好照片后进行提交即可；</p>
                   `,
                },
                {
                   title:'运输任务',
                   content:`
                   <span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机查看历运输任务。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤1：</span>打开[申雪智慧运营公众号]，点击[我的]选择[运输任务]<br/>
                   <img class='mb_20' src='${channel6_01}'/>
                   <img class='mb_20' src='${channel6_02}'/>
                   <p class='mb_20 mt_32'>该功能包含运输任务查询。</p>
                   <p>1.运输任务查询：点击运输任务进入我的运输任务界面，界面显示司机执行过的所有运输任务，显示内容有运输任务单号、运输线路、车牌号、对顶发车时间和签到详情列表。点击页面右上角查询按钮输入车牌号可查询该车牌号下的所有运输任务；</p>
                   `,
                },
                {
                   title:'任务下发通知',
                   content:`
                   <span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机查看任务下发通知。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤：</span>打开[申雪智慧运营公众号]，您的任务下发通知就在这里<br/>
                   <img class='mb_20' src='${channel7_01}'/>
                   <p class='mb_20 mt_32'>该功能包含任务下发通知内容。</p>
                   <p>1.任务下发通知：该页面可查看所有运输任务提醒。在分配好司机的运输任务后，该页面立刻推送待执行运输任务信息</p>
                   `,
                },
                {
                   title:'网点查询',
                   content:`<span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机快捷搜索转运中心并导航，协助司机驾驶车辆。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤1：</span>打开[申雪智慧运营公众号]，点击[服务]选择[网点查询]<br/>
                   <img class='mb_20' src='${channel8_01}'/>
                   <span class='text_000 f_32 f_w'>步骤2：</span>输入查询地址并选择<br/>
                   <div class='line_box'>
                    <img class='mb_20' src='${channel8_02}'/>
                    <img class='mb_20' src='${channel8_03}'/>
                   </div>
                   <span class='text_000 f_32 f_w'>步骤3：</span>点击右下角的导航按钮，开始导航<br/>
                   <img class='mb_20' src='${channel8_04}'/>
                    <p class='mb_20 mt_32'> 该功能包含搜索目标转运中心和导航功能。</p>
                    <p>1.搜索目标转运中心：支持模糊查询，输入目标转运中心部分名称后即可进行选择，也可输入目标转运中心全称；</p>
                    <p>2.导航功能：目标转运中心搜索完成后点击导航按钮即可开始导航；</p>
                   `,
                },
                {
                   title:'我的手机号',
                   content:`<span class='text_000 f_32 f_w'>介绍：</span>该功能用于司机更换手机号。<br/><br/>
                   <span class='text_000 f_32 f_w'>步骤1：</span>打开[申雪智慧运营公众号]，点击[我的]选择[我的手机号]<br/>
                   <img class='mb_20' src='${channel9_01}'/>
                   <span class='text_000 f_32 f_w'>步骤2：</span>点击更换手机号，更换新的手机号<br/>
                   <img class='mb_20' src='${channel9_02}'/>
                   <p class='mb_20 mt_32'>该功能包含更换手机号</p>
                   <p>1.更换手机号：点击更换手机号进行手机号的更换操作；</p>
                   `,
                }
           ],
        }
    },
    methods:{
       onClickLeft(){
           this.show=false
       },
       checkedCell(index){
           this.acitve=index;
           this.title=this.list[index].title;
           this.content=this.list[index].content;
           this.show=true;
       }
    }

}
</script>
<style type="text/css" scope>
    @import '~@/assets/css/common.css';
    .img_box{
        width: 100%;
        padding-bottom: 0.2rem;
        text-align: left
    }
    .img_box img{
        display: inline-block;
        max-width: 45%;
    }
    .header_back_box{
        display: flex;
        height: 46px;
        flex-flow: nowrap row;
        justify-content: flex-start;
        align-items: center;
    }
    .header_back_box img{
        max-width: 20px;
    }
    .expain_box{
        display: block;
    }
    .expain_box img{
        display: block;
        clear: both;
        margin-top: 20px;
        max-width: 90%;
    }
    .line_box{
        width: 100%;
        display: flex;
        flex-flow: nowrap row;
        justify-content: flex-start;
        align-items: flex-start
    }
    .line_box img:first-child{
        margin-right: 20px;
    }
    .line_box img{
        display: inline-flex;
        max-width: 50%;
        flex: 1;
    }
</style>


