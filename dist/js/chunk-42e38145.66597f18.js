(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42e38145"],{"35c0":function(e,t,a){},"52ce":function(e,t,a){"use strict";var s=a("35c0"),n=a.n(s);n.a},"7f04":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bg_white",attrs:{id:"box_content"}},[a("p",{staticClass:"pt_64 pb_64 f_44 pl_40 text_333",staticStyle:{width:"100%"}},[e._v("我的任务")]),a("div",{staticClass:"main_box bg_white"},[a("Nodate",{directives:[{name:"show",rawName:"v-show",value:e.nodata,expression:"nodata"}]}),a("van-list",{directives:[{name:"show",rawName:"v-show",value:!e.nodata,expression:"!nodata"}],staticStyle:{height:"100%",width:"100%","overflow-y":"scroll"},attrs:{finished:e.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.list,function(t,s){return a("dl",{key:s,staticClass:"task_box"},[a("dt",[a("div",{staticClass:"task_cell"},[a("p",[e._v("运输任务单")]),a("div",[e._v(e._s(t.shipMentNo))])]),a("div",{staticClass:"task_cell"},[a("p",[e._v("任务名称")]),a("div",[e._v(e._s(t.shipMentLineName?t.shipMentLineName:"暂无数据信息"))])]),a("div",{staticClass:"task_cell"},[a("p",[e._v("车牌号")]),a("div",[e._v(e._s(t.vehicleNo))])]),a("div",{staticClass:"task_cell"},[a("p",[e._v("规定发车时间")]),a("div",[e._v(e._s(t.planDepartureTime))])])]),a("dd",{on:{click:function(a){return e.showTaskinfo(t.shipMentNo)}}},[a("div",{staticClass:"do_btn_box"},[e._v("查看该任务")])])])}),0)],1)])},n=[],i=a("fc13"),o={mixins:[i["a"]],data:function(){return{list:[],loading:!1,finished:!1,pageIndex:1,error:!1,total:null}},created:function(){this.onLoad()},methods:{onLoad:function(){var e=this,t=10;this.$store.dispatch("getTasklist",{openId:this.openId,pageIndex:this.pageIndex,total:this.total?this.total:0}).then(function(a){e.loading=!1,1===e.pageIndex?0===a.data.length?(e.finished=!0,e.nodata=!0):a.data.length<t?(e.list=a.data,e.finished=!0):(e.list=a.data,e.pageIndex=e.pageIndex+1):0===a.data.length?e.finished=!0:a.data.length<t?(e.list=e.list.concat(a.data),e.finished=!0):(e.list=e.list.concat(a.data),e.pageIndex=e.pageIndex+1)}),fetchSomeThing().catch(function(){e.error=!0})},showTaskinfo:function(e){this.$router.push({name:"sendcar",params:{No:e}})}}},c=o,r=(a("52ce"),a("2877")),d=Object(r["a"])(c,s,n,!1,null,null,null);t["default"]=d.exports},fc13:function(e,t,a){"use strict";a.d(t,"a",function(){return s});a("28a5");var s={data:function(){return{openId:null,phone:null,nodata:!1}},created:function(){this.$store.state.openId?this.openId=this.$store.state.openId:this.$Tools.sendMessage("获取openid失败！"),this.$store.state.phone?this.phone=this.$store.state.phone:window.location.href=this.$Wechat.redirectUrlPage("/user.html")},filters:{checkeState:function(e){var t="";switch(e){case"-1":t="暂不审核";break;case"-2":t="待复核";break;case"0":t="待审核";break;case"1":t="审核";break;case"2":t="打回网点";break;case"3":t="打回上一步";break;case"4":t="转发";break;case"5":t="审核完成";break;case"6":t="复核";break;case null:t="暂无";break}return t},checkedFormatterFormarklist:function(e){var t="";switch(e){case"0":t="全部";break;case"1":t="已提交";break;case"2":t="审核中";break;case"3":t="已打回";break;case"4":t="审核完成";break;case"5":t="作废";break}return t},formatterType:function(e){var t="";switch(e){case"0":t="发";break;case"1":t="到";break;default:t="其他";break}return t},formatterForinit:function(e){var t="";switch(e){case 0:t="发";break;case 1:t="到";break;default:t="其他";break}return t},dataFormatter:function(e){var t=e.split(" "),a=t[0].split("-");return a[1]+"月"+a[2]+"日"}},methods:{checkedInfo:function(){this.openId?(this.phone||(window.location.href=this.$Functions.getAllUrl("/user.html")),this.wxjdk||this.$Tools.sendMessage("获取微信JDK配置信息失败!")):this.$Tools.sendMessage("openId获取失败,请您重新打开页面获取openid！")}}}}}]);