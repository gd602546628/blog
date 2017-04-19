<template>
  <div classs="add-wrap">
    <h1 class="title">内容添加</h1>

    <Select v-model="model1" v-on:on-change="onSelect">
      <Option v-for="item in catagoryList" :value="item.name" :key="item">{{item.name}}</Option>
    </Select>
    <quill-editor class="editor">

    </quill-editor>
  </div>
</template>

<script>
   import Api from '../api/api'
  export default {
      data(){
          return {
            model1:'',
            catagoryList:[]
          }
      },

    methods:{
      onSelect(item){
          console.log(item)
      }
    },
      created(){
          Api.getCatagory({
              all:true
          }).then((data)=>{
            this.catagoryList=data.data.catagorys
          })
      }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .title{
    margin-bottom: 20px;
  }
  .editor{
    height: 500px;
  }
</style>
