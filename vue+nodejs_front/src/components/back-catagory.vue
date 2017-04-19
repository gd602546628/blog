<template>
  <div>
    <el-menu mode="horizontal" active-name="1">
      <div class="layout-assistant">
        <Menu-item name="1">查看分类</Menu-item>
        <Menu-item name="2">添加分类</Menu-item>
      </div>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Menu, MenuItem} from 'iview'
  export default {
    components: {
      'el-menu': Menu,
      'Menu-item': MenuItem
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>

</style>
