import {
  local
} from './index'

let namespace = 'user' // 本地存储命名空间
let user = {}

/**
 * 获取、设置 uid 本地存储
 */
user.uid = (_str) => {
  return _str == null ? local.get(namespace + '_uid') : local.set(namespace + '_uid', _str)
}

/**
 * 获取、设置 isAdmin 本地存储
 */
user.isAdmin = (_str) => {
  return _str == null ? local.get(namespace + '_isAdmin') : local.set(namespace + '_isAdmin', _str)
}

/**
 * 获取、设置 jwt
 */
user.jwt = (_str) => {
  // return _str == null ? local.get(namespace + '_jwt') : local.set(namespace + '_jwt', _str, 60 * 90 * 1000)
  return _str == null ? local.get(namespace + '_jwt') : local.set(namespace + '_jwt', _str)
}

export default user
