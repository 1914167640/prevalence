<template>
  <div>
    <chinaMap/>
    <worldMap/>
  </div>
</template>

<script>
import chinaMap from './chinaMap' 
import worldMap from './worldMap'
export default {
  name : 'vueEchars' , 
  components : {
    chinaMap , 
    worldMap
  }
}
</script>

<style lang="less" scoped>

</style>