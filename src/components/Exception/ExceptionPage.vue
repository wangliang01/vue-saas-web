<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[type].img">
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <el-button type="primary" @click="backHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Config from './typeConfig'

export default {
  name: 'ExceptionPage',
  props: {
    type: {
      type: String,
      required: true /* 403, 404, 500 */
    },
    homeRoute: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      config: Config
    }
  },
  methods: {
    backHome() {
      if (this.homeRoute) {
        this.$router.push(this.homeRoute)
      }
      this.$emit('backHome', this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .exception-page{
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $--color-white;
    .img{
      padding-right: 52px;
      zoom: 1;
      img{
        max-width: 430px;
      }
    }
    .content{
      h1{
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc{
        color: $--color-grey2;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }

</style>
