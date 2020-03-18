import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: '',
    user_id: 0,
    content: '',
    blog_id: 0,
    user_name: '',
    is_login: false,
  },
  mutations: {
      newAuthor(state, msg){
          state.author = msg
      },
      newUser(state, msg){
          state.user_id = msg
      },
      newContent(state, msg){
          state.content = msg
      },
      newBlogId(state, msg){
          state.blog_id = msg
      },
      newUserName(state, msg){
        state.user_name = msg
     },
     newLogin(state, msg){
       state.is_login = msg
     },
  }
})

export default store