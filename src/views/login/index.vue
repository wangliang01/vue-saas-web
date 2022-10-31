<template>
  <div class="login">
    <div class="login-bg">
      <div class="login-content">
        <div class="login-form">
          <div class="wrapper">
            <h1 class="title">{{ systemName }}</h1>
            <div class="tabs">
              <div
                class="tabs-item"
                :class="{ active: actionTab === 'password' }"
                @click="toggleTab('password')"
              >
                账户密码登录
              </div>
              <div
                class="tabs-item"
                :class="{ active: actionTab === 'phone' }"
                @click="toggleTab('phone')"
              >
                手机号登录
              </div>
            </div>
            <y-form ref="form" v-model="form" :config="config">
              <!-- 辅助信息 -->
              <div class="sub-info">
                <el-checkbox
                  v-model="form.remenberPassword"
                  @change="handleChangeRemenberPassword"
                >记住密码</el-checkbox>
                <el-link type="primary" @click="handleForget">忘记密码</el-link>
              </div>
              <el-button
                class="y-block login-btn"
                type="primary"
                @click.enter="handleLogin"
              >登录</el-button>
            </y-form>
          </div>
        </div>
      </div>
    </div>
    <y-drawer
      title="忘记密码"
      :visible.sync="visible"
      :before-close="handleClose"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <y-form
        v-if="visible"
        ref="forgetForm"
        v-model="forgetPasswordForm"
        :config="forgetPasswordConfig"
        label-width="100px"
      ></y-form>
      <div style="text-align: right">
        <y-button @click="resetForgetForm">重置</y-button>
      </div>
    </y-drawer>
    <!-- 版权信息 -->
    <div class="copy-right">
      <el-link
        target="_blank"
        href="http://beian.miit.gov.cn"
      >版本所有：{{ copyright
      }}<span class="ml-20">备案号：{{ recordNumber }}</span></el-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import api from '@/api'
import { changeThemeColor } from '@/utils/themeColorClient'
import storage from '@/utils//storage'
const phoneReg = /^1\d{10}$/

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      visible: false,
      actionTab: 'password',
      form: {
        remenberPassword: false,
        username: '18566725203',
        password: '123456',
        phone: '',
        code: '',
        grant_type: 'password'
      },
      forgetPasswordForm: {
        phone: '',
        verificationCode: '',
        pwd: '',
        confirmPwd: ''
      },
      forgetPasswordConfig: {
        phone: {
          label: '账号',
          prop: 'phone',
          fieldType: 'Input',
          placeholder: '请输入手机号',
          rules: [
            { required: true, message: '手机号不能为空', trigger: ['blur'] }
          ]
        },
        verificationCode: {
          label: '验证码',
          prop: 'verificationCode',
          fieldType: {
            render: (h) => {
              return (
                <div style='display: flex; justify-content: space-between'>
                  <el-input
                    maxLength={6}
                    style='width: 62%'
                    v-model={this.forgetPasswordForm.verificationCode}
                    placeholder='请输入验证码'
                  >
                    <i slot='prefix' class='el-icon-lock'></i>
                  </el-input>
                  <el-button
                    style='width: 32%; border-radius: 20px;'
                    type='primary'
                    disabled={this.isForgetDisabled}
                    loading={this.loading}
                    onClick={this.getForgetCode}
                  >
                    {this.codeText}
                  </el-button>
                </div>
              )
            }
          },
          rules: [
            { required: true, message: '验证码不能为空', trigger: ['blur'] }
          ]
        },
        pwd: {
          label: '新密码',
          prop: 'pwd',
          fieldType: 'Input',
          maxLength: 16,
          type: 'password',
          readonly: true,
          rules: [
            { required: true, message: '新密码不能为空', trigger: ['blur'] },
            {
              min: 8,
              max: 16,
              message: '不能小于8个字符或者超过16个字符',
              trigger: 'blur'
            },
            {
              pattern: /^[0-9a-zA-Z]{1,}$/,
              message: '密码不合法，支持大小写字母与数字组合'
            }
          ]
        },
        confirmPwd: {
          label: '确认密码',
          prop: 'confirmPwd',
          fieldType: 'Input',
          maxLength: 16,
          type: 'password',
          readonly: true,
          rules: [
            { required: true, message: '新密码不能为空', trigger: ['blur'] },
            {
              min: 8,
              max: 16,
              message: '不能小于8个字符或者超过16个字符',
              trigger: 'blur'
            },
            {
              pattern: /^[0-9a-zA-Z]{1,}$/,
              message: '密码不合法，支持大小写字母与数字组合'
            }
          ]
        }
      },
      isDisabled: false,
      isForgetDisabled: false,
      resetTime: 60,
      forgetResetTime: 60
    }
  },
  computed: {
    // systemName() {
    //   return this.$store.state.setting.systemName
    // },
    ...mapState('setting', ['systemName', 'copyright', 'recordNumber']),
    // 验证码方案
    codeText() {
      return this.isForgetDisabled === false
        ? '获取验证码'
        : '倒计时' + this.forgetResetTime + '秒'
    },
    codeLoginText() {
      return this.isDisabled === false
        ? '获取验证码'
        : '倒计时' + this.resetTime + '秒'
    },
    config() {
      const userValidator = (rule, value, callback = () => {}) => {
        if (!value) {
          return callback('请输入账号')
        } else {
          if (!phoneReg.test(value)) {
            return callback('请输入正确的账号格式')
          } else {
            callback()
          }
        }
      }
      const phoneValidator = (rule, value, callback = () => {}) => {
        if (!value) {
          return callback('请输入手机号码')
        } else {
          if (!phoneReg.test(value)) {
            return callback('请输入正确的手机号码格式')
          } else {
            callback()
          }
        }
      }
      const username = {
        username: {
          prop: 'username',
          label: '',
          fieldType: {
            render: () => {
              return (
                <el-input
                  maxLength={11}
                  v-model={this.form.username}
                  placeholder='账号'
                >
                  <i slot='prefix' class='el-icon-user'></i>
                </el-input>
              )
            }
          },
          rules: [
            {
              required: true,
              trigger: ['blur', 'change'],
              validator: userValidator
            }
          ]
        }
      }
      const password = {
        password: {
          prop: 'password',
          label: '',
          fieldType: {
            render: () => {
              return (
                <el-input
                  type='password'
                  v-model={this.form.password}
                  placeholder='密码'
                >
                  <i slot='prefix' class='el-icon-lock'></i>
                </el-input>
              )
            }
          },
          rules: [
            {
              required: true,
              message: '请输入密码',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
      const phone = {
        phone: {
          prop: 'phone',
          label: '',
          fieldType: {
            render: () => {
              return (
                <el-input
                  maxLength={11}
                  v-model={this.form.phone}
                  placeholder='手机号码'
                >
                  <i slot='prefix' class='el-icon-phone'></i>
                </el-input>
              )
            }
          },
          rules: [
            {
              required: true,
              trigger: ['blur', 'change'],
              validator: phoneValidator
            }
          ]
        }
      }
      const code = {
        code: {
          prop: 'code',
          label: '',
          fieldType: {
            render: () => {
              return (
                <div style='display: flex; justify-content: space-between'>
                  <el-input
                    maxLength={6}
                    style='width: 60%'
                    v-model={this.form.code}
                    placeholder='请输入验证码'
                  >
                    <i slot='prefix' class='el-icon-lock'></i>
                  </el-input>
                  <el-button
                    style='width: 30%; border-radius: 20px;'
                    type='primary'
                    disabled={this.isDisabled}
                    loading={this.loading}
                    onClick={this.getCode}
                  >
                    {this.codeLoginText}
                  </el-button>
                </div>
              )
            }
          },
          rules: [
            {
              required: true,
              message: '请输入验证码',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
      if (this.form.grant_type === 'password') {
        return {
          ...username,
          ...password
        }
      } else if (this.form.grant_type === 'phone') {
        return {
          ...phone,
          ...code
        }
      } else {
        return false
      }
    }
  },
  mounted() {
    if (this.$route.path === '/login') {
      storage.removeWith(['loginUserMap'])
    }
    // 获取存入的用户数据
    const loginUserMap = storage.get('loginUserMap')
    if (loginUserMap?.remenberPassword) {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = loginUserMap[key]
      })
    }

    setTimeout(() => {
      changeThemeColor('#ff0000')
    }, 2000)
  },
  methods: {
    ...mapMutations('account', ['setToken', 'removeToken']),
    ...mapActions('account', ['getUser']),
    /* 切换选项卡 */
    toggleTab(type) {
      this.actionTab = type
      this.form.grant_type = type
      if (this.form.grant_type === 'phone' && this.form.username) {
        this.form.phone = this.form.username
      }
    },
    /* 获取验证码 */
    getCode() {
      this.$refs.form.validateField('phone', async(valid) => {
        if (valid === '') {
          this.loading = true
          try {
            const res = await api.loginApi.sendCode({
              phone: this.form.phone
            })
            if (res.success) {
              this.isDisabled = !this.isDisabled
              this.loading = false
              const countdown = setInterval(() => {
                this.resetTime--
                if (this.resetTime <= 0) {
                  clearInterval(countdown)
                  this.isDisabled = !this.isDisabled
                  this.resetTime = 60
                }
              }, 1000)
            }
          } catch (e) {
            this.loading = false
          }
        }
      })
    },
    getForgetCode() {
      this.$refs.forgetForm.validateField('phone', async(valid) => {
        if (valid === '') {
          this.loading = true
          try {
            const res = await api.loginApi.sendCode({
              phone: this.forgetPasswordForm.phone
            })
            if (res.success) {
              this.isForgetDisabled = !this.isForgetDisabled
              this.loading = false
              const countdown = setInterval(() => {
                this.forgetResetTime--
                if (this.forgetResetTime <= 0) {
                  clearInterval(countdown)
                  this.isForgetDisabled = !this.isForgetDisabled
                  this.forgetResetTime = 60
                }
              }, 1000)
            }
          } catch (e) {
            this.loading = false
          }
        }
      })
    },
    /* 登录 */
    handleLogin() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (this.form.grant_type === 'password') {
            // 密码登录
            this.handleLoginByPassword()
          } else if (this.form.grant_type === 'phone') {
            // 手机号登录
            this.handleLoginByPhone()
          }
        }
      })
    },
    async handleLoginByPassword() {
      const params = {
        password: this.form.password,
        username: this.form.username,
        grant_type: this.form.grant_type,
        account: ''
      }
      api.loginApi
        .login(params)
        .then(this.afterLogin)
        .catch(() => {
          this.removeToken()
        })
    },
    async afterLogin(res) {
      console.log(res)
      if (!res) return
      if (res.success) {
        /* 保存token */
        // this.setToken(res.data)
        // 获取用户基本信息
        this.getUser()
        // 跳转页面
        this.$router.push({
          name: 'Home'
        }).catch(err => {
          console.error(err)
        })
      }
    },
    async handleLoginByPhone() {
      const res = await api.loginApi
        .login({
          phone: this.form.phone,
          code: this.form.code,
          grant_type: this.form.grant_type
        })
        .catch(() => {
          storage.remove('token')
        })
      if (!res) return
      if (res.success) {
        storage.set('token', res.data)
        const customerInfo = await api.loginApi.getUserStructure({
          phone: this.form.phone
        })
        const arr = customerInfo.data.filter((item) => item.openScm === 1)
        if (!arr.length) {
          storage.remove('token')
          return this.$message.warning('没有权限')
        }
        if (arr.length > 1) {
          return this.$message.warning(
            '你当前登录账号开通了多个客户供应链设置，请到新商流平台取消多余的客户供应链设置'
          )
        }
        storage.set('customerInfo', arr[0])
        try {
          const info = await api.loginApi.getStaffInfo()
          if (info.success) {
            // 跳转到首页
            storage.set('customerInfo', {
              tenantId: info.data.accountId,
              orgId: info.data.accountId
            })
            storage.set('userInfo', info.data)
            this.$router.push('/')
          }
        } catch {
          storage.remove('token')
        }
      }
    },
    resetForgetForm() {
      this.forgetPasswordForm = {
        phone: '',
        verificationCode: '',
        pwd: '',
        confirmPwd: ''
      }
    },
    handleForget() {
      function removeAttribute() {
        this.removeAttribute('readonly')
      }
      this.visible = true
      this.forgetPasswordForm = {
        phone: '',
        verificationCode: '',
        pwd: '',
        confirmPwd: ''
      }
      if (this.form.username) {
        this.forgetPasswordForm.phone = this.form.username
      }
      this.$nextTick(() => {
        const form = this.$refs.forgetForm.$el
        const input = form.querySelectorAll('input')
        input?.[2]?.removeEventListener('focus', removeAttribute)
        input?.[3]?.removeEventListener('focus', removeAttribute)
        input?.[2]?.addEventListener('focus', removeAttribute)
        input?.[3]?.addEventListener('focus', removeAttribute)
      })
    },
    handleChangeRemenberPassword(remenberPassword) {
      // 记住密码
      const loginUserMap = storage.get('loginUserMap') || {}
      loginUserMap.remenberPassword = remenberPassword
      storage.set('loginUserMap', loginUserMap)
    },
    handleCancel(done) {
      done()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleConfirm() {
      this.$refs.forgetForm.validate((valid) => {
        if (valid) {
          this.$confirm(`确认修改密码？`)
            .then(async() => {
              const res = await api.loginApi.forgetPwd(this.forgetPasswordForm)
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.visible = false
              }
            })
            .catch(() => {})
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
}
.login-bg {
  flex: 1;
  background: url("../../assets/images/bg2.png") no-repeat 12% center/auto 70%,
    url("../../assets/images/bg1.png") center top/100% 100% no-repeat,
    url("../../assets/images/bg.png") center top/100% 100% no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-content {
  width: 70%;
  min-width: 1200px;
  min-height: 500px;
  height: 60%;
  //background: #FFFFFF;
  border-radius: 22px;
  //box-shadow: 0px 32px 92px 0px rgba(14, 107, 30, 0.21);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: url("../../assets/images/white.png");
  background-size: 42% 100%;
  background-repeat: no-repeat;
  background-position: 100% 0;
  .login-form {
    width: 42%;
    display: flex;
    align-items: center;
    justify-content: center;
    .wrapper {
      width: 368px;
      .tabs {
        display: flex;
        justify-content: space-around;
        .tabs-item {
          padding-bottom: 8px;
          font-size: 16px;
          font-weight: 400;
          border-bottom: 2px solid transparent;
          margin-bottom: 24px;
          cursor: pointer;
          &.active {
            color: $--color-primary;
            border-bottom: 2px solid $--color-primary;
          }
        }
      }
      .title {
        font-size: 33px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 50px;
      }
      ::v-deep .el-form-item {
        margin-bottom: 24px;
      }
      ::v-deep .el-input__prefix {
        line-height: 40px;
        left: 15px;
      }
      ::v-deep .el-input__inner {
        height: 40px;
        line-height: 40px;
        padding-left: 34px;
        border-radius: 20px;
        background-color: #eff0f4;
        border-color: transparent;
      }
      .sub-info {
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .login-btn {
        padding: 12px 20px;
        width: 100%;
        border-radius: 20px;
        margin-bottom: 25px;
      }
      .apply-link {
        float: right;
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  .login-content .login-form .wrapper .title {
    font-size: 24px;
  }
}

.copy-right {
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ::v-deep .el-link.el-link--default {
    color: #fff;
  }
  .ml-20 {
    margin-left: 20px;
  }
}
</style>
