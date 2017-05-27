<template>
  <div class="login-module">
    <Card v-show="userState==0">
      <div class="login-wrap">
        <el-form ref="formInline" :model="formInline" :rules="ruleInline">
          <p class="tittle">用户登录</p>
          <Form-item prop="user">
            <el-input type="text" v-model="formInline.user" placeholder="请输入用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </el-input>
          </Form-item>
          <Form-item prop="password">
            <el-input type="password" v-model="formInline.password" placeholder="请输入密码">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </el-input>
          </Form-item>
          <Alert type="error" v-show="errorMessage.show">{{errorMessage.message}}</Alert>
          <Form-item>
            <Button type="primary" @click="login()">登录</Button>
          </Form-item>

        </el-form>
      </div>
    </Card>

   <!-- <Card v-show="userState==1">
      <div class="login-wrap">
        <el-form ref="formInline" :model="formInline" :rules="ruleInline">
          <p class="tittle">用户注册</p>
          <Form-item prop="user">
            <el-input type="text" v-model="formInline.user" placeholder="请输入用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </el-input>
          </Form-item>
          <Form-item prop="password">
            <el-input type="password" v-model="formInline.password" placeholder="请输入密码">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </el-input>
          </Form-item>
          <Form-item prop="password">
            <el-input type="password" v-model="formInline.repassword" placeholder="请再次输入密码">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </el-input>
          </Form-item>
          <Alert type="error" v-show="errorMessage.show">{{errorMessage.message}}</Alert>
          <div @click="showLogin()" v-show="registerSuccess">
            <Alert type="success">注册成功，点我去登录</Alert>
          </div>
          <Form-item>
            <Button type="primary" @click="register()">注册</Button>
          </Form-item>
        </el-form>
      </div>
    </Card>

    <Card v-show="userState==2">
      <div class="logout-wrap">
        <p class="tittle">用户信息</p>
        <p>{{this.loginUser.username}}<span class="toback" v-show="this.loginUser.isAdmin"
                                            @click="goback()">进入后台页面</span></p>
        <p class="welcom">你好，欢迎光临我的博客</p>
        <Button type="primary" @click="logout()">退出</Button>
      </div>
    </Card>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {Form, FormItem, Input, Icon, Alert, Card} from 'iview';
  import Api from '@/api/api';
  import router from '@/router/index';
  export default {

    components: {
      'el-form': Form,
      'Form-item': FormItem,
      'el-input': Input,
      Icon: Icon,
      Alert: Alert,
      Card: Card
    },
    data () {
      return {
        formInline: {
          user: '',
          password: '',
          repassword: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        userState: 0,//0登录，1注册，2已登录
        errorMessage: {show: false, message: ''},
        registerSuccess: false,
        loginUser: ''
      }
    },
    methods: {
      goback(){
        router.push('../back')
      },
      login(){
        Api.login({
          username: this.formInline.user,
          password: this.formInline.password
        }).then((data) => {
          if (data.data.code == 0) {
            this.errorMessage.show = false;
            this.loginUser = data.data.userInfo;
            sessionStorage.userInfo = JSON.stringify(this.loginUser);
            sessionStorage.token = data.data.token;
            window.location.reload();
          } else {
            this.errorMessage.show = true;
            this.errorMessage.message = data.data.message;
          }
        })
      },

    /*  logout(){
        delete sessionStorage.userInfo;
        this.userState = 0;
      },
      showRegister(){
        this.registerSuccess = false;
        this.userState = 1;
      },
      showLogin(){
        this.userState = 0;
      },
      register(){
        Api.register({
          username: this.formInline.user,
          password: this.formInline.password,
          repassword: this.formInline.repassword
        }).then((data) => {
          if (data.data.code == 0) {
            this.errorMessage.show = false;
            this.registerSuccess = true;
          } else {
            this.errorMessage.show = true;
            this.errorMessage.message = data.data.message
          }
        })
      }*/
    },

    created(){
      if (sessionStorage.userInfo) {
        try {
          this.userState = 2;
          this.loginUser = JSON.parse(sessionStorage.userInfo);
        } catch (e) {
        }
      }
    }

  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .login-module {
    width: 300px;
    .tittle {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .login-wrap {
      Button {
        width: 100%;

      }
    }
    .logout-wrap {
      .tittle {
        font-size: 20px;
      }
      Button {
        width: 100%;
        height: 36px;
        margin-top: 20px;
      }
      p {
        margin-top: 10px
      }
      .welcom {
        color: #39f;
      }
      .toback {
        color: #39f;
        margin-left: 6px;
        cursor: pointer;
      }
    }

  }

</style>
