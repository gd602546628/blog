<template>
  <div class="login-module">
   <Card>
     <div class="login-wrap">
       <el-form ref="formInline" :model="formInline" :rules="ruleInline">
         <Form-item prop="user">
           <el-input type="text" v-model="formInline.user" placeholder="Username">
             <Icon type="ios-person-outline" slot="prepend"></Icon>
           </el-input>
         </Form-item>
         <Form-item prop="password">
           <el-input type="password" v-model="formInline.password" placeholder="Password">
             <Icon type="ios-locked-outline" slot="prepend"></Icon>
           </el-input>
         </Form-item>
         <Alert type="error">错误提示文案</Alert>
         <Form-item>
           <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
         </Form-item>

         <Form-item>
           <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
         </Form-item>
       </el-form>
     </div>
   </Card>

    <Card>
      <div class="logout-wrap">
        <p class="tittle">用户信息</p>
        <p>admin</p>
        <p class="welcom">你好，欢迎光临我的博客</p>
        <Button type="primary" @click="handleSubmit('formInline')">退出</Button>
      </div>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Form,FormItem,Input,Icon,Alert,Card} from 'iview'
  export default {
    components:{
       'el-form':Form,
      'Form-item':FormItem,
      'el-input':Input,
      Icon:Icon,
      Alert:Alert,
      Card:Card
    },
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {

      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .login-module{
    width: 300px;
    .login-wrap{
      Button{
        width: 100%;

      }
    }
    .logout-wrap{
      .tittle{
        font-size: 20px;
      }
      Button{
        width: 100%;
        height: 36px;
        margin-top:20px;
      }
      p{
        margin-top:10px
      }
      .welcom{
         color: #39f;
      }
    }

  }

</style>
