<template>
  <div class="home">
    首页
    <!-- <div v-for="(item, key) in formData" :key="key">{{ item.title }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  props: {

  },
  data() {
    return {
      formData: [
        {
          id: 0,
          title: '天下',
          render: () => {}
        },
        {
          id: 1,
          title: '问题',
          render: () => {

          }
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      const name = this.formData.find(im => im.id === 0)
      name.title = '水水水水水'
      this.formData.splice(1, 1)
    }, 5000)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0 16px;
}
</style>
