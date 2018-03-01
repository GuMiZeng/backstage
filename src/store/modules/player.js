import apiPlayer from '../../api/player'
const state = {
  gameModal: false, // 游戏弹框
  chargeModal: false, // 财务弹框
  ID: null, // 玩家ID
  data: [
    {
      phone: '18485654856',
      email: '707852584@qq.com',
      addr: '北京朝阳区',
      remark: '瀑布网吧',
      ID: '123',
      dealerID: '456',
      create_at: '2018-01-02',
      trade: '2018-01-02:14:26',
      victory: 5,
      all_game: 10,
      balance: 12
    }
  ], // 玩家账户
  total: 0
}

const getters = {

}

const mutations = {
  gameModal (state, _bool) {
    state.gameModal = _bool
  },
  chargeModal (state, _bool) {
    state.chargeModal = _bool
  },
  ID (state, _num) {
    state.ID = _num
  },
  data (state, val) {
    state.data = val
  },
  total (state, val) {
    state.total = val
  }
}

const actions = {
  /**
   * 玩家列表数据
   * @param {*} param0
   * @param {*} callback
   */
  upData ({
    state,
    commit
  }, _params) {
    let tmp = apiPlayer.playerData.params
    tmp.current = _params.current
    tmp.size = _params.size
    tmp.key = _params.key
    tmp.sort = _params.sort
    apiPlayer.playerData.get().then((_response) => {
      if (_response.data.code === 1) {
        commit('data', _response.data.data)
        commit('total', _response.data.total)
      }
    })
  },
  searchData ({
    state,
    commit
  }, _params) {
    let tmp = apiPlayer.searchData.params
    tmp.id = _params
    apiPlayer.searchData.get().then((_response) => {
      if (_response.data.code === 1) {
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
