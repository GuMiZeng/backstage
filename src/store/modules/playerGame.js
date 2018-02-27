import apiGame from '../../api/game'
const state = {
  data: [
    {
      ID: null,
      result: 0,
      time: null
    }
  ], // 游戏数据
  total: 0
}

const getters = {

}

const mutations = {
  data (state, val) {
    state.gameData = val
  },
  total (state, val) {
    state.total = val
  }
}

const actions = {
  /**
   * 游戏数据
   * @param {*} param0
   * @param {*} _page
   */
  upData ({
    state,
    commit
  }, _page) {
    let tmp = apiGame.gameData.params
    tmp.current = _page.current
    tmp.size = _page.size
    apiGame.gameData.get().then((_response) => {
      if (_response.data.status === 1) {
        commit('data', _response.data.data)
        commit('total', _response.data.data.length)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
