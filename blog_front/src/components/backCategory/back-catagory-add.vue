<template>
 <div class="wrap">
   <Input v-model="value" placeholder="输入分类名称" class="input"></Input>

   <Alert type="success" v-show="state==0">{{message}}</Alert>
   <Alert type="error" v-show="state==1">{{message}}</Alert>
   <div class="add-btn">
     <Button type="primary" @click="add()">提交</Button>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
  import Api from '@/api/api'
  export default {
      data(){
          return {
              value:'',
              state:-1,
              message:''
          }
      },

    methods:{
        add(){
        Api.AddCatagory({
          name:this.value
        }).then((data)=>{
           this.state=data.data.code;
           this.message=data.data.message;
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .wrap{
    .input{
      margin-bottom:10px
    }
    .add-btn{
     display: flex;
      align-items: center;
      justify-content: center;
       Button{
          width: 400px;
           margin-top:40px;
       }
    }
  }

</style>
