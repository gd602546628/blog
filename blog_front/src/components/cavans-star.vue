<template>
  <canvas ref="space"></canvas>
</template>

<script>
  import {star} from '../class/cavans'
  export default {
      mounted(){
          star(this.$refs.space)
      }
  }
</script>

<style lang='scss' rel='stylesheet/scss'></style>
