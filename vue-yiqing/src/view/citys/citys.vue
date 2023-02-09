<template>
  <div >
    <h2>{{ name + '--城市名称'}}</h2>
    <div id="main4" style="width: 7.5rem;height: 8.6rem;"></div>
  </div>
</template>

<script>
export default {
  name : 'citys' , 
  props : ['name'] , 
  mounted() {
    this.$API.getCityData('武汉')
    .then((result) => {
      console.log(result)
    })
    this.$myecharts.cityMap('main4' , this.name , [])
  }
}
</script>

<style lang="less" scoped>
  #main4 {
    // background-color: aqua;
    margin: 0 auto;
  }
  h2 {
    text-align: center;
  }
</style>