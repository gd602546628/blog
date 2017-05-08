/**
 * Created by gd on 2017/5/8.
 */
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    theme: localStorage.theme || 0
  },

  mutations: {
    star(state){
      localStorage.theme = 1;
      state.theme = 1;
    },

    dot(state){
      localStorage.theme = 0;
      state.theme = 0
    }
  }

})

export default store;
