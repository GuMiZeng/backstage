import {
  local
} from './index'

let namespace = 'user' // 本地存储命名空间
let user = {}

/**
 * 获取、设置 token 不进行本地存储
 */
// user.token = (_str) => {
//     return _str == null ? local.get(namespace + '_token') : local.set(namespace + '_token', _str, 60 * 60 * 24 * 1000)
// }

/**
 * 获取、设置 jwt
 */
user.jwt = (_str) => {
  // return _str == null ? local.get(namespace + '_jwt') : local.set(namespace + '_jwt', _str, 60 * 90 * 1000)
  return _str == null ? local.get(namespace + '_jwt') : local.set(namespace + '_jwt', _str)
}

export default user
