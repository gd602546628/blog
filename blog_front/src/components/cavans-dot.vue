<template>
  <canvas ref="dot"></canvas>
</template>

<script>
  import {dot} from '../class/cavans'
  export default {
    mounted(){
      dot(this.$refs.dot)
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'></style>
