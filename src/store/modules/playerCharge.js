import apiCharge from '../../api/charge'
const state = {
  chargeData: [
    {
      state: null,
      num: 100,
      time: '2018-01-12',
      type: '充值'
    }
  ] // 财务数据
}

const getters = {

}

const mutations = {
  chargeData (state, val) {
    state.chargeData = val
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
    apiCharge.chargeData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        commit('chargeData', _response.data.data)
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
