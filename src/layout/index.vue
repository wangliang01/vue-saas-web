<template>
  <div class="layout">
    <el-row>
      <!-- ≥1200px -->
      <el-col :xl="24" :lg="24" class="layout-container">
        <!-- 顶部一级菜单 -->
        <div class="layout-top">
          <div class="nav-menu-title">
            <h1>鲜生活供应链系统</h1>
          </div>
          <div v-if="isHorizontal" class="menu">
            <el-row>
              <el-menu
                :default-active="computedActiveMainMenu"
                class="nav-menu-horizontal flex"
                mode="horizontal"
                text-color="#000000"
                :active-text-color="menuStyle.menuActiveText"
                :router="true"
                @select="handleSelect"
              >
                <el-menu-item
                  v-for="item of menu"
                  :key="item.path"
                  :index="item.path"
                >
                  <i v-if="item.meta.icon" :class="['iconfont', item.meta.icon]"></i>
                  {{ item.meta.title }}
                </el-menu-item>
              </el-menu>
            </el-row>
          </div>
          <div class="layout-top-right">
            <User></User>
          </div>
        </div>
        <!-- 左侧二级菜单 -->
        <div class="layout-bottom">
          <Menu :menu="menu" :active-main-menu="computedActiveMainMenu" :is-horizontal="isHorizontal"></Menu>
          <div class="main">
            <Tags @refresh="hanldeRefresh"></Tags>
            <transition name="fade-transverse" mode="out-in">
              <keep-alive v-if="refresh" :include="keepAliveInclude">
                <router-view :key="key" class="router-view"></router-view>
              </keep-alive>
            </transition>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import Menu from './Menu'
import Tags from './Tags.vue'
import menuConfig from '@/config'
import menuStyle from '../styles/menu.scss'
import User from './User.vue'
export default {
  name: 'Layout',
  components: {
    Menu,
    User,
    Tags
  },
  data() {
    const { menu } = menuConfig
    return {
      refresh:true,
      menu: menu,
      menuStyle,
      activeMainMenu: '/supplier',
      isHorizontal: false
    }
  },
  computed:{
    computedActiveMainMenu() {
      const active = this.$route.fullPath.split('/')[1] || this.activeMainMenu
      return active.includes('/') ? active : `/${active}`
    },
    keepAliveInclude() { // 只有tag存在的 才会缓存路由 如果配置了 isKeepAlive : false 不缓存
      const includes = this.$store.state.tags?.filter(im => im?.meta?.isKeepAlive === undefined || im?.meta?.isKeepAlive).map(route => route.name ) || []
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
    hanldeRefresh() {
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
.layout {
  height: 100%;
  ::v-deep .el-row {
    height: 100%;
  }
}
.layout-container {
  display: flex;
  flex-flow: column wrap;
  height: 100%;
  .layout-top {
    display: flex;
    height: 60px;
    align-items: center;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.12);
    .nav-menu-title {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 208px;
      background-color: #363636;
      color: #fff;
      font-size: 19px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: #ffffff;
      line-height: 21px;
    }
    .menu {
      flex: 3;
    }
    .layout-top-right{
      padding: 10px 24px;
      flex: 1;
      text-align: right;
    }
  }
   ::v-deep.nav-menu-horizontal{
      width: 100%;
      border-bottom: none;
      box-sizing: border-box;
      min-width: 700px;
    }
    .layout-bottom{
      flex: 1;
      display: flex;
      flex-flow: row nowrap;
      overflow: hidden;
      background-color: $--background-color-grey;
      ::v-deep .nav-menu-vertical{
        width: 208px;
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
