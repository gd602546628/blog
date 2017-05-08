<template>
  <div class="catagory">
    <div class="catagory-item" v-for="(item,index) in catagoryList" @click="getArtical(item)">
      <Card class="catagory-item-card" :class="{star:theme==1}">
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
        catagoryList: [],
        theme:localStorage.theme||1
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
        &.star{
          background:rgba(0,0,0,0.3);
          color: #ffffff;
          border-color: black;
          &:hover{
            transform: translateY(-5px);
            border-color: #ffffff;
          }
        }
      }
    }
  }
</style>
