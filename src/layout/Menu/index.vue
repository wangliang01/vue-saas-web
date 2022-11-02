<template>
  <!-- 左侧菜单 -->
  <el-menu
    :default-active="defaultActive"
    class="nav-menu-vertical"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <template v-for="(menuItem) in menu">
      <MenuItem v-if="isVisible(menuItem)" :key="menuItem.path" :menu-item="menuItem"></MenuItem>
    </template>
  </el-menu>
</template>

<script>
import menuStyle from '@/styles/menu.scss'
import MenuItem from './MenuItem.vue'

const toRoutesMap = (routes) => {
  const map = {}
  routes.forEach(route => {
    map[route.fullPath] = route
    if (route.children && route.children.length > 0) {
      const childrenMap = toRoutesMap(route.children)
      Object.assign(map, childrenMap)
    }
  })
  return map
}
export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  props: {
    activeMainMenu: {
      type: String,
      default: ''
    },
    menu: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    isHorizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuStyle,
      show: true
    }
  },
  computed: {
    defaultActive() {
      return this.$route.fullPath
    },
    menuTheme() {
      return this.theme === 'light' ? this.theme : 'dark'
    },
    menuMap() {
      const map = toRoutesMap(this.menu)
      console.log('map', map)
      return map
    },
    leftMenu() {
      if (this.isHorizontal) {
        console.log('isHorizontal', this.isHorizontal)
        const menu = this.menu.filter(item => item.path === this.activeMainMenu)
        return menu[0] && menu[0].children ? menu[0].children : menu
      }

      return this.menu
    }
  },
  mounted() {
    const map = toRoutesMap(this.menu)
    console.log('map', map)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      this.defaultActive = keyPath.reduce((prevPath, curPath) => {
        prevPath += '/' + curPath
        return prevPath
      }, '')
    },
    isVisible(item) {
      return (item.meta && !item.meta.hidden) || !item.hidden
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../../styles/menu.scss';
</style>
