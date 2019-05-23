const indexChecked={
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
             _self.$store.dispatch('getConfig', {code})
            .then(res=>{
                if(res&&res.success){
                    _self.openId=res.data.openid;
                    _self.$store.state.openId=res.data.openid;
                    _self.$store.dispatch('getPhone',{openId:_self.openId})
                    .then(phone=>{
                        if(!phone){
                            // window.location.href=_self.$Functions.getAllUrl('/user.html');
                            window.location.href=this.$Wechat.redirectUrlPage('/user.html');
                            
                        }else{
                            _self.$store.state.phone=phone;
                            _self.phone=_self.$store.state.phone;
                            _self.$store.dispatch('getNowrecord',{openId:_self.openId})
                            .then(doing=>{
                                if(doing){
                                    _self.$router.push({name:'sendcar',params:{No:doing.shipMentNo}})
                                }else{
                                    _self.$router.push({name:'home'})
                                }
                            })
                        }
                        _self.show=true;
                    })
                }
            })
    },
}
export {indexChecked}   