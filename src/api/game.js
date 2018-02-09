import api from './index'

let d = {}

/**
 * 查询游戏数据
 */
d.gameData = {
  params: {
    current: null,
    size: null,
    total: null
  },
  get () {
    let path = '/v1/account/accounts'
    return api.axios('GET', path)
  }
}

export default d
