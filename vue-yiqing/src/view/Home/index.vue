<template>
  <div>
    <!-- 疫情热点 -->
    <HotInfo ref="hotInfo"/>
    <!-- 全国数据统计 -->
    <covInfo ref="covInfo"/>
    <!-- 轮播图 -->
    <carousel/>
    <!-- 国内省疫情 -->
    <covCity/>
    <!-- 世界地图和中国地图 -->
    <vueEchars/>
  </div>
</template>

<script>
import HotInfo from './HotInfo'
import covInfo from './covInfo'
import vueEchars from './vueEchars'
import carousel from './carousel'
import covCity from './covCity'
export default {
  name : 'Home' ,
  components : {
    HotInfo , 
    covInfo ,
    vueEchars , 
    carousel , 
    covCity
  } , 
  mounted() {
    this.$API.reqNewList().then( result => {
      let news = result.data[0].news.slice(0 , 10) //截取前十条数据
      let desc = result.data[0].desc
      this.$refs.hotInfo.getDate(news)// 向子组件hotInfo传递数据 , 传递的数据是疫情热点的信息
      this.$refs.covInfo.getDate(desc)// 向子组件covInfo传递数据 , 传递的是国内疫情数据的统计
    })
  } , 
  beforeDestroy() {
    console.log(111)
  }
}
</script>

<style lang="less" scoped>
  div {
    background-color: #f5f5f5;
  }
</style>