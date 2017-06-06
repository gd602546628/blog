<template>
  <div class="labAdd">

    <div class="labAdd-form">
      <p>Demo名称：</p>
      <Input placeholder="请输入Demo名称" v-model="data.name" name="demoName"></Input>
    </div>

    <div class="labAdd-form">
      <p>Demo路径：</p>
      <Input placeholder="请输入Demo入口名称" v-model="data.path" name="entryName"></Input>
    </div>

    <Alert type="success" v-show="alertMessage.success==0">{{alertMessage.message}}</Alert>
    <Alert type="error" v-show="alertMessage.success==1">{{alertMessage.message}}</Alert>
    <Button type="primary" class="labAdd-button" @click="addDemo">确定</Button>
    <!--  <Upload
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
      </Upload>-->


  </div>
</template>

<script>
  import Api from '@/api/api'
  export default {
    data(){
      return {
        data: {
          name: '',
          path: ''
        },
        alertMessage: {
          message: '',
          success: -1
        }
      }
    },
    methods: {
      addDemo(){
        Api.addDemo({
          name: this.data.name,
          path: this.data.path
        }).then(data => {
          if (data.data.code == 0) {
            this.alertMessage.success = 0;
            this.alertMessage.message = data.data.message
          } else {
            this.alertMessage.success = 1;
            this.alertMessage.message = data.data.message
          }
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .labAdd {
    .labAdd-form {
      margin-bottom: 20px;
      p {
        margin-bottom: 10px;
      }
    }

    .labAdd-button {
      width: 100%;
    }
  }
</style>
