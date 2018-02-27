import api from './index'

let d = {}

d.addUser = {
  data: {
    remark: null,
    phone: null,
    password: null
  },
  post () {
    let path = 'pubu_user'
    return api.axios('POST', path, this.data)
  }
}

export default d
