import Vue from 'vue'
import Axios from 'axios'
import router from './router'
import store from './store'
import App from './App'

console.log('--------------------------', store)

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示
Vue.config.debug = true // 开启debug模式

/* eslint-disable no-new */
let iviewApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// iview 全局配置
iviewApp.$Notice.config({
  top: 90,
  duration: 3
})

iviewApp.$Message.config({
  duration: 3
})

// 响应拦截（配置请求回来的信息）
Axios.interceptors.response.use(
  _response => {
    console.log('%c █ url    = ' + _response.config.url, 'background: rgba(0, 128, 0, 0.1); color: green')
    console.log('%c █ status = ' + _response.data.status, 'color: green')
    console.log('%c █ data   =', 'color: green', _response.data.data)
    // 如果jwt无效 跳转登录界面
    if (_response.data.code === -10000) router.push({ path: '/login' })
    return _response
  },
  _error => {
    console.log(_error)
    iviewApp.$Message.destroy()
    iviewApp.$Message.error({
      content: 'Server Error',
      duration: 3
    })
    return Promise.reject(_error)
  })
