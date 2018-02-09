import api from './index'

let d = {}

/**
 * 查询玩家列表数据
 */
d.playerData = {
  params: {
    current: null,
    size: null,
    key: null,
    sort: -1
  },
  get () {
    let path = `gamer?p=${this.params.current}&s=${this.params.size}&key=${this.params.key}&sort=${this.params.sort}`
    return api.axios('GET', path)
  }
}

d.searchData = {
  params: {
    id: null
  },
  get () {
    let path = `gamer?id=${this.params.id}`
    return api.axios('GET', path)
  }
}

export default d
