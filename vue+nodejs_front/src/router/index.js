import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/page/Tab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Tab
    }
  ]
})
