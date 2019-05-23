import functions from "../function/function";
import {vantTool} from '../function/commonTools';
const rootUrl=require('../api/api');
const action={

  /*获取openId /wechat/getAccessToken*/
  getConfig(context,{code,openId=""}){
    var logisticsInterface={code,openId};
    return functions.requestHttpMethods('',{msgType:'STO_WECHAT_GETACCESSTOKEN',logisticsInterface},'post')
      .then(res=>{
          if(res.respCode=='000'){
            context.commit('setOpenid',res.data.openid);
            return Promise.resolve({success:true,data:res.data})
          }else{
            // vantTool.sendMessage('openid:'+res.resMessage);
            //return Promise.resolve({success:false,data:null})
          }
      })
  },

  //获取js-JDK配置信息/wechat/getSignature
  getJdk(context,{pageUrl,openId}){
    var logisticsInterface={pageUrl,openId};
    return functions.requestHttpMethods('',{msgType:'STO_WECHAT_GETSIGNATURE',logisticsInterface},'post')
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve({success:true,data:res.data})
          }else{
            // vantTool.sendMessage('jkd:'+res.resMessage);
            return Promise.resolve({success:false,data:null})
          }
      })
  },

  // 获取手机号/phone/getMyPhone
  getPhone(context,{openId}){
    var logisticsInterface={openId};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_GETMYPHONE',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            context.commit('setPhoneNum',res.data);
            return Promise.resolve(res.data)
          }else{
            // vantTool.sendMessage('phone:'+res.resMessage);
          }
      })
  },

  // 发送验证码/phone/getVerificationCode
  sendCode(context,{phone,openId}){
    var logisticsInterface={phone,openId};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_GETVFNCODE',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  // 绑定手机号/phone/bind
  bindPhone(context,{phone,openId,verificationCode}){
    var logisticsInterface={phone,openId,verificationCode};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_BIND',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  // 更换手机号/phone/amend
  updataPhone(context,{phone,openId,verificationCode}){
    var logisticsInterface={phone,openId,verificationCode};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_AMEND',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  // 获取待执行任务列表/task/list
  getTasklist(context,{openId,pageIndex=1,total=''}){
    var logisticsInterface={openId,pageIndex,total};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_LIST',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  //获取运输任务记录列表/task/getTaskRecord
  getCarriagelist(context,{openId,pageIndex,total,charStr}){
    var logisticsInterface={openId,pageIndex,total,charStr};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_PUNCH_GETTASKRECORD',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  // 获取任务途径点/task/getApproachPointByShipmentNo
  getTaskinfo(context,{openId,shipMentNo}){
    var logisticsInterface={openId,shipMentNo};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_GETAPPROACHPOINTBYSHIPMENTNO',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  //根据任务单号获取途经点的打卡状态/punch/getSitePunchRecord
  getSiterecord(context,{openId,shipMentNo}){
    var logisticsInterface={openId,shipMentNo};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_PUNCH_GETSITEPUNCHRECORD',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  // 获取当前正在执行的任务详情-地图页/punch/getCurrTaskSiteStatus
  getMapInfo(context,{openId,shipMentNo=null}){
    var logisticsInterface={openId,shipMentNo};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_PUNCH_GETCURRTASKSITESTATUS',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  //查询正在执行的任务/task/getApproachPointByShipmentStatus
   getNowrecord(context,{openId}){
    var logisticsInterface={openId};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_GETAPPROACHPOINTBYSHIPMENTSTATUS',logisticsInterface},'post',true)
    .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res.data)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  // 新增备案/record/addTransportRecord
  addTransportRecord(context,{openId,transportOrder,transportLine,licensePlate,departureTime,secondCategoryId,description,picStreamList=[]}){
    var logisticsInterface={openId,transportOrder,transportLine,licensePlate,departureTime,secondCategoryId,description,picStreamList};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_ADDPUTRECORD',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  // 获取备案类型/record/getSecondLevelTypeInfo
  searchRecordType(context,{openId}){
    var logisticsInterface={openId};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_PUTRECORDTYPE',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  //查询备案列表/record/queryTransportRecords
  getRecordInfo(context,{openId,index}){
    var logisticsInterface={openId,index};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_GETPUTRECORD',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  //查询备案详情
  getRecordshow(context,{openId,registrationCode}){
    var logisticsInterface={openId,registrationCode};
    return functions.requestHttpMethods('',{msgType:'STO_DRIVER_TRANSPORTDETAIL',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },



  // 获取最新磅单/weight/getLastNewInfo
  getLatestweightlist(context,{openId}){
    var logisticsInterface={openId};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_WEIGNT_GETLASTNEWINFO',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  //根据Id获取磅单详情/weight/getInfoById
  getInfoById(context,{openId,id}){
    var logisticsInterface={openId,id};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_WEIGNT_GETINFOBYID',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  //根据车牌号来获取磅单详情/weight/getWeightInfoByCarNum
  getPoundinfoBycarnum(context,{carNum,openId,pageIndex,total}){
    var logisticsInterface={carNum,openId,pageIndex,total};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_WEIGNT_GETWEIGHTINFOBYCARNUM',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },

  //获取三天的磅单记录/weight/getHistoryRecord
  getThreeDayslist(context,{openId,pageIndex,total}){
    var logisticsInterface={openId,pageIndex,total};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_WEIGNT_GETHISTORYRECORD',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  //根据openId获取打卡记录/punch/record
  getMarkhistoryByOpenid(context,{openId,pageIndex,total,charStr}){
    var logisticsInterface={openId,pageIndex,total,charStr};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_PUNCH_RECORD',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage(res.resMessage);
          }
      })
  },


  //获取站点信息/location/getLocationList
  getLocationList(context,{fullName,openId,index=1,pageSize=10}){
    var logisticsInterface={openId,fullName,index,pageSize};
    return functions.requestHttpMethods('',{msgType:'STO_SITE_GETLOCATION',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage('LocationList:'+res.resMessage);
          }
      })
  },

  //打卡签到/punchCard/sign
  signAtrue(context,{openId,shipMentNo,sortNum,trackType,signTime,supplement,longitude,latitude}){
    var logisticsInterface={openId,shipMentNo,sortNum,trackType,signTime,supplement,longitude,latitude};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_PUNCH_SIGN',logisticsInterface},'post',true)
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res)
          }else{
            vantTool.sendMessage('打卡失败:'+res.resMessage);
          }
      })
  },

  //校验上一站有无漏打卡/punch/check
  checkSigninfo(context,{openId,shipMentNo,sortNum,longitude,latitude,trackType}){
    var logisticsInterface={openId,shipMentNo,sortNum,longitude,latitude,trackType};
    return functions.requestHttpMethods('',{msgType:'STO_TASK_PUNCH_CHECK',logisticsInterface},'post')
      .then(res=>{
          return Promise.resolve(res)
      })

  }

 



}
export default action;
