<template>
  <div class="box">
    <!-- 标题 -->
    <h3>国内31省市区本土疫情速报</h3>
    <!-- 导航 -->
    <ul class="nav">
      <li>地区</li>
      <li>本土<br/>确诊</li>
      <li>本土<br/>无症状</li>
      <li>高风险<br/>地区</li>
      <li>更新时间</li>
    </ul>
    <!-- 内容 -->
    <div class="content">
      <div class="line" v-for="item , index  in subCityList" :key="item.id">
        <!-- 城市数据 -->
        <div class="cityDate" @click="change(item , index)">
          <div>
            <!-- icon图标 -->
            <van-icon name="play" color="#005eff"/>
            <!-- 市 -->
            {{ item.city }}
            <!-- 省 -->
            <span>{{ item.province }}</span>
          </div>
          <!-- 本土确诊 -->
          <div>{{ item.confirm | num }}</div>
          <!-- 本土无症状 -->
          <div>{{ item.local_wzz_add | num }}</div>
          <!-- 高风险地区 -->
          <div>{{ item.highRiskAreaNum }}</div>
          <!-- 更新时间 -->
          <div>{{ item.time | disposeTime}}<van-icon name="arrow" color="#005eff"/></div>
        </div>
        <!-- 图表 -->
        <transition appear>
          <div class="tubiao" v-if="item.flag">
            <h4>{{ item.city }}新增本土确诊趋势</h4>
            <div id="item"></div>
          </div>
        </transition>
      </div>
      <!-- 点击查看更多 -->
      <div class="more" @click="getMore" v-show="subCityList.length">
        <span>{{ moreText }}</span>
        <van-icon :name="iconName" />
      </div>
      <div class="more" v-show="!subCityList.length">暂无更多信息</div>
    </div>
  </div>
</template>
<script>

export default {
  name : 'covCity' , 
  data() {
    return {
      subCityList : [] , //截取的城市数据
      cityList : [] , //全部城市数据
      limit : 5 , //每次展示的数据 
      start : 0  , //从第几页开始添加
      addDataNum : 5  , //每一次添加多少条数据  
    }
  } , 
  methods: {
    change( city ) {  //城市图表的显示或关闭
      this.subCityList.forEach( item => {
        if( item === city ) { //如果点击的是当前item            
          if ( city.flag ) { //如果当前城市图表是显示的
            item.flag = false //隐藏图表     
          } else { 
            item.flag = true //则显示图表
          } 
        } else { //其余未点击的flag
          item.flag = false //隐藏
        }
      })
      if (city.flag) {
        this.getCityImg(city.id , city.city) //获取图标数据并渲染图表    
      }   
    } , 
    async getDate( start = 0 , limit = 5) { //更新数据
      let result = await this.$API.reqGetCovCity()
      if ( result.code === 200 )  {
        let arr = result.data.cityList.slice( start , limit ) //获取截断的数据
        arr.forEach( item => this.subCityList.push(item) )   //把截断的数据添加进数组中
        !this.cityList.length ?  this.cityList = result.data.cityList : '' //cityList为空数组时获取全部城市数据

        if ( this.subCityList[0].flag  && start === 0 && limit === 5) { //如果第一个城市的的图表显示 且 数据只有五条
          this.getCityImg( result.data.cityList[0].id ,  result.data.cityList[0].city) //更新图表数据
        }
      }
    } , 
    async getMore() { //点击获取更多
      let { subCityList , cityList , addDataNum } = this
      if( subCityList.length < cityList.length ) { // 如果截取的城市数据小于全部城市数据
        this.start += addDataNum
        this.limit += addDataNum
        this.getDate( this.start , this.limit )    
      } else { 
        this.subCityList = this.subCityList.slice(0 , 5) //直接获取前五条数据
        this.start = 0 //重置起始数
        this.limit = 5 //重置每页数据
      }
    } , 
    async getCityImg ( id , city ) { //获取城市图表
        let result = await this.$API.reqSelectProvince( { id , city } )
        if ( result.code === 200 ) {
          const arr = result.arr[0].cityList
          let xData = []
          let yData = []
          arr.forEach( item => {
            xData.push( item.data )
            yData.push( item.confirm_add )
          })
          setTimeout(() => {
            this.$myecharts.line( 'item' , xData , yData )            
          } , 100)
        }    
    }
  } , 
  computed : {
    moreText() { //获取更多 || 点击收起
      return this.subCityList.length < this.cityList.length ? '获取更多' : '点击收起'
    } , 
    iconName() { //点查看的图标
      return this.subCityList.length < this.cityList.length ? 'arrow-down' : 'arrow-up'
    }
  } ,
  filters : {
    num( val ) { //如果本土确诊人数或本土无症状人数为正数 , 就 + 
      return val > 0 ? `+${val}` : val
    } , 
    disposeTime(val) { //处理更新时间的格式
      return `今日${val.slice(11 , val.length)}`
    }
  } , 
  mounted() {
    this.getDate() //更新数据   
  }
}
</script>

<style lang="less" scoped>
@fontSize:.24rem;

  .fun( @flex , @color , @backgroundColor ) {
    flex: @flex;
    color: @color;
    background-color: @backgroundColor;
  }
  .fun2(@flex) {
    flex: @flex;
    justify-content: center;
  }
  .box {
    background-color: white;
    border-radius: .2rem .2rem 0 0;
    padding: .2rem;
    color: #333;
    .nav {
      display: flex;
      margin-top: .2rem;
      min-height: .88rem;
      >li {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 .1rem;
        text-align: center;
        background: #eee;
        margin-right: .02rem;
        font-size: @fontSize;
      }
      >li:first-child {
        flex: 7;
      }
      >li:nth-child(2) {
        .fun(3 , #56a7ed , #005eff39)
      }
      >li:nth-child(3) {
        .fun(3 , #e61c1d , #fff4f4)
      }
      >li:nth-child(4) {
        .fun(3 , #178b50 , #f1f8f4)
      }
      >li:last-child {
        .fun(6 , #4e5a65 , #f3f6f8)
      }
    }
    .content {
      .line {
        border-bottom: 1px solid #eee;
        .cityDate {
          display: flex;
          min-height: .6rem;
          >div {
            display: flex;
            font-size: @fontSize;
            // color: #333333;
            align-items: center;
            .van-icon-play:before {
                padding-right: 0.08rem;
            }
            .van-icon-arrow:before {
                padding-left: 0.08rem;
            }
          }          
          >div:first-child {
            flex: 7;
            justify-content: flex-start;
            span {
              color: rgb(155, 152, 152);
              margin-left: .08rem;
            }
          }
          >div:nth-child(2) {
            .fun2(3)
          }
          >div:nth-child(3) {
            .fun2(4)
          }
          >div:nth-child(4) {
            .fun2(4)
          }
          >div:last-child {
            .fun2(6)
          }
        } 
        .tubiao {
          border: 1px solid #eee;
          border-radius: 0.1rem;
          padding: 0.1rem;
          margin-bottom: 0.1rem;

          h4 {
            margin-bottom: 0.1rem;
            font-size: .28rem;
          }
          #item {
            width: 7rem;
            height: 3.6rem;
          }
        }
      }
    }
    .more {
      margin: .2rem;
      text-align: center;
      font-size: .28rem;
      color: #787878;
      span {
        margin-right: .08rem;     
      }
    }
  }

  .v-enter-active {
    transition:0.1s;
  } 
  .v-leave-active{
    transition:0.1s;
  }
  // 进入时的起点
  .v-enter , .v-leave-to{
    transform: translateY(-0.2rem);
  }
  进入时的终点
  .v-enter-to , .v-leave{
    transform: translateY(0);
  }
</style>