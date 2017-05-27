import Vue from 'vue'
import Router from 'vue-router'

import Tab from '@/page/front/Tab'//tab页，前台一级页
import about from '@/page/front/about';//前台二级页，关于页
import Home from '@/page/front/Home';//前台二级页，首页
import Catagory from '@/page/front/Catagory';//前台二级页，分类页
import artical from '@/page/front/artical';//前台二级页，文章页
import CataArtical from '@/page/front/catagory-artical';//前台二级页，分类文章页
import fontLab from '@/page/front/lab';//前台二级页，实验室页
//import labDetail from '@/components/demo-detail';


import back from "@/page/back/back";//后台一级页
import backArtical from "@/page/back/back-artical";//后台二级页，文章管理页
import backUser from '@/page/back/back-user'//后台二级页，用户管理页
import backCategory from '@/page/back/back-catagory';//后台二级页，分类管理页
import backMusic from '@/page/back/back-music';//后台二级页，音乐管理页
import backLab from '@/page/back//back-laboratory';//后台二级页，实验室管理页








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
        },
        {
          path:'lab',
          component:fontLab,
          name:'lab'
        },
        /*{
          path:'labDetail',
          component:labDetail,
          name:'labDetail'
        }*/
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
          component: backUser,
          name:'user'
        },
        {
          path: 'category',
          component: backCategory,
          name:'category'
        },
        {
          path: 'artical',
          component: backArtical,
          name:'artical'
        },
        {
          path: 'music',
          component: backMusic,
        },
        {
          path: 'laboratory',
          component: backLab,
          name:'laboratory'
        },

      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
