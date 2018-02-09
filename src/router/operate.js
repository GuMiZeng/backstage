let d = {}

let list = {
  path: '/operate/list',
  meta: {
    title: '渠道列表'
  },
  component: (resolve) => require(['../views/operate/list'], resolve)
}

d.index = [{
  path: '/operate',
  redirect: '/operate/list',
  component: (resolve) => require(['../views/operate/index'], resolve),
  children: [
    list
  ]
}]

export default d
