import wechatconfig from '../config/config';
import functions from '@/function/function'


//因为获取js-sdk配置需要使用sha1加密  这里使用https://cdn.bootcss.com/js-sha1/0.6.0/sha1.min.js，需先引入再使用
/**
 * 一般情况下 前端无需进行获取token 或者js配置等参数的获取
 * 因为微信服务器禁止跨域访问 所以这些东西一般是在后端获取的，但是前端可以在测试的时候使用代理来进行 后期再交给后端执行生产配置
 * 
 * 
 * 
 */


/* 微信公众号相关方法 */
const  wechatFn={
    appid:wechatconfig.appID,
    appsecret:wechatconfig.appsecret,
    wechaturl:wechatconfig.wechatUrl,

    /*获取时间戳*/
    gettimestap:()=>{
        return new Date().getTime()
    },

    /*随机字符串*/
    randomChar:(len)=> {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },


    /* 
        获取jsapi_ticket
        @return {appId,timestamp,nonceStr,signature} 
    */
    getJsapiTicket(AccessToken=null){
        //首先获取token
        if(!AccessToken){
            AccessToken=this.getAccessToken();
        }
        var back={},ticket,nonceStr,timestamp,stringSignature,pageUrl=window.location.href.split('#')[0];
        var url=`${this.wechaturl}cgi-bin/ticket/getticket?access_token=${AccessToken}&type=jsapi`;
        this.getBack(url)
        .then(res=>{
            ticket=res.ticket;
            nonceStr=this.randomChar();
            timestamp=this.gettimestap();
            stringSignature=`jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${pageUrl}`;
            back={
                appId:this.appid,
                timestamp:this.gettimestap(),
                nonceStr:this.randomChar(),
                signature:sha1(stringSignature)
            }
        })
        return ticket;
    },

    /* getAccessToken */
    getAccessToken(){
        var url=`${this.wechaturl}cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.appsecret}`;
        this.getBack(url);
    },



    /**
     * @method 通过code 置换access_token和openid
     * @param {code:wechat callback} 
     * @return 
                "access_token":"ACCESS_TOKEN",
                "expires_in":7200,
                "refresh_token":"REFRESH_TOKEN",
                "openid":"OPENID",
                "scope":"SCOPE" 
     */
    getTokenForcode(code){
        var url=`${this.wechaturl}sns/oauth2/access_token?appid=${this.appid}&secret=${this.appsecret}&code=${code}&grant_type=authorization_code`;    
        this.getBack(url);
    },

    /**
     * @method 根据上面的方法返回的refresh_token来刷新token  refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权
     * @param {refreshToken}
     */
    refreshFortoken(refreshToken){
        var url=`${this.wechaturl}sns/oauth2/refresh_token?appid=${this.appid}&grant_type=refresh_token&refresh_token=${refreshToken}`;
        this.getBack(url);
    },


    /* request wechat Api */
    getBack(url){
        return axios.get(url)
        .then(function (response) {
            return Promise.resolve(response)
        })
        .catch(function (error) {
            console.log(error);
        });
    },


    /* get for code with url */
    getCode () { 
        /* gethost */
        var code=null;
        var domain=functions.getAllUrl(); 
        var appid = this.appid;
        code = this.getUrlCode().code // 截取code
        if (code == null || code === '') { // 如果没有code，则去请求
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${domain}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        }
        return code;
    },


    //重新定向指定跳转
    redirectUrl(path=null){
        var domain;
        if(path){
            domain=functions.getAllUrl(path);  
        }else{
            domain=functions.getAllUrl();
        }
        var appid = this.appid;
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${domain}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    },


    //指定跳转页面
    redirectUrlPage(path=null){
        var domain;
        if(path){
            domain=functions.getAllUrl(path);  
        }else{
            domain=functions.getAllUrl();
        }
        var appid = this.appid;
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${domain}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    },


    
    /* get code into url */
    getUrlCode() {
        var url = location.search
        this.winUrl = url
        var theRequest = new Object()
        if (url.indexOf("?") != -1) {
            var str = url.substr(1)
            var strs = str.split("&")
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
            }
        }
        
        return theRequest;
    }

}

export default wechatFn;

