<template>
  <div class="catagory">
    <div class="catagory-item" v-for="(item,index) in catagoryList" @click="getArtical(item)">
      <Card class="catagory-item-card">
        <p>{{item.name}}</p>
      </Card>
    </div>
  </div>
</template>

<script>
  import Api from '../api/api'
  export default{
    data(){
      return {
        catagoryList: []
      }
    },
    methods: {
      getArtical(item){
        this.$router.push({path:'cataArtical',query:{id:item._id}})
      }
    },
    created(){
      Api.getCatagory({all: true})
        .then((data) => {
          this.catagoryList = data.data.catagorys
        })
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .catagory {
    display: flex;
    flex-wrap: wrap;
    margin-bottom:30px;
    .catagory-item {
      width: 20%;
      padding: 10px;
      .catagory-item-card {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
