<template>
  <div class="artical-wrap">
    <Menu mode="horizontal" active-name="1" v-on:on-select="select">
      <div class="layout-assistant">
        <Menu-item name="1">查看文章</Menu-item>
        <Menu-item name="2">添加文章</Menu-item>
      </div>
    </Menu>

    <div class="content-wrap">
      <Add v-show="current==2"></Add>
      <el-main v-show="current==1" :current="current" v-on:toEditor="toEditor"></el-main>
      <el-editor v-show="current==3"
                 :catagorySelect="catagorySelect"
                 :editorContent="editorContent"
                 :tittle="tittle"
                 :desription="desription"
                 :articalId="articalId"
      ></el-editor>
    </div>

  </div>
</template>

<script>
 // import {Menu} from 'iview'
  import Add from "@/components/backArtical/back-artical-add.vue"
  import Main from '@/components/backArtical/back-artical-main.vue'
  import edi from '@/components/backArtical/back-artical-editor.vue'
  export default{
    components: {
     /* 'el-menu': Menu,*/
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
        desription:'',
        articalId:''
      }
    },
    methods: {
      select(name){
        this.current = name
      },

      toEditor(artical){
        this.catagorySelect=artical.catagoryId;
        this.editorContent=artical.content;
        this.tittle=artical.title;
        this.desription=artical.discription;
        this.articalId=artical._id;
        this.current=3;
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
