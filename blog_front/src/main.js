// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css';
//import iView from 'iview';
//import VueQuillEditor from 'vue-quill-editor';
import store from './store/store'
import Vuex from 'vuex';
//import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

/*Vue.config.productionTip = false;
Vue.use(mavonEditor);
//Vue.use(iView);
//Vue.use(VueQuillEditor);
Vue.use(Vuex);
/!* eslint-disable no-new *!/
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})*/

let mavonEditor = null
let iView = null
require.ensure([], function (require) {
   mavonEditor = require('mavon-editor');
  Vue.use(mavonEditor);
})
require.ensure([],function(require){
  iView = require('iview');
  Vue.use(iView);
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  })
})
Vue.config.productionTip = false;

Vue.use(Vuex);
/* eslint-disable no-new */

