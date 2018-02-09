import apiOperate from '../../api/operate'
const state = {
  data: [] // 渠道账户
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
  }, _page) {
    let tmp = apiOperate.operateData.data
    tmp.current = _page.current
    tmp.size = _page.size
    tmp.total = _page.total
    apiOperate.operateData.get().then((_response) => {
      if (_response.data.status === 'ok') {
        commit('data', _response.data.data)
      }
    })
  },
  addUser ({
    state,
    commit
  }, _data) {
    let tmp = apiOperate.addUser.data
    tmp.reamrk = _data.reamrk
    tmp.phone = _data.phone
    tmp.pwd = _data.pwd
    apiOperate.addUser.post().then((_response) => {
      if (_response.data.status === 'ok') {
        // commit('data', _response.data.data)
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
