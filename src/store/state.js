const Api=require('../api/api');
const state = {
  phone:null,
  openId:null,
  hasrecord:null,//是否有正在执行的任务
  wxjdk:null,
  appId:Api.appId,
}
export default state
