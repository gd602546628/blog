import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/page/Tab'
import back from "@/page/back"
import backUser from '@/components/back-user'
import backCategory from '@/components/back-catagory';
import backArtical from "@/components/back-artical";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Tab
    },
    {
      path: '/back',
      redirect: '/back/user',
      name: 'back',
      component: back,
      children: [
        {
          path: 'user',
          component: backUser
        },
        {
          path: 'category',
          component: backCategory,
        },
        {
          path: 'artical',
          component: backArtical,
        },
      ]
    },
    /*{
      path: '*',
      redirect: '/'
    }*/
  ]
})
