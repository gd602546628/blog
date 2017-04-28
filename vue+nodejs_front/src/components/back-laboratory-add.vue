<template>
  <div class="labAdd" >
    <div class="labAdd-form">
      <p>服务器域名或IP：</p>
      <Input  placeholder="请输入服务器域名或IP" v-model="data.host" name="host"></Input>
    </div>

    <div class="labAdd-form">
      <p>Demo名称：</p>
      <Input  placeholder="请输入Demo名称" v-model="data.demoName" name="demoName"></Input>
    </div>

    <div class="labAdd-form">
      <p>Demo入口名称：</p>
      <Input  placeholder="请输入Demo入口名称" v-model="data.entryName" name="entryName"></Input>
    </div>

    <Upload
      multiple
      type="drag"
      :data="data"
      action="http://172.31.60.66:8888/api/demo/upload"
      :on-success="success"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或将文件拖拽到这里上传</p>
      </div>
    </Upload>



  </div>
</template>

<script>
  import Api from '../api/api'
  export default {
      data(){
          return {
            data:{
              host:'',
              demoName:'',
              entryName:''
            }
          }
      },
    methods:{
          success(data){
              console.log(data)
          }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .labAdd{
   .labAdd-form{
     margin-bottom: 20px;
     p{
       margin-bottom: 10px;
     }
   }
  }
</style>
