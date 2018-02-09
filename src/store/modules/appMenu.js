const state = {
  active: '', // 激活导航
  list: [
    {
      icon: 'ios-game-controller-b',
      title: '玩家',
      path: '/player',
      submenu: [
        {
          title: '玩家列表',
          path: '/player/list'
        }
      ]
    },
    {
      icon: 'flag',
      title: '渠道',
      path: '/dealer',
      submenu: [
        {
          title: '渠道列表',
          path: '/dealer/list'
        }
      ]
    },
    {
      icon: 'flag',
      title: '运营',
      path: '/operate',
      submenu: [
        {
          title: '权限',
          path: '/operate/list'
        }
      ]
    }
  ]
}

const getters = {

}

const mutations = {
  active (state, _val) {
    let _path = `/${_val.split('/')[1]}`
    let _list = state.list
    for (let i in _list) {
      if (_list[i].path === _path) {
        state.active = _list[i]
        break
      }
    }
  },
  list (state, _val) {
    state.list = _val
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
