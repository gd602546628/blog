// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css';
import iView from 'iview';
import VueQuillEditor from 'vue-quill-editor';
import store from './store/store'
import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueQuillEditor);
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
