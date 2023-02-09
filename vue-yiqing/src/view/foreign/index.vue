<template>
  <div> 
    <!-- 统计截止 -->
    <div class="time">统计截止:{{ WomWorld.lastUpdateTime}}</div>
    <!-- 人数统计 -->
    <ul class="list">
      <!-- 现有确诊 -->
      <li class="item">
        <p>较昨日<span>{{ WomWorld.nowConfirmAdd | num}}</span></p>
        <p>{{ WomWorld.nowConfirm }}万</p>
        <p>现有确诊</p>
      </li>
      <!-- 累计治愈 -->
      <li class="item">
        <p>较昨日<span>{{ WomWorld.healAdd | num}}</span></p>
        <p>{{ WomWorld.heal }}万</p>
        <p>累计治愈</p>
      </li>
      <!-- 累计死亡 -->
      <li class="item">
        <p>较昨日<span>{{ WomWorld.deadAdd | num}}</span></p>
        <p>{{ WomWorld.dead }}万</p>
        <p>累计死亡</p>
      </li>
    </ul>
    <div class="title">
      <div>海外疫情</div>
    </div>
    <div class="wrapper">
      <div class="van-sticky">
        <!-- 粘性布局 -->
        <van-sticky>
          <van-row type="flex">
            <van-col span="4">地区</van-col>
            <van-col span="5">新增确诊</van-col>
            <van-col span="6">累计确诊</van-col>
            <van-col span="6">治愈</van-col>
            <van-col span="3">死亡</van-col>
          </van-row>
        </van-sticky>
      </div>
      <div class="list2">
        <!-- 国外疫情数据 -->
        <van-row type="flex" align="center" v-for="(item , index) in WomAboard" :key="index">
          <!-- 国家 -->
          <van-col span="4">{{ item.name }}</van-col>
          <!-- 新增确诊 -->
          <van-col span="5">{{ item.confirmAdd }}</van-col>
          <!-- 累计确诊 -->
          <van-col span="6">{{ item.confirm }}</van-col>
          <!-- 治愈 -->
          <van-col span="6">{{ item.heal }}</van-col>
          <!-- 死亡 -->
          <van-col span="3">{{ item.dead }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'foreign' , 
  data() {
    return {
      WomWorld : {} ,  //世界数据
      WomAboard : [] //海外数据
    }
  },
  filters : {
    num(val) { //比较昨日的人数 , 如果是正数 ， 则添加+ , 否则-
     return val >= 0 ? `+${val}` : val
    }
  } , 
  mounted() {
    // 获取海外疫情数据
    this.$API.reqOverseas()
    .then( result => {
      this.WomWorld = result.data.WomWorld
      this.WomAboard = result.data.WomAboard
    })
  }  
}
</script>

<style lang="less" scoped>
  .fun(@color , @backgroundColor ) {
    color: @color;
    background-color: @backgroundColor;
  }
  .time {
    margin: 0.24rem;
    font-size: 0.2rem;
    color: #666;
  }
  .list {
    margin: 0.2rem 0.3rem;
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      margin-right: 0.02rem;
      margin-bottom: 0.2rem;
      >p:first-child , >p:last-child{
        font-size: 0.24rem;
      }

      >p:nth-child(2) {
        font-size: 0.28rem;
        font-weight: bold;
      }
    }
    .item:first-child {
      background: #fff8f8;
      >p>span , >p:nth-child(2){
        color: #e61c1d;
      }
    }
    .item:nth-child(2) {
      background: #fff4f4;
      >p>span , >p:nth-child(2){
        color: #be2121;
      }
    }
    .item:nth-child(3) {
      background: #f1f8f4;
      >p>span , >p:nth-child(2){
        color: #178b50;
      }
    }
    .item:last-child {
      background: #f3f6f8; 
      >p>span , >p:nth-child(2){
        color: #4e5a65;
      }
    }
  }
  .title {
    margin: 0.2rem;
    font-size: 0.3rem;
    font-weight: bold;
  }
  .wrapper {
    margin: 0.2rem;
    text-align: center;
    font-size: 0.24rem;
    color: #333;
    .van-sticky {   
      .van-row {
        .van-col {
          height: 0.8rem;
          line-height: 0.8rem;
        }
        .van-col:first-child {
          background-color: #eeeeee;
        }
        .van-col:nth-child(2) {
          .fun(#56a7ed , #005eff39);
        }
        .van-col:nth-child(3) {
          .fun(#e61c1d , #fff4f4);
        }
        .van-col:nth-child(4) {
          .fun(#178b50 , #f1f8f4);
        }
        .van-col:last-child {
          .fun(#4e5a65 , #f3f6f8);
        }
      }
    }
    .list2 {
      .van-row {
        min-height: 0.8rem;
        border-bottom: 1px solid #eee;
        .van-col:first-child{
          text-align: left;
          padding-left: 0.35rem;
        }
      }
    }
  }
</style>