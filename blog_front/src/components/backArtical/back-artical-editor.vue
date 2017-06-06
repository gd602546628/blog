<template>
  <div classs="add-wrap">
    <h1 class="title">文章修改</h1>


    <div>
      <p class="label">添加标题：</p>
      <Input v-model="tittle" placeholder="请输入标题"></Input>
    </div>
    <div class="add-select">
      <p class="label">选择分类：</p>
      <Select v-model="catagorySelect" v-on:on-change="onSelect">
        <Option v-for="item in catagoryList" :value="item._id" :key="item">{{item.name}}</Option>
      </Select>
    </div>

    <div class="desription">
      <p class="label">编辑描述：</p>
      <Input v-model="desription" placeholder="请输入描述" type="textarea" :rows="4"></Input>
    </div>

    <div class="add-editor">
      <p class="label">编辑内容：</p>
      <mavon-editor  v-model="editorContent"/>
     <!-- <quill-editor class="editor" v-model="editorContent">
      </quill-editor>-->
    </div>

    <Alert type="error" class="add-alert" v-show="errMessage.show">{{errMessage.message}}</Alert>
    <Alert type="success" class="add-alert" v-show="successMessage">保存成功</Alert>
    <Button type="primary" class="add-button" @click="onSubmit()">
      提交
    </Button>
  </div>
</template>

<script>
  import Api from '@/api/api'
  export default {
    data(){
      return {
        catagoryList: [],
        errMessage: {
          show: false,
          message: ''
        },
        successMessage: false
      }
    },

    props:['catagorySelect','editorContent','tittle','desription','articalId'],
    methods: {
      onSelect(item){

      },

      onSubmit(){
        console.log(this.tittle)
        console.log(this.catagorySelect)
        console.log(this.desription)
        console.log(this.editorContent)
        Api.editorArtical({
          title: this.tittle,
          catagory: this.catagorySelect,
          discription: this.desription,
          content: this.editorContent,
          id:this.articalId
        }).then((data) => {
          if (data.data.code == 0) {
            window.location.reload();
          } else {
            this.successMessage = false;
            this.errMessage.show = true;
            this.errMessage.message = data.data.message;
          }
        })
      }

    },
    created(){
      Api.getCatagory({
        all: true
      }).then((data) => {
        this.catagoryList = data.data.catagorys;

      });


    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .title {
    margin-bottom: 20px;
  }

  .editor {
    height: 300px;
  }

  .add-button {
    width: 100%;
    height: 40px;
    margin-top: 30px;
  }

  .label {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .add-select {
    margin-top: 30px;
  }

  .add-editor {
    margin-top: 30px;
  }

  .desription {
    margin-top: 30px;
  }

  .add-alert {
    margin-top: 60px;
  }

</style>
