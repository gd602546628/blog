<template>
  <canvas ref="dot" class="cavans"></canvas>
</template>

<script>
  import {dot} from '../class/cavans'
  export default {
    mounted(){
      dot(this.$refs.dot)
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
/*  @media screen and(max-width: 800px) {
    .cavans {
      display: none;
    }
  }*/
</style>
