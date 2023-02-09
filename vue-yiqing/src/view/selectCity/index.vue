<template>
  <div class="selectCity">
    <van-index-bar :index-list="letterArr">
			<template v-for="( city , index ) in cityInfo" >
				<van-index-anchor :index="index" :key="index"/>
				<van-cell :title="item.name" v-for="item in city" :key="item.id" @click="goHome(item.name)"/>
			</template>
    </van-index-bar>
  </div>
</template>

<script>
export default {
  name : 'selectCity' , 
	data() {
		return {
			cityInfo : {} , 
			letterArr : []
		}
	},
  mounted() {
		this.$API.reqSelectCity()
		.then( result => {
			this.cityInfo = result.data.cityInfo
			this.letterArr = Object.keys(result.data.cityInfo)
		})
		.catch(err => console.log(err))
  } , 
	methods: {
		goHome(name) {
			// 回话存储
			sessionStorage.setItem('cityName' , name)
			this.$router.push('/' )
		}	
	}
}
</script>

<style lang="less" scoped>
  .selectCity {
    background: #f5f5f5;
  }
</style>