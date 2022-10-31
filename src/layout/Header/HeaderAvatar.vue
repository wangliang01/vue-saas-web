<template>
  <div class="user">
    <!-- 警报 -->
    <el-badge is-dot>
      <i class="iconfont icon-xiaoxi"></i>
    </el-badge>
    <el-popover
      v-model="visible"
      placement="bottom"
      popper-class="user"
      title=""
      width="80"
      trigger="manual"
    >
      <!-- Avatar头像 -->
      <div slot="reference" class="avatar-wrapper" @click="visible = !visible">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="username">{{ staffName }}</span>
      </div>
      <!-- content -->
      <el-button type="text" class="logout" @click="handleLogout">退出登录</el-button>
    </el-popover>
  </div>
</template>

<script>
import api from '@/api'
import storage from '@/utils/storage'
export default {
  name: 'User',
  components: {
  },
  props: {

  },
  data() {
    return {
      loginApi: api.loginApi,
      visible: false,
      staffName: ''
    }
  },
  mounted() {
    const loginStaffInfo = storage.get('userInfo')
    this.staffName = loginStaffInfo?.customerName
  },
  methods: {
    async handleLogout() {
      try {
        const res = await this.loginApi.logout()
        if (res.success) {
          this.$message.success('退出成功')
          this.$router.push({ name: 'Login' })
        }
      } catch (error) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: inline-flex;
  align-items: center;
  text-align: right;
  padding: 0 12px !important;
  .icon-xiaoxi {
    width: 16px;
    height: 16px;
    color: #8C8C8C;
    cursor: pointer;
  }
  .avatar-wrapper{
    margin-left: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .username{
      margin-left: 8px;
      font-size: 14px;
    }
  }
  ::v-deep .el-popover {
    min-width: 100px !important;
  }
  .logout{
    width: 100%;
    color: #8C8C8C;
  }
}
</style>
