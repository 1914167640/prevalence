<template>
  <div class="cov">
    <!-- 标题 -->
    <div class="title">截至{{ time }}全国数据统计</div>
    <!-- 数据统计列表 -->
    <ul class="list">
      <!-- 现存确诊 -->
      <li class="item">
        <span>较昨日<span>{{ covInfo.currentConfirmedIncr | addOrMinus }}</span></span>
        <span>{{ covInfo.currentConfirmedCount | comma}}</span>
        <span>现存确诊</span>
      </li>
      <!-- 境外输入 -->
      <li class="item">
        <span>较昨日<span>{{ covInfo.suspectedIncr | addOrMinus }}</span></span>
        <span>{{ covInfo.suspectedCount | comma}}</span>
        <span>境外输入</span>
      </li>
      <!-- 现存无症状 -->
      <li class="item">
        <span>较昨日<span>{{ covInfo.seriousIncr | addOrMinus }}</span></span>
        <span>{{ covInfo.seriousCount | comma}}</span>
        <span>现存无症状</span>
      </li>
      <!-- 累计确诊 -->
      <li class="item">
        <span>较昨日<span>{{ covInfo.confirmedIncr | addOrMinus }}</span></span>
        <span>{{ covInfo.confirmedCount | comma}}</span>
        <span>累计确诊</span>
      </li>
      <!-- 累计死亡 -->
      <li class="item">
        <span>较昨日<span>{{ covInfo.deadIncr | addOrMinus }}</span></span>
        <span>{{ covInfo.deadCount | comma}}</span>
        <span>累计死亡</span>
      </li>
      <!-- 累计治愈 -->
      <li class="item">
        <span>较昨日<span>{{ covInfo.curedIncr | addOrMinus }}</span></span>
        <span>{{ covInfo.curedCount | comma}}</span>
        <span>累计治愈</span>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name : 'covInfo' , 
  data() {
    return {
      // 国内数据统计
      covInfo : {}
    }
  } ,
  computed : {
    time() { //返回时间
      return moment( this.covInfo.modifyTime ).format('YYYY/MM/DD HH:mm:ss')
    } 
  } , 
  filters : {
    addOrMinus(val) { //如果较昨日确诊的人数是正数 , 就添加一个+
      return val > 0 ? `+${val}` : val
    } , 
    comma(val) { //每隔三位数添加一个逗号
      let str = String(val)
      let remainder = str.length % 3 //获取他们的余数
      let remainderStr = remainder === 0 ? '' : `${str.slice(0 , remainder)},` //获取他们剩余的字符
      let str2 = str.slice(remainder , str.length) //要遍历的字符
      let newStr = ''
      let num = 0

      str2.split('').forEach( ( item , index ) => {
        num = index + 1
        if( num % 3 === 0 ) {
          newStr += `${str2.slice(num - 3 , num)},`
        }       
      })

      let mergeStr = remainderStr + newStr//合并的字符串
      return mergeStr.substr(0 , mergeStr.length - 1)

      // 方法二 : toLocaleString
    }
  } ,
  methods: {
    getDate(data) {
      this.covInfo = data
    } 
  }
}
</script>

<style lang="less" scoped>
  .cov {
    margin-top: 0.2rem;
    padding: 0.3rem;
    background: white;
    border-radius: 0.2rem 0.2rem 0 0;
    .title {
      color: #666666;
      margin-bottom: 0.2rem;
    }
    .list {
      // width: 6.9032rem;
      flex-flow: row wrap;
      display: flex;
      padding-top: 0.2rem;
      border-radius: 0.1rem;
      box-shadow: 0 0 3px 2px rgb(194 192 192 / 20%);
      .item {
        width: 33.33333%;
        display: flex;
        flex-flow: column;
        text-align: center;
        // border-right: 0.001rem solid #eee;
        span:first-child {
          color: #777;
          font-size: 0.06rem;
          font-weight: bold;
          span {
            font-weight: normal;
          }
        } 
        span:nth-child(2) {
          font-size: 0.36rem;
          font-weight: bold;
        }
        span:last-child {
          color: #333333;
          font-size: 0.07rem;
          font-weight: bold;
          margin-bottom: 0.24rem;
        } 
      }
      .item:first-child span span  , .item:first-child span:nth-child(2)
      {
        color: red;
      }
      .item:nth-child(2) span span , .item:nth-child(2) span:nth-child(2) 
      {
        color: green;
      }
      .item:nth-child(3) span span , .item:nth-child(3) span:nth-child(2) 
      {
        color: palevioletred;
      }
      .item:nth-child(4) span span , .item:nth-child(4) span:nth-child(2) 
      {
        color: orange;
      }
      .item:nth-child(5) span span , .item:nth-child(5) span:nth-child(2) 
      {
        color: skyblue;
      }
      .item:last-child span span , .item:last-child span:nth-child(2) 
      {
        color: rgb(172, 172, 5);
      }
    }
  }
</style>