<template>
  <div class="catagory">
    <div class="catagory-item" v-for="(item,index) in demos" @click="getDemo(item)">
      <Card class="catagory-item-card">
        <p>{{item.demoName}}</p>
      </Card>
    </div>
  </div>
</template>

<script>
  import Api from '../api/api'
  export default {
    data(){
        return {
            demos:[]
        }
    },

    methods:{
        getDemo(item){
          this.$router.push({path: 'labDetail', query: {id: item._id}})
        }
    },
    created(){
        Api.getDemo({
            all:true
        }).then((data)=>{
            this.demos=data.data.demos;
        })
    }

  }
</script>

<style lang='scss' rel='stylesheet/scss'>
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
