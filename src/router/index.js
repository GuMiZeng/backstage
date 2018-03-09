import Router from 'vue-router'
import store from '../store'
import player from './player' // 玩家
import dealer from './dealer' // 渠道
import operate from './operate' // 渠道

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/login', // 重定向
    meta: {
      title: 'PuBu.me'
    },
    component: (resolve) => require(['../views/main'], resolve),
    children: [
      ...player.index,
      ...dealer.index,
      ...operate.index
    ]
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: (resolve) => require(['../views/login'], resolve)
  },
  {
    path: '*',
    redirect: '/'
  }
]

// 滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return {
      y: 0
    }
  }
}

// 嵌入路由
const router = new Router({
  routes,
  scrollBehavior,
  linkActiveClass: 'active'
})

// 钩子
router.beforeEach((to, from, next) => {
  console.log(`%c █ router = ${to.path}`, 'background: rgba(0, 0, 255, 0.1);color: blue')
  store.state('appMenu/active', to.path) // 当前导航
  window.document.title = to.meta.title
  // 未登录，跳转登录
  if (!store.state('user/jwt') && to.path !== '/login') {
    router.push('/login')
  }
  next()
  // 禁止浏览器前进后退
  history.pushState(null, null, document.URL)
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL)
  })
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
