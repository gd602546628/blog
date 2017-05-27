<template>
  <div>
    <!--<el-menu mode="horizontal" active-name="1">
      <div class="layout-assistant">
        <Menu-item name="1">一级导航</Menu-item>
        <Menu-item name="2">二级导航</Menu-item>
        <Menu-item name="3">二级导航</Menu-item>
      </div>
    </el-menu>-->
    <div class="layout-content">
      <el-table stripe :columns="columns1" :data="data1" class="table"></el-table>
      <Page :total="total" :current="currentPage" :page-size="this.limit" class="user-page" v-on:on-change="getUser"></Page>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Menu, MenuItem, Table, Page} from 'iview';
  import Api from '@/api/api'
  export default{
    components: {
      'el-menu': Menu,
      'Menu-item': MenuItem,
      'el-table': Table,
      Page: Page
    },
    data(){
      return {
        columns1: [
          {
            title: 'id',
            key: '_id'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '密码',
            key: 'password'
          },
          {
            title: '管理员',
            key: 'isAdmin'
          }
        ],
        data1: [],
        total: 1,
        currentPage: 2,
        limit: 10,
        page: 1
      }
    },

    methods:{
      getUser(page){
          Api.getUser({
              page:page,
              limit:this.limit
          }).then((data)=>{
              this.data1=data.data.users
          })
      }

    },

    created(){
      Api.getUser({
        page: this.page,
        limit: this.limit
      })
        .then((data) => {
          this.data1 = data.data.users;
          this.total = data.data.pages;
          this.currentPage = this.page
        })
    }

  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .layout-content {
    .user-page {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .table{
      margin:20px 60px 0 60px;
    }
  }

</style>
