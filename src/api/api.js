const Api= {
  //内网测试
  // BASE_URL:'http://192.168.122.86:8888/gateWay',
  //外网测试
  BASE_URL:'http://zhihuiyunshuguanliweixinjiappgaodedituwaiwangceshi.sto.cn:8104/gateWay',
  //生产
  // BASE_URL:'http://tmsso-gateway.sto.cn/gateWay',
  fromCode:'weixin',
  appId:'wx00d6534489e06a69',//测试
  // appId:'wxa24e2d33d64903ba',//生产/
  wechatsecret:'4fa043024cf670a7e44291e5c153358d',//微信秘钥
  apisecret:'1134587sq878'//业务秘钥非微信秘钥
}
export default Api