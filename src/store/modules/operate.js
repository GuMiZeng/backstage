import apiOperate from '../../api/operate'
const state = {
}

const getters = {

}

const mutations = {
}

const actions = {
  /**
 * @param {*} param0
 * @param {*} callback
 */
  addUser ({
    state,
    commit
  }, _data) {
    let tmp = apiOperate.addUser.data
    tmp.remark = _data.remark
    tmp.phone = _data.phone
    tmp.password = _data.pwd
    apiOperate.addUser.post().then((_response) => {
      if (_response.data.code === 1) {
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
