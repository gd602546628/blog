import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/page/Tab'
import back from "@/page/back"
import backUser from '@/components/back-user'
import backCategory from '@/components/back-catagory';
import backArtical from "@/components/back-artical";
import Home from '@/page/Home';
import artical from '@/components/artical';
import Catagory from '@/page/Catagory';
import CataArtical from '@/components/catagory-artical';
import backMusic from '@/components/back-music';
import about from '@/page/about';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Hello',
      component: Tab,
      redirect: '/index/home',
      children:[
        {
          path:'home',
          component:Home,
          name:'home'
        },
        {
          path:'artical',
          component:artical,
          name:'artical'
        },
        {
          path:'catagory',
          component:Catagory,
          name:'catagory'
        },
        {
          path:'cataArtical',
          component:CataArtical,
          name:'cataArtical'
        },
        {
          path:'about',
          component:about,
          name:'about'
        }
      ]
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
        {
          path: 'music',
          component: backMusic,
        },
        {
          path: 'laboratory',
          component: backMusic,
        },
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
