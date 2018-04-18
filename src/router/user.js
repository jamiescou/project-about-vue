var user = [
  // 信息管理 ***/
  {
    path: '/user/base-info',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 系统账号信息
      component: resolve => require(['../module/user/base-info/index.vue'], resolve)
    }]
  },
  {
    path: '/user/real-name',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 实名信息
      component: resolve => require(['../module/user/real-name/index.vue'], resolve)
    }]
  },
  {
    path: '/user/protocal',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 协议信息
      component: resolve => require(['../module/user/protocol/index.vue'], resolve)
    }]
  },
  {
    path: '/user/certificate',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 安全信息
      component: resolve => require(['../module/user/certificate/index.vue'], resolve)
    }]
  },
  {
    path: '/user/password',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 安全信息
      component: resolve => require(['../module/user/password/index.vue'], resolve)
    }]
  }
]

export default user
