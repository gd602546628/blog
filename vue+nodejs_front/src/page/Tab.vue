<template>
  <div>
   <!-- <Tabs class="tabs-wrap">
      <Tab-pane label="首页" name="name1" class="tabs-item">
        <home></home>
      </Tab-pane>
      <Tab-pane label="分类" name="name2" class="tabs-item">标签二的内容</Tab-pane>
      <Tab-pane label="标签三" name="name3" class="tabs-item">标签三的内容</Tab-pane>
    </Tabs>-->

    <div class="tabs-wrap">
      <Menu mode="horizontal" theme="dark" :active-name="currentRoute" class="tabs" v-on:on-select="select" >

        <Menu-item name="home">
          <Icon type="home"></Icon>
         首页
        </Menu-item>

        <Menu-item name="catagory">
          <Icon type="android-list"></Icon>
         分类
        </Menu-item>

        <Menu-item name="1">
          <Icon type="ios-navigate"></Icon>
         关于
        </Menu-item>
      </Menu>
    </div>

    <div class="content">

      <router-view class="view"></router-view>

      <div class="right-content">
        <login class="login"></login>
      </div>
    </div>


  </div>


</template>

<script type="text/ecmascript-6">
  import login from '@/components/login.vue';
  export default {
    name: 'tab',
    components: {
      login:login
    },
    data () {
      return {
          currentRoute:'home'
      }
    },
    methods: {
      select(name){
        this.$router.push(name)
      }
    },

    created(){
      this.currentRoute=this.$route.name;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .tabs-wrap{
    background: #464c5b;
    .tabs{
     max-width: 1200px;
      margin: 0 auto;
      height: 40px !important;
      line-height: 40px !important;
      li{
      }
    }
  }

  .content{
    display: flex;
    margin: 0 auto;
    margin-top:60px;
    display: flex;
    justify-content: center;
    .view{
      flex: 1;
      margin-right:100px;
      max-width: 800px;
    }
  }

</style>




