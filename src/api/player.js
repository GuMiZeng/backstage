import api from './index'

let d = {}

/**
 * 查询玩家列表数据
 */
d.playerData = {
  params: {
    current: null,
    size: null
  },
  get () {
    let path = `pubu_user/gamer?p=${this.params.current}&s=${this.params.size}`
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

d.sortData = {
  params: {
    sort: null,
    key: null,
    current: null
  },
  get () {
    let path = ``
    return api.api('GET', path)
  }
}

export default d
