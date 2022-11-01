<template>
  <div class="main">
    <Tags @refresh="handleRefresh"></Tags>
    <transition name="fade-transverse" mode="out-in">
      <keep-alive v-if="refresh" :include="keepAliveInclude">
        <router-view :key="$route.path" class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Tags from '../Tags/index.vue'
export default {
  name: 'AppMain',
  components: {
    Tags
  },
  props: {},
  data() {
    return {
      refresh: true,
      keepAliveInclude: []
    }
  },
  mounted() {},
  methods: {
    handleRefresh() {
      this.refresh = false
      this.$nextTick(() => (this.refresh = true))
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 0;
}
.router-view {
  flex: 1;
  overflow: auto;
}
</style>
