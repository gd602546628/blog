<template>
  <Card class="artical-card"
        :class="{star:theme==1,dot:theme==2}">

    <h2 class="title color-font">{{artical.title}}</h2>
    <div class="artical-item">
      <span>分类：</span>
      <p class="color-font">{{artical.catagory&&artical.catagory.name}}</p>
    </div>

    <div class="artical-item">
      <span>简介：</span>
      <p class="color-font">{{artical.discription}}</p>
    </div>

    <div class="artical-item">
      <span>创建时间：</span>
      <p class="color-font">{{dataFrom(artical.addTime)}}</p>
    </div>
    <div class="artical-item">
      <span>阅读量：</span>
      <p class="color-font">{{artical.views}}</p>
    </div>

    <div class="button-wrap">
      <!--<router-link :to=""></router-link>-->
      <iButton type="primary" class="readArtical" @click="readArtical(artical)">查看文章</iButton>
    </div>

  </Card>
</template>

<script>
  //import {Card,Button} from 'iview'
  export default{
    components:{
    /*  'Card':Card,
      'iButton':Button*/
    },
    name: 'home',
    data () {
      return {
      }
    },
    props:['artical'],
    computed: {
      theme(){
        return this.$store.state.theme
      }
    },
    methods: {
      dataFrom(value){
        return new Date(value).toLocaleString()
      },


      readArtical(artical){
        this.$router.push({path: 'artical', query: {id: artical._id}})
      },

    },


  }

</script>

<style lang='scss' rel='stylesheet/scss'>

  .artical-card {
    margin-bottom: 50px;
    color: #657180;
    &.star{
       background: rgba(0,0,0,0.3) !important;
       color: #ccc;
      border-color: black;
      &:hover{
        border-color: #ffffff;
      }
    }
    .button-wrap {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      .readArtical {
      }
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .artical-item {
      display: flex;
      margin-bottom: 10px;
      font-size: 16px;
      span {
        width: 100px;
        text-align: left;
      }
      p {
        flex: 1;
        word-break: break-all;
      }
    }
  }

</style>
