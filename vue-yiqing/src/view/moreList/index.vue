<template>
  <div>
    <div class="header">
      <img src="@/assets/images/consult.png" class="backImg"/>
      <div @click="$router.go(-1)">返回防疫专区</div>
    </div> 
    <ul class="list">
      <li class="item" v-for="item in moreList" :key="item.id" @click="goDetail(item.id)">
        <span class="news">最新</span>
        <span class="text">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name : 'moreList' , 
  data() {
    return {
      moreList : []
    }
  } , 
  methods: {
    getDate() {
      this.$API.reqNewList()
      .then( result => {
        const news = result.data[0].news
        this.moreList = result.data[0].news.slice(10 , news.length)
      })
    } , 
    goDetail(id) { //点击跳转详情
      this.$router.push({
        path:`/Detail/${id}`
      })
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style lang="less" scoped>
  .header {
    position: relative;
    .backImg {
      width: 100%;
    }
    >div {
        background-color: rgba(19,15,133,.5);
        border-radius: 0.24rem;
        color: #fff;
        font-size: .24rem;
        position: absolute;
        top: .24rem;
        right: .24rem;
        padding: 0.04rem 0.24rem;
        height: .42rem;
        line-height: .42rem;
    }
  }
  .list {
    padding: 0 .32rem;
    margin-top: .4rem;
    position: relative;
    .item {
      display: flex;
      margin-bottom: 0.6rem;
      line-height: 0.4rem;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;//溢出时显示省略号
      // word-break: break-all;
      -webkit-line-clamp: 1; //限制指定的行数
      -webkit-box-orient: vertical;//子元素排列 vertical（竖排）orhorizontal（横排）
      &::before {
        content: "";
        width: 91%;
        height: .32rem;
        margin-top: 0.28rem;
        border-bottom: 1px solid #eee;
        position: absolute;
      }
      .news {
        background-color: #ff5555;
        color: #fff;
        padding: 0.02rem 0.04rem;
        border-radius: 0.08rem;
        font-size: 0.26rem;
        margin-right: .08rem;     
      }
    }
  }
 
</style>
