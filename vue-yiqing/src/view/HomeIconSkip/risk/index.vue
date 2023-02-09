<template>
  <div>
    <!-- 背景图 -->
    <div class="bg"></div>
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <h2>全国风险地区汇总</h2>
      </div>
      <div class="container">
        <div class="region" v-if="higs.length > 0">
          <!-- 高风险区人数 -->
          <div class="peopleNumber">
            <img src="@/assets/images/high.png" class="icon">
            <span>高风险区{{ higs.length }}个</span>
          </div>
          <!-- 高风险地区 -->
          <div class="list">
            <div class="item" v-for="( item , index) in higs" :key="index">
              <span>{{item}}</span>
            </div>
          </div>
        </div>
        <div class="region" v-if="mid.length > 0">
          <!-- 中风险人数 -->
          <div class="peopleNumber">
            <img src="@/assets/images/mid.png" class="icon">
            <span>中风险区{{ mid.length }}个</span>
          </div>
          <!-- 中风险区人数 -->
          <div class="list" v-for="( item , index) in mid" :key="index">
            <div class="item">
              <span>{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'risk' , 
  data() {
    return {
      higs : [] , //高风险区
      mid : [] //中风险区
    }
  },
  mounted() {
    this.$API.reqNewList().then( reuslt => {
      this.higs = reuslt.data[0].riskarea.higs
      this.mid = reuslt.data[0].riskarea.mid
    })
  }
}
</script>

<style lang="less" scoped>
.bg {
  background-image: url(@/assets/images/area.png);
  // 按比例缩放
  background-size: cover;
  height: 3.6rem;
  padding-top: 2.6rem;
}
.content {
  padding: 0.2rem;
  margin: 0 0.2rem 0.2rem 0.2rem;
  min-height: 4rem;
  border-radius: 0.2rem;
  background: #fff;
  position: relative;
  bottom: 3.59rem;
  .title {
    display: flex;
    &::before {
      content: "";
      width: 0.1rem;
      height: 0.3rem;
      margin-right: 0.1rem;
      background-color: #4169E2;
      margin-top: 0.1rem;
    }
    h2 {
      margin-bottom: 0.3rem;
      font-size: 0.34rem;
      font-weight: normal;
    }
  }
  .container {
    .region {
      .peopleNumber {
        display: flex;
        margin-bottom: 0.3rem;
        .icon {
          width: 0.4rem;
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.3rem;
        }
      }
      .list {
        .item {
          background-color: #f7f7f7;
          padding: 0.1rem;
          margin-bottom: 0.2rem;
          color: #666666;
          border-radius: 0.1rem;
          // 设置字母间距
          letter-spacing: 0.01rem;
          min-height: 0.5rem;
          display: flex;
          align-items: center;
          line-height: 0.5rem;
          font-size: 0.26rem;
        }
      }
    }
  }
}

</style>