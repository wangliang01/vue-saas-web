<template>
  <el-dialog
    class="remote-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    v-bind="$attrs"
    @opened="opened"
    v-on="$listeners"
  >
    <y-table-pro
      ref="YTable"
      v-bind="taleProProps"
      :columns="columns"
      :load-data-api="loadDataApi"
      :params.sync="params"
      :height="472"
      ui-style="antd"
    >
    </y-table-pro>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'YTableDialogRemote',
  props: {
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: [Object, Array],
      default: null
    },
    loadDataApi: {
      type: Function,
      default: () => {}
    },
    params: {
      type: Object,
      default: () => ({})
    },
    checkedData: { // 选中的数据
      type: Array,
      default: () => []
    },
    taleProProps: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('before-close', done)
      done()
    },
    handleConfirm() {
      const tData = this.$refs.YTable.selection
      this.$emit('update:checkedData', tData)
      this.$emit('confirm', tData)
    },
    opened() {
      this.$refs.YTable.loadData()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.remote-dialog{
  .el-dialog__body{
    height: 638px;
    .y-table-batch-action-area {
      z-index: 1000;
      left: 208px !important;
    }
  }
  .antd-form-wrapper{
    .btn-wrapper {
      bottom: 16px;
    }
    .table-wrapper{
      margin-top: 0;
    }
  }
}
</style>
