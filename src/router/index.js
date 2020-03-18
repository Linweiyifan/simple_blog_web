import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import layout from '@/components/layout/layout'
import register from '@/components/login/Register'
import login from '@/components/login/Login'
import news from '@/components/blog/News'
import userinfo from '@/components/user/UserInfo'
import editblog from '@/components/blog/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'index',
      component: layout,
      children:[
        {
          path: '/register',
          component: register,
          name: 'register'
        },
        {
          path: '/login',
          component: login,
          name: 'login'
        },
        {
          path: '/news',
          component: news,
          name: 'news',
          meta:{requireAuth:true}
        },
        {
          path: '/userinfo',
          component: userinfo,
          name: 'userinfo',
          meta:{requireAuth:true}
        },
        {
          path: '/editblog',
          component: editblog,
          name: 'editblog',
          meta:{requireAuth:true}
        },
      ]
    }
  ]
})
