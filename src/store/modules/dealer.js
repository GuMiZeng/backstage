import apiDealer from '../../api/dealer'
const state = {
  data: [
    {
      phone: '15845896578',
      addr: '上海浦东',
      remark: '经销商',
      ID: '123',
      trade: 12,
      frozen: 122,
      Fid: 456,
      name: '经销商名'
    }
  ] // 渠道账户
}

const getters = {

}

const mutations = {
  data (state, newVal) {
    state.data = newVal
  }
}

const actions = {
  /**
 * @param {*} param0
 * @param {*} callback
 */
  upData ({
    state,
    commit
  }, _params) {
    let tmp = apiDealer.dealerData.params
    tmp.current = _params.current
    tmp.size = _params.size
    tmp.key = _params.key
    tmp.sort = _params.sort
    apiDealer.dealerData.get().then((_response) => {
      if (_response.data.code === 1) {
        commit('data', _response.data.data)
      }
    })
  },
  searchData ({
    state,
    commit
  }, _params) {
    let tmp = apiDealer.searchData.params
    tmp.id = _params
    apiDealer.searchData.get().then((_response) => {
      if (_response.data.code === 1) {
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
