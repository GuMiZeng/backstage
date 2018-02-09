import api from './index'

let d = {}

/**
 * 查询渠道商
 */
d.dealerData = {
  params: {
    current: null,
    size: null,
    key: null,
    sort: -1

  },
  get () {
    let path = `channel?p=${this.params.current}&s=${this.params.size}&key=${this.params.key}&sort=${this.params.sort}`
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
