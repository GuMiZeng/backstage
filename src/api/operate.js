import api from './index'

let d = {}

/**
 * 查询渠道商
 */
d.operateData = {
  data: {
    current: null,
    size: null,
    total: null
  },
  get () {
    let path = '/v1/account/accounts'
    return api.axios('GET', path)
  }
}

d.addUser = {
  data: {
    remark: null,
    phone: null,
    pwd: null
  },
  post () {
    let path = ''
    return api.axios('GET', path)
  }
}

export default d
