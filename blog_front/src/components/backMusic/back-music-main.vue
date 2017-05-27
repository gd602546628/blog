<template>
  <div>
    <el-table border :context="self" :columns="columns7" :data="data6"></el-table>
    <Page
      :total="total"
      :current="currentPage"
      :page-size="limit"
      v-on:on-change="getCatagory"
      class="catagory-page"
    ></Page>
  </div>
</template>

<script>
  import {Table, Icon, Button} from 'iview';
  import Api from "@/api/api"
  export default {
    components: {
      'el-table': Table,
      'Icon': Icon,
      'i-button': Button
    },
    data () {
      return {
        total: 1,
        currentPage: 1,
        limit: 10,
        self: this,
        currentIndex: 0,
        model: false,
        value: '',
        columns7: [
          {
            title: 'id',
            key: '_id',
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
            }
          }
        ],
        data6: [],
        modelErr: {
          show: false,
          message: ''
        }
      }
    },
    methods: {
      getCatagory(page){
        Api.getMusicList({
          page: page,
          limit: this.limit
        }).then((data) => {
          this.data6 = data.data.data
        })
      },

      remove(index){
        Api.removeMusicList({id: this.data6[index]._id})
          .then((data) => {
            if(data.data.code==0){
              this.data6.splice(index, 1)
            }else{
                alert(data.data.message);
            }
          })
      }
    },

    created(){
      Api.getMusicList({
        page: 1,
        limit: this.limit
      }).then((data) => {
        this.data6 = data.data.data;
        this.total = data.data.count;
      })
    }
  }

</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .catagory-page {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .model-title {
    font-size: 20px;
    margin: 20px 0 20px 0;
  }

  .model-input {
    margin: 0 0 20px 0;
  }
</style>



