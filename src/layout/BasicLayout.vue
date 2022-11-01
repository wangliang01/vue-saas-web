<template>
  <div class="basic-layout">
    <div class="basic-layout-container">
      <!-- Header -->
      <AdminHeader></AdminHeader>
      <div class="basic-layout-content">
        <!-- 侧边栏 -->
        <Sidebar></Sidebar>
        <!-- 主内容区 -->
        <AppMain></AppMain>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Menu from './Menu'
import Tags from './Tags/index.vue'
import menuConfig from '@/config'
import menuStyle from '@/styles/menu.scss'
import HeaderAvatar from './Header/HeaderAvatar.vue'
import AdminHeader from './Header/AdminHeader.vue'
import Sidebar from './Sidebar'
import AppMain from './AppMain'
export default {
  name: 'BasicLayout',
  components: {
    AdminHeader,
    Menu,
    HeaderAvatar,
    Tags,
    Sidebar,
    AppMain
  },
  data() {
    const { menu } = menuConfig
    return {
      refresh:true,
      menu: menu,
      menuStyle,
      activeMainMenu: '/purchase',
      isHorizontal: false
    }
  },
  computed:{
   
    computedActiveMainMenu() {
      const active = this.$route.fullPath.split('/')[1] || this.activeMainMenu
      return active.includes('/') ? active : `/${active}`
    },
    keepAliveInclude() { // 只有tag存在的 才会缓存路由 如果配置了 keepAlive : false 不缓存
      const includes = this.$store.state.tags?.filter(tag => tag?.meta?.keepAlive === undefined || tag?.meta?.keepAlive).map(route => route.name ) || []
      // console.log(includes, '00000')
      return includes
    },
    key() {
      return this.$route.fullPath
    }
  },
  created() {
    this.setDefaultActiveMenu()
    // this.responsiveLayout()
  },
  methods: {
    handleRefresh() {
      this.refresh = false
      this.$nextTick(() => (this.refresh = true))
    },
    responsiveLayout() {
      window.addEventListener('resize', (e) => {
        const screenWidth = window.innerWidth
        if (screenWidth < 1200) {
          this.isHorizontal = false
        } else {
          this.isHorizontal = true
        }
      })
    },
    /* 设置激活的一级菜单 */
    setDefaultActiveMenu() {
      const match = this.$route.fullPath.match(/^\/([^\/]+)/)
      if (match) {
        this.activeMainMenu = match[0]
      }
    },
    handleSelect(index) {
      this.activeMainMenu = index
    }
  }
}
</script>
<style scoped lang="scss">
$--background-color-grey: #EFF3F6;
.basic-layout {
  height: 100vh;
}
.basic-layout-container {
  display: flex;
  flex-flow: column wrap;
  height: 100%;
    .basic-layout-content{
      flex: 1;
      display: flex;
      flex-flow: row nowrap;
      overflow: hidden;
      background-color: $--background-color-grey;
      ::v-deep .nav-menu-vertical{
        width: 256px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 0;
      }
      .router-view{
        flex: 1;
        height: calc(100% - 53px);
        overflow: auto;
        // > ::v-deep div {
        //   height: 100%;
        // }
      }
    }
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconfont{
  margin-right: 6px;
}

.fade-transverse-enter {
  opacity: 0;
  transform: translateX(200px);
}

.fade-transverse-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all .3s;
}
</style>
