import apiCharge from '../../api/charge'
const state = {
  chargeData: [
    {
      state: null,
      num: 100,
      time: '2018-01-12',
      type: '充值'
    }
  ], // 财务数据
  total: 0
}

const getters = {

}

const mutations = {
  chargeData (state, val) {
    state.chargeData = val
  },
  total (state, val) {
    state.total = val
  }
}

const actions = {
  /**
   * 财务数据
   * @param {*} param0
   * @param {*} _page
   */
  upData ({
    state,
    commit
  }, _param) {
    let tmp = apiCharge.chargeData.params
    tmp.type = _param.filter
    tmp.current = _param.current
    tmp.size = _param.size
    tmp.uid = _param.uid
    apiCharge.chargeData.get().then((_response) => {
      if (_response.data.code === '1') {
        commit('chargeData', _response.data.data)
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
