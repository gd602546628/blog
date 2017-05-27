<template>
  <div class="home">
    <artical-list v-for="(item,index) in articalList" :artical="item" :key="index"></artical-list>

    <Page
      :total="total"
      :page-size="limit"
      v-on:on-change="getArtical"
      class="catagory-page"
    ></Page>
  </div>

</template>

<script>
  import Api from '@/api/api';
  import articalList from '@/components/artical-list.vue';
  export default{
    name: 'home',
    components:{
        'artical-list':articalList
    },
    data () {
      return {
        limit: 4,
        total: 0,
        articalList: [],
        currentArtical: {},
      }
    },
    methods: {
      dataFrom(value){
        return new Date(value).toLocaleString()
      },

      getArtical(page){
        Api.getArtical(
          {
              page:page,
              limit:this.limit
          }
        ).then((data)=>{
          this.articalList = data.data.articals;
        })
      },

      readArtical(index){
        this.currentArtical = this.articalList[index];
        this.$router.push({path: 'artical', query: {id: this.currentArtical._id}})
      },

    },

    created(){
      Api.getArtical({
        page: 1,
        limit: this.limit
      }).then((data) => {
        this.articalList = data.data.articals;
        this.total = data.data.count;
      })
    },

  }

</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .home {


    .catagory-page{
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }
  }


</style>
