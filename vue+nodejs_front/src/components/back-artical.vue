<template>
  <div class="artical-wrap">
    <el-menu mode="horizontal" active-name="1" v-on:on-select="select">
      <div class="layout-assistant">
        <Menu-item name="1">查看文章</Menu-item>
        <Menu-item name="2">添加文章</Menu-item>
      </div>
    </el-menu>

    <div class="content-wrap">
      <Add v-show="current==2"></Add>
      <el-main v-show="current==1" :current="current" v-on:toEditor="toEditor"></el-main>
      <el-editor v-show="current==3"
                 :catagorySelect="catagorySelect"
                 :editorContent="editorContent"
                 :tittle="tittle"
                 :desription="desription"
      ></el-editor>
    </div>

  </div>
</template>

<script>
  import {Menu} from 'iview'
  import Add from "./back-artical-add.vue"
  import Main from './back-artical-main.vue'
  import edi from './back-artical-editor.vue'
  export default{
    components: {
      'el-menu': Menu,
      Add: Add,
      'el-main': Main,
      'el-editor':edi,
    },
    data(){
      return {
        current: 1,
        catagorySelect:'',
        editorContent:'',
        tittle:'',
        desription:''
      }
    },
    methods: {
      select(name){
        this.current = name
      },

      toEditor(artical){
          console.log(artical)
        this.catagorySelect=artical.catagoryId;
        this.editorContent=artical.content;
        this.tittle=artical.title;
        this.desription=artical.discription;

        this.current=3;
        console.log(this.editorContent)
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .artical-wrap {
    .content-wrap {
      margin: 40px 60px 0 60px;
    }
  }
</style>
