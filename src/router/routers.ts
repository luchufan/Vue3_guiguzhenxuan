export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '404'
    }
  },
  {
    path: '/',
    name: 'layout',
    //路由懒加载
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页'
        }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试'
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404'
    }
  },
]