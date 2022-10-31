<template>
  <div class="footer">
    <div class="links">
      <a v-for="(item, index) in linkList" :key="index" target="_blank" :href="item.link ? item.link : 'javascript: void(0)'">
        <y-icon v-if="item.icon" :type="item.icon"></y-icon>{{ item.name }}
      </a>
    </div>
    <div class="copyright">
      Copyright<y-icon type="copyright"></y-icon>{{ copyright }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['copyright', 'linkList']
}
</script>

<style lang="scss" scoped>
  .footer{
    padding: 48px 16px 24px;
    /*margin: 48px 0 24px;*/
    text-align: center;
    .copyright{
      color: $--color-grey2;
      font-size: 14px;
      i {
          margin: 0 4px;
      }
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: $--color-grey2;
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
