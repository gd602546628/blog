<template>
  <Card class="catagory-card" :class="{star:theme==1}">
    <h3>文章分类</h3>
    <p v-for="(item,index) in catagoryList" class="name" @click="catagoryArtical(item)" >
      {{item.name}}
    </p>
    <p class="more" @click="more">更多分类......</p>
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
    methods: {
      more(){
        this.$router.push('catagory')
      },
      catagoryArtical(item){
        this.$router.push({path: 'cataArtical', query: {id: item._id}})
      }
    },
    created(){
      Api.getCatagory({
        page: 1,
        limit: 5
      }).then((data) => {
        this.catagoryList = data.data.catagorys
      })
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .catagory-card {
    display: flex;
    align-items: center;
    &:hover{
      transform: translateY(-5px);
      border-color: #ccc !important;
    }
    &.star{
      background: rgba(0,0,0,0.3) !important;
      color: #ccc;
      border-color: black;
    }
    h3 {
      margin-bottom: 20px;
    }
    .name {
      font-size: 16px;
      padding-bottom: 10px;
      cursor: pointer;
    }

    .more {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }

  }
</style>
