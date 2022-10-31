<template>
  <!-- 顶部一级菜单 -->
  <div class="layout-top">
    <div class="nav-menu-title">
      <h1>{{ systemName }}</h1>
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
export default {
  name: 'AdminHeader',
  components: {
  },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
