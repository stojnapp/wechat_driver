<!--打卡查询-->
<template>
    <div id="box_content">
        <div class="main_box bg_white pr_32 pl_32 pb_32">
            <p class="f_32 mt_32 pb_16 text_333"> 1.如何执行任务?</p>
            <div class="f_28 lh_48 text_666">
               当有任务分配给您时，您会收到短信和消息提醒。打开您的司机APP（或申雪智慧运营公众号），点击【查看任务】。进入到我的任务列表，选择您要执行的任务，点击【查看该任务】，进入到任务详情。您可以正常做到车发车了。
                <div class="clearfix img_box">
                    <img src="~assets/img/1.jpg" alt="">
                    <img src="~assets/img/2.jpg" alt="">
                </div>
                <div class="clearfix img_box mt_32">
                    <img src="~assets/img/3.jpg" alt="">
                </div>
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 2.打卡有什么限制吗?</p>
            <div class="f_28 lh_48 text_666">
                只有在站点的签到范围内才能打卡。
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 3.漏打卡了怎么办?</p>
            <div class="f_28 lh_48 text_666">
                当您在上一站没有打卡，您在本站会提示补卡，但此次补卡无效。时效考核仍会按罚款规则进行罚款。
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 4.如何查询我的签到记录?</p>
            <div class="f_28 lh_48 text_666">
                点击签到记录，进入到签到记录列表。在此处，您可以查看您最近签到的记录。您也可以点击右上角搜索按钮，查询具体站点的签到记录。
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 5.如何查询我的过磅记录?</p>
            <div class="f_28 lh_48 text_666">
                点击磅单记录，进入到磅单记录列表。最新磅单会显示您在途任务最新的一次过磅记录。历史磅单会显示您最近三天的过磅记录。您也可以输入车牌号搜索，搜索该车牌号的磅单记录。
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 6.当在途过程中遇到情况需要报备该如何处理?</p>
            <div class="f_28 lh_48 text_666">
                点击备案，进入到备案列表界面。点击新增，选择备案类型，输入备案说明，提交等待审核即可。您也可以在备案列表界面查看备案审核进度
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 7.如何查看我的历史运输任务?</p>
            <div class="f_28 lh_48 text_666">
                您可以到个人中心点击，找到运输任务。选择您想看的运输任务，点击查看。您还可以在这里看到您的实际签到操作时间
            </div>
            <p class="f_32 mt_32 pb_16 text_333"> 8.如何更换手机号?</p>
            <div class="f_28 lh_48 text_666">
                1->目前APP不支持手机号更换功能。如您需要更换手机号，直接退出，用新的手机号登陆即可。</br>
                2->目前微信公众号支持手机号更换。您在微信公众号首页点击【我的】，选择【我的手机号】。进入到我的手机号界面，点击【更换手机号】，输入您想要榜单的新手机号和验证码，输入正确，点击【确定】，手机号更换成功。
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           
        }
    },
    mounted () {
       this.getWxconfig()
   },
    computed:{
       
    },
    methods:{
       
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
</style>


