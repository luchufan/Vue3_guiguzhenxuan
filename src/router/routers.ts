import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

export default [
  {
    //任意路由,如果访问到不存在的路由就会重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '404',
      hidden: true//是否在主页菜单栏中展示，true为隐藏，false为展示
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true//是否在主页菜单栏中展示，true为隐藏，false为展示
    }
  },
  {
    path: '/',
    name: 'layout',
    //路由懒加载
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: 'layout',
      hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
          icon: 'House',
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页',
      hidden: true//是否在主页菜单栏中展示，true为隐藏，false为展示
    }
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
      icon: 'DataLine'
    }
  },
  {
    path: '/acl',
    name: 'acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/permission',
        name: 'permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
          icon: 'Files'
        }
      },
      {
        path: '/acl/role',
        name: 'role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/user',
        name: 'user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          hidden: false,//是否在主页菜单栏中展示，true为隐藏，false为展示
          icon: 'User'
        }
      },
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ]
  }

]