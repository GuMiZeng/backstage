import api from './index'

let d = {}

/**
 * 查询游戏数据
 */
d.gameData = {
  params: {
    current: null,
    size: null
  },
  get () {
    let path = `gamer?p=${this.params.current}&s=${this.params.size}`
    return api.axios('GET', path)
  }
}

export default d
