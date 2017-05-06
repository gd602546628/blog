<template>
  <Card class="artical" v-if="currentArtical" :class="{star:theme==1,dot:theme==2}">
    <div>
      <h1 class="tittle">{{currentArtical.title}}</h1>
      <div class="top">
        <div v-if="currentArtical.catagory">分类：<i>{{currentArtical.catagory.name}}</i></div>
        <div>添加时间：<i>{{dataFrom(currentArtical.addTime)}}</i></div>
        <div>阅读量：<i>{{currentArtical.views}}</i></div>
      </div>
      <div class="discription" v-show="currentArtical.discription">
        <p class="label">简介</p>
        <div>{{currentArtical.discription}}</div>
      </div>
      <div class="content">
        <p class="label">正文</p>
        <div v-html="currentArtical.content" class="artical-content"></div>
      </div>
    </div>
  </Card>
</template>

<script>
  import  Api from '../api/api'
  export default  {
    data(){
      return {
        currentArtical: {},
        theme: localStorage.theme || 1
      }
    },
    methods: {
      dataFrom(a){
        return new Date(a).toLocaleString()
      }
    },
    created (){
      Api.getArtical({id: this.$route.query.id}).then((data) => {
        this.currentArtical = data.data.artical
      })

      Api.articalViewsAdd({id: this.$route.query.id}).then((data) => {

      })

    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .artical {
    position: relative;
    margin-bottom: 30px;
    &.star {
      background: rgba(0, 0, 0, 0.3);
      border-color: black;
      color:#ccc;
      &:hover{
        border-color: black;
      }
    }
    .tittle {
      text-align: center;
      font-size: 40px;
    }
    .top {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      div {
        margin-left: 20px;
        i {
          color: #39f;
        }
      }
    }
    .discription {
      margin-top: 10px;
      .label {
        font-size: 20px;
        color: #39f;
      }
      div {
        font-size: 20px;
        margin-top: 10px;
      }
    }

    .content {
      margin-top: 10px;
      .label {
        font-size: 20px;
        color: #39f;
      }
      .artical-content {
        margin-top: 10px
      }
    }

  }
</style>
