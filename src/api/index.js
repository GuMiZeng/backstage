import Axios from 'axios'
import localUser from '../local/user'

let d = {}

/**
 * 配置参数
 */

d.config = {
  // baseURL: 'http://api.pubu.me:7001/api/',
  // headers: {
  //   'jwt': localUser.jwt(),
  //   'Content-Type': 'application/json'
  // }
}

/**
 * 发送请求
 * @param {*} _method 必须大写
 * @param {*} _url
 * @param {*} _data
 */
d.axios = function (_method, _path, _data) {
  return Axios.request({
    method: _method,
    // baseURL: this.config.baseURL,
    // url: `${_path}?${this.payload(_method, this.huobi.host, _path, this.huobi.body, this.huobi.secretKey)}`,
    url: _path,
    data: _data,
    // headers: this.config.headers
    baseURL: 'http://api.pubu.me:7001/api/',
    headers: {
      'jwt': localUser.jwt(),
      'Content-Type': 'application/json'
    }
  })
}

export default d
