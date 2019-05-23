const UserMixin={
    data(){
        return{
            openId:null,
            phone:null,
        }
    },
    created() {
        if(this.$store.state.openId){
            this.openId=this.$store.state.openId;
        }else{
            this.$Tools.sendMessage('获取openid失败！')
            return ;
        }
    },
}
export {UserMixin}
