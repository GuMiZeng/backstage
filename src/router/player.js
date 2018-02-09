let d = {}

let list = {
  path: '/player/list',
  meta: {
    title: '玩家列表'
  },
  component: (resolve) => require(['../views/player/list'], resolve)
}

d.index = [{
  path: '/player',
  redirect: '/player/list',
  component: (resolve) => require(['../views/player/index'], resolve),
  children: [
    list
  ]
}]

export default d
