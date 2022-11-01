<template>
  <div class="sidebar">
    <Menu :menu="menu" v-on="$listeners"></Menu>
  </div>
</template>

<script>
import Menu from '../Menu'
import { asyncRoutes } from '@/router'
export default {
  name: 'Sidebar',
  components: {
    Menu
  },
  props: {

  },
  data() {
    return {
      menu: []
    }
  },
  watch: {
    '$route': {
      handler() {
        this.menu = asyncRoutes.find(route => route.path === '/').children || []
        console.log('menu', this.menu)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 208px;
  background-color: #000;
}
</style>
