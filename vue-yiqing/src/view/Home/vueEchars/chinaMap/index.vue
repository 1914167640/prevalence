<template>
  <div>
    <div class="title">国内疫情地图</div>
		<van-tabs v-model="active" @click="onClick" animated>

			<van-tab title="现存确诊">
				<div id="nowMain" style="width: 7.5rem;height:7rem;"></div>
			</van-tab>
			<van-tab title="累计确诊">
				<div id="main" style="width: 7.5rem;height:7rem;"></div>
			</van-tab>
		</van-tabs>	
  </div>
</template>

<script>

export default {
 name : 'chinaMap' ,
 data() {
	return {
		retdata : [] , //累计确诊
		nowRetdata : [] , 
		active : 0
	}
 },
 mounted() {
	this.getDate()	
	
 } , 
 methods: {
	getDate() {
		this.$API.reqChinaEpidemic().then( result => {
			// 累计确诊
			this.retdata = result.data.retdata.map( item  => {
				return {
					name: item.xArea , //名字
					value: item.confirm //累计确诊
				}
			})
			// 现存确诊
			this.nowRetdata = result.data.retdata.map( item  => {
				return {
					name: item.xArea , //名字
					value: item.curConfirm //累计确诊
				}
			})
			this.$nextTick(() => {
				this.$myecharts.chinaMap('nowMain' ,  this.nowRetdata) //累计确诊
			})
		})
	} , 
	// 点击高亮才会渲染dom
	onClick(name, title) {
		if(title) {
			this.$nextTick(() => { //异步页面加载完成时再渲染
				this.$myecharts.chinaMap('main' , this.retdata) //现存确诊	
			})				
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
  }

</style>