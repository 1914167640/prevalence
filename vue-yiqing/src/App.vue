<template>
  <div id="app">
    <viewNav v-if="$route.meta.isHeader"/>
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>   
  </div>
</template>

<script>
export default {
  name: 'App' 
}
</script>

<style lang="less" scoped>

</style>
