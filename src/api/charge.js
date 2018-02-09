import api from './index'

let d = {}

/**
 * 查询财务数据
 */
d.chargeData = {
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

d.filterData = {
  params: {
    current: null,
    size: null,
    total: null,
    type: null
  },
  get () {
    let path = '/v1/account/accounts'
    return api.axios('GET', path)
  }
}

export default d
