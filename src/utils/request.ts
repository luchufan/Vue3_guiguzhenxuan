//进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from 'element-plus'
//配置axios
let request = axios.create({
  baseURL: '/api',//基础路径加上/api
  timeout: 5000//超时时间
})
//request实例添加请求拦截器
request.interceptors.request.use((config) => {
  //headers属性请求头。
  //测试登录成功后获取的信息
  if (localStorage.getItem('TOKEN')) {
    config.headers.token = localStorage.getItem('TOKEN')
  }


  //返回配置对象
  return config
})

request.interceptors.response.use((response) => {
  //成功回调
  //简化数据
  return response.data
}, (error) => {
  //失败回调：处理http网络请求
  //定义一个变量:存储网络错误信息
  let message = '';
  //http状态码
  let status = error.response.status
  switch (status) {
    case 401:
      message = 'TOKEN过期'
      break;
    case 403:
      message = '无权访问'
      break;
    case 404:
      message = '请求地址错误'
      break;
    case 500:
      message = '服务器出现问题'
      break;
    default:
      message = '网络错误'
      break;
  }
  //提示错误信息
  ElMessage({
    type: 'error',
    message
  });
  return Promise.reject(error)
})


export default request