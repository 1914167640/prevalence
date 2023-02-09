<template>
  <div class="box">
    <!-- logo -->
    <img src="@/assets/images/logo.png" class="logo">
    <router-link to="/selectCity">{{ cityName || '选择城市' }}=</router-link>

    <div class="nav">
      <div class="item" :class="{active : navFlag}" @click="go(0)">国内疫情</div>
      <div class="item" :class="{active : !navFlag}" @click="go(1)">海外疫情</div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'viewNav' , 
  data() {
    return {
      navFlag : true , //控制导航的颜色切换  
      cityName : sessionStorage.getItem('cityName')
    }
  } , 
  methods: {
    go(num) {
      // 如果是0 , 则为国内 , 否则是国外 
      if(num) {
        this.navFlag = false
        this.$router.push({ path : '/foreign' })//去海外
      } else {
        this.navFlag = true
        this.$router.push({ path : '/home' })//去国内
      }
    }
  } 
}
</script>

<style lang="less" scoped>

@color:#fff;
.box {
  background: @color;
  position: relative;
  .logo {
    width: 100%;
  }
  a {
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    color: @color;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
  }
  .nav {
    display: flex;
    line-height: 0.4rem;
    position: relative;
    background: @color;
    border-radius: 0.2rem ;
    margin-top: -0.2rem;
    .item {
      flex: 1;
      text-align: center;
      padding: 0.2rem;
      border-radius: 0 0.2rem 0 0.2rem;
      color: #000000;
      font-size: 0.34rem;
    }
    .active {
      color: #005eff;
      background-color: #005eff39;
      border-radius: 0 0.2rem 0 0.2rem;
    }
  }
}
</style>