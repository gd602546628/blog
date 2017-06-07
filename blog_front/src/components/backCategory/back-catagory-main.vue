<template>
  <div>
    <Table border :context="self" :columns="columns7" :data="data6"></Table>
    <Page
      :total="total"
      :current="currentPage"
      :page-size="limit"
      v-on:on-change="getCatagory"
      class="catagory-page"
    ></Page>
    <Modal v-model="model" @on-ok="onOk">
      <p class="model-title">修改分类</p>
      <Input v-model="value" placeholder="请输入分类名称" class="model-input"></Input>
      <Alert type="error" v-show="modelErr.show">{{modelErr.message}}</Alert>
      <div slot="footer">
        <Button @click="onCannel">取消</Button>
        <Button type="primary" @click="onOk()">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  //import {Table, Icon, Button} from 'iview';
  import Api from "@/api/api"
  export default {
    components: {
     /* 'el-table': Table,
      'Icon': Icon,
      'i-button': Button*/
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
        Api.getCatagory({
          page: page,
          limit: this.limit
        }).then((data) => {
          this.data6 = data.data.catagorys
        })
      },
      editor(index){
        this.model = true;
        this.currentIndex = index;
      },
      onOk(){
        Api.updataCatagory({id: this.data6[this.currentIndex]._id, name: this.value})
          .then((data) => {
            if (data.data.code == 0) {
              this.data6[this.currentIndex].name = this.value;
              this.model = false;
              this.modelErr.show = false;
              this.modelErr.message = "";
            } else {
              this.modelErr.show = true;
              this.modelErr.message = data.data.message;
            }
          })
      },
      onCannel(){
        this.model = false;
        this.modelErr.show = false;
        this.modelErr.message = "";
      },
      remove(index){
        Api.removeCatagory({id: this.data6[index]._id})
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
      Api.getCatagory({
        page: 1,
        limit: this.limit
      }).then((data) => {
        this.data6 = data.data.catagorys;
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



