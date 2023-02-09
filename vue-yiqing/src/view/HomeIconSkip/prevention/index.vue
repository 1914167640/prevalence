<template>
  <div>
    <!-- 防疫物资指南 -->
    <img src="@/assets/images/wuzi.png" width="100%">
    <div class="containner">
      <van-tabs animated>
        <!-- 消毒剂 -->
        <van-tab title="消毒剂">
          <img src="@/assets/images/jiujing.png" width="100%">
        </van-tab>
        <!-- 口罩 -->
        <van-tab title="口罩">
          <img src="@/assets/images/kouzhao.png" width="100%">
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name : 'prevention'
}
</script>

<style lang="less" scoped>
  .containner {
    background: #3343ff;
    padding: 0.2rem;
    margin-top: -0.08rem;
  }
</style>