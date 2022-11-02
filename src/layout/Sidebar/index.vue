<template>
  <div class="sidebar">
    <Menu :menu="menu" v-on="$listeners"></Menu>
  </div>
</template>

<script>
import Menu from '../Menu'
import { asyncRoutes } from '@/router'
const rootPath = '/'
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
  created() {
    const menu = asyncRoutes.find(route => route.path === rootPath).children || []

    menu.forEach(item => {
      if (!item.path.startsWith('/')) {
        item.path = `/${item.path}`
      }
      this.genRoutePath(item)
    })

    this.menu = menu
  },
  methods: {
    genRoutePath(item) {
      if (item.children) {
        item.children.forEach(child => {
          child.path = `${item.path}/${child.path}`
          this.genRoutePath(child)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 256px;
  background-color: #001529;
}
</style>
