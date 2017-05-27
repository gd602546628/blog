<template>
  <div class="back-catagory">
    <el-menu mode="horizontal" active-name="1" v-on:on-select="select">
      <div class="layout-assistant">
        <Menu-item name="1">demo列表</Menu-item>
        <Menu-item name="2">添加demo</Menu-item>
      </div>
    </el-menu>

    <div class="content-wrap">
      <el-main v-show="current==1"></el-main>
      <el-add v-show="current==2"></el-add>
    </div>
  </div>
</template>

<script>
  import {Menu, MenuItem} from 'iview';
  import Main from "@/components/backDemo/back-laboratory-main.vue";
  import Add from  "@/components/backDemo/back-laboratory-add.vue";
  export default {
    components: {
      'el-menu': Menu,
      'Menu-item': MenuItem,
      'el-main': Main,
      'el-add': Add
    },

    data(){
      return {
        current: 1
      }
    },

    methods: {
      select(name){
        this.current = name
      }
    }

  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .back-catagory {
    .content-wrap {
      margin: 40px 60px 0 60px;
    }
  }
</style>
