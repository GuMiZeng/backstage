import api from './index'

let d = {}

/**
 * 查询财务数据
 */
d.chargeData = {
  params: {
    type: null,
    current: null,
    size: null
  },
  get () {
    let path = `wallet_log/${this.params.type}/${this.params.current}/${this.params.size}`
    return api.axios('GET', path)
  }
}

export default d
