// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import tw_request from './request/index';
import moment from 'moment'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(Vuex)
tw_request()
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)

})


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(localStorage.getItem('user_id')){ //判断本地是否存在user_id  
        next();
      }else {
        if(to.path === '/login'){
          next();
        }else {
        next({
            path:'/login'
            })
          }
       } 
    }
    else {
      next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
});


