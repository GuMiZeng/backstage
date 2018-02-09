let d = {}

let list = {
  path: '/dealer/list',
  meta: {
    title: '渠道列表'
  },
  component: (resolve) => require(['../views/dealer/list'], resolve)
}

d.index = [{
  path: '/dealer',
  redirect: '/dealer/list',
  component: (resolve) => require(['../views/dealer/index'], resolve),
  children: [
    list
  ]
}]

export default d
