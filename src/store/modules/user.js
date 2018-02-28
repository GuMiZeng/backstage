import apiUser from '../../api/user'
import localUser from '../../local/user'
import router from '../../router'
import base64 from 'base64-url'
const state = {
  uid: 0, // 账户id
  jwt: 0,
  isAdmin: false
}

const getters = {

}

const mutations = {
  uid (state, newVal) {
    state.uid = newVal
    localUser.uid(newVal)
  },
  isAdmin (state, newVal) {
    state.isAdmin = newVal
    localUser.isAdmin(newVal)
  },
  jwt (state, _str) {
    if (_str) { // 退出登录需要设置jwt为零
      let _arr = _str.split('.')
      let _obj = JSON.parse(base64.decode(_arr[1]))
      state.exp = _obj.exp
      // state.uid = _obj.account_num // 用户ID
    }
    state.jwt = _str
    localUser.jwt(_str)
  }
}

const actions = {
  login ({
    state,
    commit
  }, _value) {
    let tmp = apiUser.login.data
    tmp.account = _value.phone
    tmp.password = _value.password
    apiUser.login.post().then((_response) => {
      if (_response.data.code === 1) {
        console.log(_response.data.data.uid, _response.data.data.isAdmin, 'llllllll')
        commit('uid', _response.data.data.uid)
        commit('isAdmin', _response.data.data.isAdmin)
        commit('jwt', _response.data.data.jwt) // 设置jwt
        router.push({ path: 'player' }) // 跳转
      }
    })
  },
  updataProfile ({
    state,
    commit
  }) {
    apiUser.profile.get().then((response) => {
      // 获取用户信息
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
