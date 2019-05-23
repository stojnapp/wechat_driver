const CheckedParams={
    data(){
        return{
            openId:null,
            phone:null,
            show:false,
        }
    },
    created() {
        var _self=this;
        // 生产获取openid
        var code = _self.$Wechat.getUrlCode().code
        if(!_self.$store.state.openId){
             _self.$store.dispatch('getConfig', {code})
            .then(res=>{
                if(!res){
                    // _self.$Tools.sendMessage('很遗憾,获取关键参数失败,请您关闭该页面并尝试重新打开！');
                    return ;
                }
                if(res.success){
                    _self.openId=res.data.openid;
                    _self.$store.state.openId=res.data.openid;
                    _self.$store.dispatch('getPhone',{openId:_self.openId})
                    .then(phone=>{
                        if(!phone){
                            window.location.href=_self.$Wechat.redirectUrlPage('/user.html');
                        }else{
                            _self.$store.state.phone=phone;
                            _self.phone=_self.$store.state.phone;
                        }
                        _self.show=true;
                    })

                }
            })
        }else{
            _self.openId=_self.$store.state.openId;
            _self.show=true;
        }
    }
}
export {CheckedParams}   