(function(e){function t(t){for(var r,o,i=t[0],c=t[1],s=t[2],d=0,l=[];d<i.length;d++)o=i[d],a[o]&&l.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(l.length)l.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={user:0},a={user:0},u=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-9ed529e8":"11fb05db","chunk-a2967e60":"b587cfa4"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-9ed529e8":1,"chunk-a2967e60":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-9ed529e8":"e385d079","chunk-a2967e60":"e385d079"}[e]+".css",a=c.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var s=u[i],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===r||d===a))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){s=l[i],d=s.getAttribute("data-href");if(d===r||d===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.request=r,delete o[e],p.parentNode.removeChild(p),n(u)},p.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(p)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=u);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=i(e),s=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,u=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");u.type=r,u.request=o,n[1](u)}a[e]=void 0}};var l=setTimeout(function(){s({type:"timeout",target:d})},12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var p=d;u.push([7,"chunk-vendors","chunk-common"]),n()})({2931:function(e,t,n){},"307e":function(e,t,n){"use strict";var r=n("2931"),o=n.n(r);o.a},7:function(e,t,n){e.exports=n("d883")},d883:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d"),n("db4d");var r=n("fe3c"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.$route.meta.title,expression:"$route.meta.title"}],attrs:{id:"app"}},[e.show?n("router-view"):e._e()],1)},a=[],u={name:"app",data:function(){return{openId:null,phone:null,show:!1}},created:function(){var e=this,t=e.$Wechat.getUrlCode().code;null!=t&&""!==t?e.$store.dispatch("getConfig",{code:t}).then(function(t){t&&t.success&&(e.openId=t.data.openid,e.$store.state.openId=t.data.openid,e.$store.dispatch("getPhone",{openId:e.openId}).then(function(t){t?(e.$store.state.phone=t,e.phone=e.$store.state.phone,e.$router.push({name:"home"})):e.$router.push({name:"changebind",params:{title:"绑定手机号",type:"bind"}}),e.show=!0}))}):e.$Wechat.redirectUrl()},mounted:function(){var e=this;window.addEventListener("popstate",function(t){e.$Wechat.redirectUrl()},!1)}},i=u,c=(n("307e"),n("2877")),s=Object(c["a"])(i,o,a,!1,null,null,null),d=s.exports,l=function(e){n.e("chunk-9ed529e8").then(n.bind(null,"ab93")).then(function(t){e(t)})},p=function(e){n.e("chunk-a2967e60").then(n.bind(null,"bc23")).then(function(t){e(t)})},f=[{path:"/",name:"home",component:l,meta:{title:"我的手机号"}},{path:"/changebind",name:"changebind",component:p,meta:{title:"绑定手机号"}}],h=new VueRouter({routes:f}),m=h,v=n("0f1d"),g=n("acbb"),b=n("99e1"),y=(n("b932"),n("07a4"));r["attach"](document.body),Vue.config.productionTip=!1,Vue.prototype.$Tools=v["a"],Vue.prototype.$Functions=g["a"],Vue.prototype.$Wechat=b["a"];b["a"].getCode();new Vue({router:m,store:y["a"],render:function(e){return e(d)}}).$mount("#app")}});