<template>
  <div class="box">
    <!-- Slides -->
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(img , index) in imgArr" :key="index">
          <img :src="img.url">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- 导航 -->
    <ul class="nav">
      <li 
        v-for="(item , index) in navArr" 
        :key="index" 
        :class="{ active : index === realIndex }"
        @click="change(index)">
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script>
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'
import Swiper from "swiper"

export default {
  name: 'carousel',
  data() {
    return {
      realIndex : 0 , 
      navArr : ['新增疑似/新增确诊' , '现存确诊/现存疑似' , '死亡/治愈' , '病死率' , '治愈率'] , 
      imgArr : [
        {
          url : 'https://img1.dxycdn.com/2020/0220/014/3397684583507458039-135.png'
        } , 
        {
          url : 'https://img1.dxycdn.com/2020/0220/697/3397684611424536901-135.png'
        } , 
        {
          url : 'https://img1.dxycdn.com/2020/0220/861/3397684624309439853-135.png'
        } , 
        {
          url : 'https://img1.dxycdn.com/2020/0220/168/3397686703073768694-135.png'
        } , 
        {
          url : 'https://img1.dxycdn.com/2020/0220/709/3397686724548816431-135.png'
        }
      ]
    }
  },
  mounted() {
    this.getSwiper()
  },
  methods: {
    getSwiper() {
      let vueThis = this
      new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        autoplay: { //自动开始
          delay: 2500, //时间间隔
          disableOnInteraction: false, //*手动操作轮播图后不会暂停*
        },
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          // clickable: true, // 分页器可以点击
        } , 
        on : {
          // 获取当前索引
          slideChangeTransitionStart() {
            vueThis.realIndex = this.realIndex
          }
        }
      })
    } , 
    change(index) {
      // 高亮
      this.realIndex = index
      // 指定切换
      this.$refs.mySwiper.swiper.slideTo(index + 1 , 500 , false)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  background: white;
  margin-top: 0.2rem;
  border-radius: 0.2rem 0.2rem 0 0;
  .swiper-container {
    .swiper-slide {
      img {
        width: 100%;
        border-radius: 0.2rem 0.2rem 0 0;
      }
    }
  }
  .nav {
    display: flex;
    li {
      background: #eee;
      font-size: 0.24rem;
      flex:1;
      margin: 0.1rem;
      padding: 0.1rem;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: .1rem;
    }
    .active {
      background-color: #005eff39;
      color: #005eff;
      border: 1px solid #8aafef;
    }
  }
}
</style>