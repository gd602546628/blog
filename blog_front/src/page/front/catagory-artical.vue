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

<script type="es6">
  import Api from '@/api/api'
  import articalList from '@/components/artical-list.vue'
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
        Api.getArticalByCatagory({
          page: page,
          limit: this.limit,
          catagoryId:this.$route.query.id
        }).then((data) => {
          this.articalList = data.data.articals;
          this.total = data.data.count;
        })
      },

      readArtical(index){
        this.currentArtical = this.articalList[index];
        //this.$router.replace('artical/'+ this.currentArtical._id)
        this.$router.push({path: 'artical', query: {id: this.currentArtical._id}})
      },

    },

    created(){
      Api.getArticalByCatagory({
        page: 1,
        limit: this.limit,
        catagoryId:this.$route.query.id
      }).then((data) => {
        this.articalList = data.data.articals;
        this.total = data.data.count;
      })
    },

    watch:{
        $route(){
          Api.getArticalByCatagory({
            page: 1,
            limit: this.limit,
            catagoryId:this.$route.query.id
          }).then((data) => {
            this.articalList = data.data.articals;
            this.total = data.data.count;
          })
        }
    }


  }

</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .home {
    .artical-card {
      margin-bottom: 50px;
      color: #657180;

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

    .catagory-page{
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }
  }


</style>
