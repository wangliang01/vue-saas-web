<template>
  <!-- 顶部一级菜单 -->
  <div class="basic-layout-header">
    <div class="nav-menu-title">
      <img src="../../assets/logo.png" alt="logo" width="30" class="y-m-r-4">
      <h1>
        {{ systemName }}</h1>
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
      <HeaderAvatar></HeaderAvatar>
    </div>
  </div>
</template>

<script>
import menuStyle from '@/styles/menu.scss'
import HeaderAvatar from '../Header/HeaderAvatar.vue'
export default {
  name: 'AdminHeader',
  components: {
    HeaderAvatar
  },
  props: {

  },
  data() {
    return {
      menuStyle,
      isHorizontal: false
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    },
    computedActiveMainMenu() {
      const active = this.$route.fullPath.split('/')[1] || this.activeMainMenu
      return active.includes('/') ? active : `/${active}`
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/menu.scss';
 .basic-layout-header {
    display: flex;
    height: 60px;
    align-items: center;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.12);
    .nav-menu-title {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: $sideBarWidth;
      background-color: $subMenuBg;
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
</style>
