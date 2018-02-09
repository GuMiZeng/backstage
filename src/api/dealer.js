import api from './index'

let d = {}

/**
 * 查询渠道商
 */
d.dealerData = {
  data: {
    current: null,
    size: null

  },
  get () {
    let path = `/v1/account/accounts`
    return api.axios('GET', path)
  }
}

d.sortData = {
  params: {
    sort: null,
    key: null,
    current: null
  },
  get () {
    let path = `/v1/account/accounts?sort=${this.params.sort}/key=${this.params.key}/current=${this.params.current}`
    return api.axios('GET', path)
  }
}

d.searchData = {
  params: {
    id: null
  },
  get () {
    let path = ``
    return api.api('GET', path)
  }
}

export default d
