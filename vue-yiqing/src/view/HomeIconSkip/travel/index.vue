<template>
  <div>
    <!-- 标题 -->
    <!-- <div class="title">疫情期间出行防疫政策</div> -->
    <img src="@/assets/images/zhengce.png" width="100%">
    <!-- 出行城市输入框 -->
    <van-field
      v-model="toCity"
      is-link
      readonly
      label="出发城市"
      placeholder="请选择所在地区"
      @click="show = true"
    />
    <!-- 弹出 出行城市列表 -->
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择出发城市"  
        @close="show = false"
        @finish="toFinish"
        :options="options"
        :field-names="fieldNames"
      />
    </van-popup>
    <!-- 到达城市输入框 -->
    <van-field
      v-model="goCity"
      is-link
      readonly
      label="到达城市"
      placeholder="请选择所在地区"
      @click="show2 = true"
    />
    <!-- 弹出到达城市列表 -->
    <van-popup v-model="show2" round position="bottom">
      <van-cascader
        v-model="cascaderValue2"
        title="请选择到达城市"
        @close="show2 = false"
        @finish="goFinish"
        :options="options"
        :field-names="fieldNames"
      />
    </van-popup>
    <!-- 查询 -->
    <div class="search">
      <van-button type="primary" size="large" @click="springTravel" :loading="isloading">查询疫情防疫</van-button>
    </div>
    <!-- 空白 -->
    <van-empty image="search" description="疫情防控人人有责" v-if="!from_info.city_name"/> 
     <!--出行政策  -->
    <van-cell-group inset v-if="from_info.city_name">
      <van-cell :title="toCity" :label="from_info.low_in_desc" icon="location-o"/>
      <van-cell :title="goCity" :label="to_info.low_in_desc" icon="location-o"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name : 'travel' , 
  data() {
    return {
      // 出行城市
      show : false , //控制出发城市的显示与隐藏
      show2: false , //控制到达城市的显示与隐藏
      isloading:false , //控制按钮加载状态
      toCity: "" , //收集出发城市的选择框数据
      goCity: "" , //收集到达城市的选择框数据
      cascaderValue: '' , //收集出发城市的id  
      cascaderValue2 : '' ,  //收集到达城市的id
      from_info : {} , 
      to_info : {} , 
      fieldNames : {
        text: 'province',
        value: 'province_id',
        children: 'citys',
      } , 
      options : [ //出行城市列表
        // {
        //   province: '浙江省',
        //   province_id : '330000',
        //   citys: [{ province: '杭州市', province_id: '330100' }],
        // },
        // {
        //   province: '江苏省',
        //   province_id : '320000',
        //   citys: [{ province: '南京市', province_id: '320100' }],
        // }
      ] 
    }
  } , 
  mounted() {
    this.getDate()
  } ,
  methods: {    
    toFinish({ value, selectedOptions, tabIndex }) { // 全部选项选择完毕时
      this.show = false //隐藏弹出框
      this.toCity = selectedOptions.map((option) => option.province).join('/') //把弹出框的数据收集到双向绑定的值
    } ,
    goFinish({ selectedOptions }) { // 全部选项选择完毕时
      this.show2 = false //隐藏弹出框
      this.goCity = selectedOptions.map((option) => option.province).join('/')
    } , 
    async getDate() { //整理并更新数据
      let result = await this.$API.reqCityList()
      if(result.code === 200) {
        const arr = result.data.result.map( item => {
          return {
            province: item.province ,
            province_id : item.province_id 
          }
        })
        const citys = result.data.result.map( item  => {
          return item.citys.map( item2 => {
            return { 
              province: item2.city , 
              province_id: item2.city_id 
            }
          })
        })  
        // 把整理好的citys放进arr的每一个对象
        arr.forEach( (item , index ) => { 
          Object.defineProperty(item , 'citys' , {
            get() {
              return citys[index]
            }
          })
        })
        this.options = arr
      }
    } , 
    async springTravel() { //查询防疫政策  
     
      let { cascaderValue , cascaderValue2 } = this

      if(!cascaderValue || !cascaderValue2) { //如果没有选择城市名
        this.$toast("请选择你的城市")
        return
      }

      let result = await this.$API.getSpringTravel( cascaderValue , cascaderValue2) //获取政策信息
      if(result.reason === 'success') {
        this.isloading = true
        this.from_info = result.result.from_info
        this.to_info = result.result.to_info
      } else {
        this.$toast(result.reason)
      }
      setTimeout(() => {
        this.isloading = false
      },300)
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    padding: 0.2rem;
    color: #000000;
  }
  .search {
    margin: 0.2rem;
  }
  .van-cell__label {
    text-align: justify;
  }
</style>