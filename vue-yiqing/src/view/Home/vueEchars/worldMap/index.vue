<template>
  <div>
    <div class="title">世界疫情地图</div>
      <div id="nowMain2" style="width: 7.5rem;height:8rem;"></div>
  </div>
</template>

<script>
export default {
  name : 'worldMap' , 
  data() {
    return {
      nowRetdata : [] , 
      active : 0
    }
  },
  mounted() {
    this.getDate()
  } , 
  methods: {
    async getDate() {
      let result = await this.$API.reqWorldEpidemic()
      if( result.code === 200 ) {
        this.nowRetdata = result.data.retdata.map( item  => {
          return {
            name: item.xArea , //名字
            value: item.curConfirm //累计确诊
          }
			  })
       this.$myecharts.worldMap('nowMain2' , this.nowRetdata) //现存确诊
      }
    } 
  }
}
</script>

<style lang="less" scoped>
  div {
    background-color: white;
    border-radius: 0.2rem 0.2rem 0 0;
    .title {
      display: flex;
      align-items: center;
      margin: 0.2rem;
      padding-top: 0.2rem;
      // border-top: 1px solid #eee;
      &::before {
        content: "";
        width: 0.1rem;
        height: 0.32rem;
        margin-top: 0.05rem;
        background-color: #4169E2;
        margin-right: 0.1rem;
      }
    } 
		#main {
			background-color: #f5f5f5;
		}
  }
</style>