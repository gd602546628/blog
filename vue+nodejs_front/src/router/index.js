import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/page/Tab'
import back from "@/page/back"
import backUser from '@/components/back-user'
import backCategory from '@/components/back-catagory';
import categoryMain from '@/components/back-catagory-main';
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
          redirect: '/back/category/main',
          component: backCategory,
          children: [
            {
              path: 'main',
              component: categoryMain
            },
          ]
        },
      ]
    },
    /*{
      path: '*',
      redirect: '/'
    }*/
  ]
})
