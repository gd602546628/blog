<template>
  <Card :class="{star:theme==1}" class="wrap">
    <div>
      <h1 class="tittle">关于我</h1>
      <div class="introduce">HI all，我是gd</div>
      <div class="introduce">天秤座，宅男，喜欢编程，更喜欢电影和音乐</div>
      <div class="introduce">前端开发小白，就职于云南掌赢天科技有限公司</div>
      <div class="introduce">在这里分享学习体会，记录学习内容，沉淀学习思考</div>
      <div class="introduce">欢迎大家提出宝贵意见和建议</div>

      <div class="concat-wrap">
        <div class="concat">
          <span>QQ:</span>
          <p>602546628</p>
        </div>
        <div class="concat">
          <span>邮箱:</span>
          <p>602546628@qq.com</p>
        </div>
        <div class="concat">
          <span>github:</span><a href="https://github.com/gd602546628"
                                 target="_blank">https://github.com/gd602546628</a>
        </div>
        <div class="concat">
          <span>微博:</span><a target="_blank" href="http://weibo.com/u/2607676964">http://weibo.com/u/2607676964</a>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
  export default{
    computed: {
      theme(){
        return this.$store.state.theme
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .wrap {
    &.star {
      background: rgba(0, 0, 0, 0.3) !important;
      color: #ccc;
      border-color: black;
    }
    .tittle {
      margin-bottom: 20px;
    }

    .introduce {
      margin-bottom: 14px;
      font-size: 16px;
    }

    .concat-wrap {
      margin-top: 40px;
      .concat {
        font-size: 16px;
        margin-bottom: 20px;
        display: flex;
        span {
          display: inline-block;
          width: 50px;
          text-align: left;
        }
      }
    }
  }


</style>
