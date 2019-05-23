import rootUrl from './api'

// 使用代理的时候关闭baseurl
const axiosConfig = {
  baseURL: rootUrl.BASE_URL,/*测试接口地址*/
  retry: 1,
  retryDelay: 4000,
  timeout: 20000,
  headers: {'Content-Type': 'application/json'},
  // headers: {'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json,text/javascript,*/*;q=0.01'},
};
export default axiosConfig
