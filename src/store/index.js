import Vuex from 'vuex'
import modules from './modules'
let d = {}
let store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

d.state = function (_type, _payload) {
  let _path = _type.split('/')
  let _namespace = _path[0]
  let _stateName = _path[1]
  if (_payload !== undefined) {
    store.commit(_type, _payload)
  }
  return store.state[_namespace][_stateName]
}

d.actions = function (_type, _payload) {
  return store.dispatch(_type, _payload)
}

export default d
