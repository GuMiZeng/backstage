import api from './index'
let d = {}

/**
 * 登录
 */
d.login = {
  data: {
    account: null,
    password: null
  },
  post () {
    let path = 'pubu_user/session'
    return api.axios('POST', path, this.data)
  }
}
/**
 * 获取用户信息
 */
d.profile = {
  get (_current, _size) {
    let path = 'role'
    return api.axios('GET', path)
  }
}

export default d
