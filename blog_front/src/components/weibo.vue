<template>
  <Card class="catagory-card" :class="{star:theme==1}">
    <iframe width="100%" height="400" class="share_self" frameborder="0" scrolling="no"
            src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=400&fansRow=1&ptype=1&speed=0&skin=5&isTitle=1&noborder=1&isWeibo=1&isFans=0&uid=2607676964&verifier=fe5f84f0&dpc=1"></iframe>
  </Card>
</template>

<script>
  import Api from '../api/api'
  export default{
    data(){
      return {
        catagoryList: [],
      }
    },

    computed: {
      theme(){
        return this.$store.state.theme
      }
    },
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .catagory-card {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &:hover{
      transform: translateY(-5px);
      border-color: #ccc !important;
    }
    &.star{
      background: rgba(0,0,0,0.3) !important;
      color: #ccc;
      border-color: black;
    }
  }
</style>
