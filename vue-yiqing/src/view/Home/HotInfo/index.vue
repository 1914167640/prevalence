<template>
  <div class="hot">
    <!--病毒信息 -->
    <div class="title">
      <img src="@/assets/images/hot.png" class="icon">
      <a class="more" @click ="goMore">查看更多</a>
    </div>
    <!-- 疫情热点 -->
    <ul class="infoList">
      <li v-for="item in hotList" :key="item.id" >
        <van-row type="flex" @click="goDetail(item.id)">
          <van-col span="3"><span class="news">最新</span></van-col>
          <van-col span="19" >{{item.title}}</van-col>
          <van-col span="2"><van-icon name="arrow" color="#aaa"/></van-col>
        </van-row>
      </li>
    </ul>
    <!-- 疫情小导航-->
    <div class="list">
      <div class="item"> 
        <router-link to="/risk">
          <img src="@/assets/images/1.png" class="icon"/> 
          <p>风险地区</p>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/HomeIconSkip">
          <img src="@/assets/images/2.png" class="icon"/>
          <p>核酸检测</p>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/prevention">
          <img src="@/assets/images/3.png" class="icon"/>
          <p>防疫物资</p>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/travel">
          <img src="@/assets/images/4.png" class="icon"/>
          <p>出行政策</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name : 'HotInfo' , 
  data() {
    return {
      hotList : [] //获取疫情信息
    }
  } ,
  methods: {
    getDate(hotList) {
      this.hotList = hotList
    } , 
    goMore() { //查看更多
      this.$router.push({ path:'/moreList' })
    } , 
    goDetail(id) { //跳转新闻详情
      this.$router.push({
        path : `/Detail/${id}` 
      })
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style lang="less" scoped>
.hot {
  background-color: white;
  .title { 
    padding: 0.2rem;
    color: #666;
    font-size: 0.3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    &::before {
      content: "";
      width: 0.1rem;
      height: 0.32rem;
      margin-top: 0.05rem;
      background-color: #4169E2;
      margin-right: 0.1rem;
      position: absolute;
    }
    padding-left: 0.1rem;
    .icon {
      width: 1.2rem;
      margin-left: .2rem;
    } 

    .more {
      color: #4169E2;
      font-size: 0.26rem;
    }
  }
  .infoList {
    margin: 0.2rem;
    border-bottom: 1px solid #eee;
    li { 
      padding-bottom: 0.1rem;
      margin-bottom: 0.2rem;
      line-height: 0.4rem;
      .van-row {
        .news {
          background-color: #ff5555;
          color: #fff;
          padding: 0.02rem 0.04rem;
          border-radius: 0.02rem;
          font-size: 0.26rem;
        }  
        .van-col--2 {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .icon {
            width: 0.44rem;
            height: 0.24rem;
          }
        } 
        .van-col--19:hover {
          color: #005eff;
          transition: 1s;
        }
      }
    }
  }
  .list {
    display: flex;
    padding-bottom: 0.2rem;
    .item {
      flex: 1;
      a {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        .icon {
          width: 0.8rem;
          height: $width;
        }
        p {
          margin-top: 0.05rem;
          color: #666;
        }
      }

    }

  }
}
</style>