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
  import Api from "../api/api"
  export default {
    components: {
      'el-table': Table,
      'Icon': Icon,
      'i-button': Button
    },
    props:['current'],
    data () {
      return {
        total: 1,
        currentPage: 1,
        limit: 10,
        self: this,
        currentIndex: 0,
        value: '',
        columns7: [
          {
            title: '标题',
            key: 'title',
          },
          {
            title: '分类',
            key: 'catagory'
          },
          {
            title: '描述',
            key: 'discription'
          },
          {
            title: '阅读量',
            key: 'views'
          },
          {
            title: '添加时间',
            key: 'addTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="editor(${index})">编辑</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
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
        Api.getArtical({
          page: page,
          limit: this.limit
        }).then((data) => {
          this.data6 = data.data.articals.map((item)=>{
            return {
              _id:item._id,
              catagory:item.catagory.name,
              catagoryId:item.catagory._id,
              title:item.title,
              addTime:new Date(item.addTime).toLocaleString(),
              views:item.views,
              discription:item.discription,
              content:item.content
            }
          })
          this.total = data.data.count;
        })
      },
      editor(index){
        this.currentIndex = index;
        this.$emit('toEditor',this.data6[index])
      },
      remove(index){

      }
    },

    created(){
      this.getCatagory(1)
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



