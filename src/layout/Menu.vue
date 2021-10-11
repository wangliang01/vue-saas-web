<template>
  <!-- 左侧菜单 -->
  <el-menu
    :default-active="defaultActive"
    class="nav-menu-vertical"
    :background-color="menuStyle.menuBg"
    :text-color="menuStyle.menuText"
    :active-text-color="menuStyle.menuActiveText"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="(menuItem) in leftMenu">
      <MenuItem v-if="!menuItem.hidden" :key="menuItem.path" :menu-item="menuItem"></MenuItem>
    </template>
  </el-menu>
</template>

<script>
import menuConfig from '@/config'
import menuStyle from '../styles/menu.scss'
import MenuItem from './MenuItem.vue'
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
    isHorizontal: {
      type: Boolean,
      default: menuConfig.menuMode === 'horizontal'
    }
  },
  data() {
    return {
      menuStyle,
      show: true
    }
  },
  computed: {
    leftMenu() {
      if (this.isHorizontal) {
        const menu = this.menu.filter(item => item.path === this.activeMainMenu)
        return menu[0] && menu[0].children ? menu[0].children : menu
      }
      return this.menu
    },
    defaultActive() {
      return this.$route.fullPath
    }
  },
  /* watch: {
    leftMenu() {
      this.defaultActive = this.$route.fullPath
      this.$forceUpdate()
    },
    '$route'() {
      console.log(this.$route.fullPath)
      this.defaultActive = this.$route.fullPath
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }, */
  mounted() {
    console.log('menu mounted', this.leftMenu)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../styles/menu.scss';
</style>
