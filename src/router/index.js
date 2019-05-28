import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import user from '@/components/user/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      hidden: true
    },
    {
      path: '/home',
      name: '首页',
      component: home,
      hidden: true
    },
    {
      path: '/user',
      name: '用户',
      component: user,
      children: [
        { path: '/user', component: user, name: '用户管理', hidden: false },

      ]
    }
  ]
})



// export default routes;

