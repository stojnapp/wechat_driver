/* 
    name@检测当前用户是否绑定手机号
    time@2019/04/02
    author@344822559@qq.com
    infp@在进入页面的时候先拿到是否手机已经绑定，存入localStorage 进来每个页面都判断是否然后进行弹出
*/
const CheckedOpenID={
    data(){
        return{
            openId:null,
            phone:null,
            nodata:false,
        }
    },
    created() {
        if(this.$store.state.openId){
            this.openId=this.$store.state.openId;
        }else{
            this.$Tools.sendMessage('获取openid失败！')
        }
        if(this.$store.state.phone){
            this.phone=this.$store.state.phone;
        }else{
            // window.location.href=this.$Functions.getAllUrl('/user.html');
            window.location.href=this.$Wechat.redirectUrlPage('/user.html');
        }
    },

    filters:{
        checkeState(val){
            // 审核状态(暂不审核 -1,待复核-2,待审核 0,审核 1, 打回网点 2,打回上一步 3,转发 4,审核完成 5 复核6)
            var  back='';
            switch (val) {
                case '-1':
                    back='暂不审核';
                    break;
                case '-2':
                    back='待复核';
                    break;    
                case '0':
                    back='待审核';
                    break;
                case '1':
                    back='审核';
                    break;
                case '2':
                    back='打回网点';
                    break;
                case '3':
                    back='打回上一步';
                    break;
                case '4':
                    back='转发';
                    break;
                case '5':
                    back='审核完成';
                    break;
                case '6':
                    back='复核';
                    break;
                case null:
                    back='暂无';
                    break;
            }
        return  back;
        },

        checkedFormatterFormarklist(val){
            //审核情况状态0 全部1 已提交2 审核中3 已打回4 审核完成5 作废
            var  back='';
            switch (val) {
                case '0':
                    back='全部';
                    break;
                case '1':
                    back='已提交';
                    break;    
                case '2':
                    back='审核中';
                    break;
                case '3':
                    back='已打回';
                    break;
                case '4':
                    back='审核完成';
                    break;
                case '5':
                    back='作废';
                    break;
            }
        return  back;
        },

        formatterType(val){
            var  back='';
            switch (val) {
                case '0':
                    back='发';
                    break;
                case '1':
                    back='到';
                    break;
                default:
                    back='其他';
                    break;
            }
            return  back;
        },

        formatterForinit(val){
            var  back='';
            switch (val) {
                case 0:
                    back='发';
                    break;
                case 1:
                    back='到';
                    break;
                default:
                    back='其他';
                    break;
            }
            return  back;
        },



        


        dataFormatter(val){
            var dateTime=val.split(" ");
            var Ymd=dateTime[0].split('-');
            return Ymd[1]+'月'+Ymd[2]+'日';
        }
    },
    methods:{
        checkedInfo(){
            if(!this.openId){
                this.$Tools.sendMessage('openId获取失败,请您重新打开页面获取openid！');
                return ;
            }
            if(!this.phone){
                 window.location.href=this.$Functions.getAllUrl('/user.html');
            }
            if(!this.wxjdk){
                this.$Tools.sendMessage('获取微信JDK配置信息失败!');
                return ;
            }
        }
    }
}


export {CheckedOpenID}