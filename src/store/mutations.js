
const mutations={
  setPhoneNum:function (state,num) {
    state.phone=num;
  },
  setOpenid:function(state,Openid){
    state.openId=Openid;
  },
  hasNowrecord:function (state,obj) {
    state.hasrecord=obj;
  },
  setjdk:function(state,obj){
    state.wxjdk=obj;
  }
}
export default mutations
