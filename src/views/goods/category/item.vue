<template>
  <div v-loading="loading" class="category-box">
    <div class="category-box-title">
      {{ title }}
      <y-button type="text" class="category-box-add" @click="handleAdd">添加</y-button>
    </div>
    <div class="category-box-content">
      <div v-for="item in dataList" :key="item.id" class="category-box-item" :class="{'item-active': current.id === item.id}" @click="handleChange(item)">
        <div>{{ item.categoryName }}</div>
        <div class="item-handle">
          <span class="iconfont icon-kebianji" @click.stop="handleEdit(item)"></span>
          <span class="iconfont icon-lajitong" @click.stop="handleDel(item)"></span>
        </div>
      </div>
    </div>
    <y-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" @submit.native.prevent>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="ruleForm.categoryName" @></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <y-button @click="dialogVisible = false">取 消</y-button>
        <y-button type="primary" :loading="btnLoading" @click="handleSubmit">保 存</y-button>
      </span>
    </y-dialog>
  </div>
</template>

<script>
import { getCategory, updateCategory, addCategory, delCategory } from '@/api/goods'
export default {
  name: 'Item',
  props: {
    title: {
      default: '一级分类',
      type: String
    },
    level: {
      default: 0,
      type: Number
    },
    params: {
      default: () => {
        return {
          level: 0,
          parentId: 0
        }
      },
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      current: {},
      dialogVisible: false,
      ruleForm: {
        categoryName: ''
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur' }
        ]
      },
      dataList: [],
      parentId: 0
    }
  },
  computed: {
    dialogTitle() {
      if (this.ruleForm.id) {
        return '编辑分类'
      }
      return '添加分类'
    }
  },
  watch: {
    params() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    /**
     * 获取类别列表
     * @param params
     * @returns CategoryList
     */
    async getData(params) {
      const beanParams = params || this.params
      if (beanParams.level + 1 === this.level) {
        this.dataList = []
        this.parentId = 0
      }
      if (this.level !== beanParams.level) {
        return
      }
      this.loading = true
      this.parentId = beanParams.parentId
      try {
        const params = {
          ...beanParams
        }
        const { data } = await getCategory(params)
        this.dataList = data
        this.current = {}
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    /**
     * 改变当前选择类别
     * @param item
     */
    handleChange(item) {
      this.current = item
      this.$emit('changeItem', item)
    },
    handleAdd() {
      if ((this.level === this.parentId) || (this.level && this.parentId)) {
        this.ruleForm = {
          categoryName: '', // 商品分类名称
          level: this.level, // 分类级别：0->1级；1->2级
          parentId: this.parentId // 上级分类编号:0表示为一级分类
        }
        this.dialogVisible = true
        return
      }
      this.$message.warning('请选择新增父类')
    },
    handleEdit(item) {
      this.ruleForm = {
        categoryName: item.categoryName,
        id: item.id,
        level: item.level,
        parentId: item.parentId // 父级分类编号
      }
      this.dialogVisible = true
    },

    /**
    * 添加分类
    */
    handleSubmit() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          try {
            this.btnLoading = true
            let string = '修改成功!'
            if (this.ruleForm.id) {
              await updateCategory(this.ruleForm)
            } else {
              await addCategory(this.ruleForm)
              string = '添加成功!'
            }
            this.btnLoading = false
            this.$message({
              type: 'success',
              message: string
            })
            this.dialogVisible = false
            this.getData({ level: this.level, parentId: this.parentId })
          } catch (e) {
            this.btnLoading = false
            console.log(e)
          }
        }
      })
    },
    /**
     * 删除分类
     */
    handleDel(item) {
      this.$confirm('确认删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          await delCategory({ id: item.id })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData({ level: this.level, parentId: this.parentId })
        } catch (e) {
          console.log(e)
        }
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">

.category-box {
  border-radius: 2px;
  border: 1px solid #E9E9E9;
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.category-box-title {
  height: 46px;
  border-radius: 3px 3px 0 0;
  border: 1px solid #E9E9E9;
  border-width: 0 0 1px 0;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  line-height: 46px;
  text-align: center;
  position: sticky;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 1;
}

.category-box-content {
  padding: 8px;
}

.category-box-add {
  position: absolute;
  right: 23px;
  //top: 4px;
  line-height: 28px;
}

.category-box-item {
  height: 40px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  padding: 0 8px;
  cursor: pointer;
  justify-content: space-between;
  > div{
    opacity: .65;
  }
  &.item-active {
    background: #E6F7FF;
    color: #1890FF;
  }

  .item-handle {
    opacity: .45;
    .iconfont {
      margin: 0 8px;
    }
  }
}

</style>
