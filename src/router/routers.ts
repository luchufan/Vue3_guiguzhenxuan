export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  },
  {
    path: '/home',
    name: 'home',
    //路由懒加载
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
]