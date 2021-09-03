<template>
  <div v-if="(menuItem.meta && menuItem.meta.hidden) !== undefined ? !menuItem.meta.hidden : !menuItem.hidden" class="menu-item">
    <!-- 含有children -->
    <el-submenu v-if="menuItem.children && menuItem.children.length" :index="menuItem.path">
      <template slot="title">
        <i v-if="menuItem.meta.icon" :class="['iconfont', menuItem.meta.icon]"></i>
        <span>{{ menuItem.meta.title }}</span>
      </template>
      <template v-for="(child, idx) in menuItem.children">
        <MenuItem :key="idx" :menu-item="child" class="menu-item__children"></MenuItem>
      </template>
    </el-submenu>
    <!-- 没有children -->
    <el-menu-item v-else :index="menuItem.path">
      <template slot="title">
        <i v-if="menuItem.meta.icon" :class="['iconfont', menuItem.meta.icon]"></i>
        <i v-else class="dot"></i>
        <span>{{ menuItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped lang="scss">

</style>
