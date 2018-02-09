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
  ] // 玩家账户
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
  }, _page) {
    let tmp = apiPlayer.playerData.params
    tmp.current = _page.current
    tmp.size = _page.size
    apiPlayer.playerData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        // commit('data', _response.data.data)
      }
    })
  },
  upsearchData ({
    state,
    commit
  }, _params) {
    let tmp = apiPlayer.searchData.data
    tmp.id = _params
    apiPlayer.searchData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        commit('data', _response.data.data)
      }
    })
  },
  sortData ({
    state,
    commit
  }, _params) {
    let tmp = apiPlayer.sortData.params
    tmp.sort = _params.sort
    tmp.key = _params.key
    tmp.current = _params.current
    apiPlayer.sortData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        commit('data', _response.data.data)
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
