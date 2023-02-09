<template>
  <div>
    <!-- 标题 -->
    <div class="title">{{ detail.title }}</div>
    <div class="author">
      <!-- logo -->
      <div><img :src="detail.url" class="icon"></div>
      <div class="name">
        <!-- 发布者 -->
        <span>{{ detail.author }}</span>
        <!-- 发布时间 -->
        <span>{{ detail.time }}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="text" v-for="( item , index ) in detail.desc" :key="index">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dateil',
  props : ['id'] ,
  data() {
    return {
      detail : {}
    }
  },
  methods: {
    async getData() {
      let result = await this.$API.reqGetList2( { id : this.id })
      if( result.code === 200 ) {
        this.detail = result.detailList[0]
      }
    }
  } ,
  mounted() {    
    this.getData()
  }
}
</script>

<style lang="less" scoped>
@color : #222222;
div {
  .title {
    padding: 0 0.25rem;
    font-weight: 600;
    font-size: .44rem;
    color: @color;
    word-break: break-all;
    margin-top: 0.4rem;
  }

  .author {
    padding: 0 0.25rem;
    display: flex;
    margin-top: 0.4rem;
    .icon {
      width: 0.7rem;
      border-radius: 50%;
      margin-right: 0.15rem;
    }
    .name {
      display: flex;
      flex-flow: column;
      >span:first-child {
        color: @color;
        font-size: 0.28rem;
        font-weight: 700;
      }

      >span:last-child {
        color: #a6a6a6;
        font-size: 0.24rem;
      }
    }
  }
  .journalismUrl {
    padding: 0 0.25rem;
    margin-top: 0.44rem;
  }
  .text {
    padding: 0 0.25rem;
    margin-top: 0.44rem;
    line-height: 0.6rem;
    font-size: 0.36rem;
    text-align: justify;
    color: #333333;
    letter-spacing: 0.004rem;
  }
}
</style>