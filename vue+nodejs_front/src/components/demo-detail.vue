<template>
  <iframe :src="src" class="demo-wrap"></iframe>
</template>

<script>
  import Api from '../api/api'
  export default{
     data(){
         return {
             src:''
         }
     },

    created(){
         Api.getDemoById({
             id:this.$route.query.id
         }).then((data)=>{
             this.src=data.data.demo.entryPath;
         })
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .demo-wrap{
    width: 100%;
  }
</style>
