// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import App from './App'
import router from './router'
import store  from './store/index'
import Vuex from 'vuex'
import Swiper from 'vue-awesome-swiper'
import '@/permission' // permission control
import scroll from 'vue-seamless-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import element from './element'
import fun from './store/modules/fun';
import 'default-passive-events'
import 'babel-polyfill'
import 'velocity-animate'
import VueLazyload from 'vue-lazyload'
 Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 3
 })
Vue.use(scroll)
Vue.use(Vuex)
Vue.use(Swiper)
Vue.use(element)
Vue.config.productionTip = false
const winList = [
  ''
]
router.afterEach((to,from,next) => {
  if(to.matched[0].path=='/personal'){
    
  }else{
    window.scrollTo(0,0);
  }
})
//星星
Vue.filter('star',function(value){
  let strval = value.toString();
  return `${strval.substring(0,1)}**${strval.substring(strval.length-1)}`
})
//显示当前时间汉字时间
Vue.filter('noticeTime',function(value){
  let date = new Date(value*1000);
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return MM + '月' + d + '日'
})
//当前时间不需要秒数
Vue.filter('forTimeNos',function(value){
  let date = new Date(value*1000);
  let h = date.getHours()<10?'0'+date.getHours():date.getHours();;
  let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
  let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();;
  return h+':'+ m +'' 
})
//当前时间
Vue.filter('forTime',function(value){
  let date = new Date(value*1000);
  let h = date.getHours()<10?'0'+date.getHours():date.getHours();;
  let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
  let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();;
  return h +':' + m +':' + s + ''
})
// 北京时间
Vue.filter('beijingTime',function(value){
    let date = new Date(value*1000);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
})
// 现在时间
Vue.filter('allTime',function(value){
  let date = new Date(value*1000);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y+'-'+ MM + '-' + d + ' ' + h + ':' + m + ':' + s;
})
//s时间戳
Vue.filter('formatting', function(value) {
    let date = new Date(value*1000);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    return y + '-' + MM + '-' + d;
});
//千位符
Vue.filter('NumFormat', function (value) {
  if (!value) return '0'
    var intPart = Number(value) // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    return intPartFormat
  }
)
//距当前时间多少天
Vue.filter('fromCurrent',function (value){
    let currentTime =  new Date(Date.now())
    let endTime = new Date(value*1000)
    let diffTime = endTime - currentTime; 
    let day = Math.floor(diffTime/86400000);
    return day + 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
