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
  duration: 1
})

// 响应拦截（配置请求回来的信息）
Axios.interceptors.response.use(
  _response => {
  //   _message(_type = 'success', _str = 'success', _destroy = true, _onClose) {
  //     if (_destroy) this.$Message.destroy()
  //     iviewApp.$Message[_type]({
  //         content: _str,
  //         onClose: _onClose
  //     })
  // }
    // let ss = function (_type = 'success', _str = 'success', _destroy = true, _onClose) {
    //   if (_destroy) this.$Message.destroy()
    //   iviewApp.$Message[_type]({
    //       content: _str,
    //       onClose: _onClose
    //   })
    // }
    switch (_response.data.code) {
      case 1:
        iviewApp.$Message.destroy()
        iviewApp.$Message.success('成功！')
        return _response
      case -1000:
        iviewApp.$Message.destroy()
        iviewApp.$Message.error('服务器错误，请稍后再试')
        return _response
      case -1006:
        iviewApp.$Message.destroy()
        iviewApp.$Message.error('用户不存在')
        return _response
      case -1008:
        iviewApp.$Message.destroy()
        iviewApp.$Message.error('电话号码已存在')
        return _response
      case -1010:
        iviewApp.$Message.destroy()
        iviewApp.$Message.error('用户名或密码错误')
        return _response
      case -1011:
        iviewApp.$Message.destroy()
        iviewApp.$Message.error('身份过期，请退出重新登录')
        location.reload() // 刷新
        return _response
    }
    console.log('%c █ url    = ' + _response.config.url, 'background: rgba(0, 128, 0, 0.1); color: green')
    console.log('%c █ code = ' + _response.data.code, 'color: green')
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
