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
  },
  dealerList (state, newVal) {
    state.dealerList = newVal
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
  }, _page) {
    let tmp = apiDealer.dealerData.data
    tmp.current = _page.current
    tmp.size = _page.size
    tmp.total = _page.total
    apiDealer.dealerData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        commit('data', _response.data.data)
      }
    })
  },
  sortData ({
    state,
    commit
  }, _params) {
    let tmp = apiDealer.sortData.params
    tmp.sort = _params.sort
    tmp.key = _params.key
    tmp.current = _params.current
    apiDealer.sortData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        commit('data', _response.data.data)
      }
    })
  },
  searchData ({
    state,
    commit
  }, _params) {
    let tmp = apiDealer.searchData.data
    tmp.id = _params
    apiDealer.searchData.get().then((_response) => {
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