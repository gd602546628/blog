<template>
  <div class="tabs">
    <Tabs class="tabs-wrap">
      <Tab-pane label="首页" name="name1" class="tabs-item">
        <home></home>
      </Tab-pane>
      <Tab-pane label="分类" name="name2" class="tabs-item">标签二的内容</Tab-pane>
      <Tab-pane label="标签三" name="name3" class="tabs-item">标签三的内容</Tab-pane>
    </Tabs>

    <div class="right-content">
      <login class="login"></login>
    </div>

  </div>


</template>

<script type="text/ecmascript-6">
  import {Tabs, TabPane} from 'iview';
  import home from "./Home.vue";
  import login from '@/components/login.vue';
  export default {
    name: 'tab',
    components: {
      Tabs: Tabs,
      'Tab-pane': TabPane,
      'home': home,
      login:login
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .tabs {
    position: relative;
    max-width: 1200px;
    margin:0 auto;
    font-size:30px;
    .ivu-tabs-nav{
      font-size:30px !important;

    }
    .ivu-tabs-ink-bar{
      width: 86px !important;
    }
    .ivu-tabs-nav-scroll {
      display: flex;
      justify-content: center;
    }
  }

  .right-content {
    position: absolute;
    right:0;
    top:80px;
  }

</style>




