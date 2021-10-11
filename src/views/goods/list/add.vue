<template>
  <div v-loading="loading" class="content-container">
    <div class="add-goods-form">
      <y-form
        ref="addGoodsForm"
        v-model="form"
        :config="config"
        label-position="left"
        width="500px"
        label-width="100px"
      ></y-form>
      <div class="footer-button">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getGoodsUnit, add, update, getGoodsById } from '@/api/goods'
import clearBuffer from '@/utils/clearBuffer'
export default {
  name: 'AddGoods',
  // beforeRouteLeave(to, form, next) {
  //   this.$store.commit('REMOVE_TAG', form)
  //   next()
  // },
  data() {
    // const _this = this
    return {
      form: {
        goodsName: '',
        categoryFullId: [],
        isNormal: 1,
        status: 1,
        categoryFullName: '',
        goodsUnit: ''
      },
      props: {
        lazy: true,
        checkStrictly: false,
        lazyLoad: async(node, resolve) => {
          const params = {
            level: node.level || 0,
            parentId: node.value || 0
          }
          const res = await getCategory(params)
          if (res.data && Array.isArray(res.data)) {
            const data = res.data.map(item => {
              return {
                label: item.label || item.categoryName,
                value: item.value || item.id,
                leaf: node.level >= 2
              }
            })
            resolve(data)
          } else {
            resolve(res)
          }
        }
      },
      config: {
        goodsName: {
          prop: 'goodsName',
          label: '商品名称',
          fieldType: 'Input',
          labelSuffix: '：',
          rules: [
            { required: true, message: '商品名称不能为空', trigger: ['blur'] },
            { min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' }
          ]
        },
        categoryFullId: {
          prop: 'categoryFullId',
          label: '商品分类',
          labelSuffix: '：',
          fieldType: {
            render: () => {
              // console.log(this.form.categoryId)
              // return <y-category-cascader clearable v-model={this.form.categoryId} inputValue={this.form.categoryFullName} dataApi={getCategory} on-value-change={(value, inputValue) => this.valueChange(value, inputValue)}>
              // </y-category-cascader>
              return <el-cascader ref='goodsCategory' clearable props={ { props: this.props } } v-model={this.form.categoryFullId} on-change={(value) => { this.valueChange(value) }}>
              </el-cascader>
            }
          },
          rules: [{ required: true, message: '商品分类不能为空', trigger: ['blur', 'change'] }]
        },
        spec: {
          prop: 'spec',
          label: '规格',
          fieldType: 'Input',
          labelSuffix: '：',
          rules: [
            { required: true, message: '规格不能为空', trigger: ['blur'] },
            { min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur' }
          ]
        },
        goodsUnit: {
          prop: 'goodsUnit',
          label: '单位',
          fieldType: 'Select',
          // fieldType: {
          //   render() {
          //     return <y-select attrs={this.$attrs} on={this.$listeners}
          //       onChange={(val) => {
          //         _this.$message.warning('修改单位或换算关系可能会造成库存计算错误，请确认是否提交？')
          //       }}>
          //     </y-select>
          //   }
          // },
          labelSuffix: '：',
          api: async() => {
            try {
              const { data } = await getGoodsUnit()
              return {
                success: true,
                data: data.map(item => {
                  return {
                    label: item,
                    value: item
                  }
                })
              }
            } catch (e) {
              console.log(e)
            }
          },
          rules: [{ required: true, message: '单位不能为空', trigger: ['change'] }]
        },
        isNormal: {
          prop: 'isNormal',
          label: '是否标品',
          fieldType: 'Radio',
          labelSuffix: '：',
          options: [
            {
              label: '标品',
              value: 1,
              cols: 12
            },
            {
              label: '非标品',
              value: 0,
              cols: 12
            }
          ]
        },
        status: {
          prop: 'status',
          label: '状态',
          fieldType: 'Radio',
          labelSuffix: '：',
          options: [
            {
              label: '启用',
              value: 1,
              cols: 12
            },
            {
              label: '停用',
              value: 0,
              cols: 12
            }
          ]
        }
      },
      unitOptions: [],
      baseUnit: '',
      loading: false
    }
  },
  // watch: {
  //   '$route.path'() {
  //     this.handleInit()
  //   },
  //   'form.goodsUnit'() {
  //     console.log(1)
  //   }
  // },
  mounted() {
    // setTimeout(() => {
    this.handleInit()
    // }, 1000)
  },
  methods: {
    handleInit() {
      if (this.$route.query.id) {
        this.getGoodsById()
      }
    },
    async getGoodsById() {
      try {
        this.loading = true
        const { data } = await getGoodsById(this.$route.query.id)
        data.categoryFullId = data.categoryFullId.split(',')
        this.form = data
        this.baseUnit = this.form.goodsUnit
        this.loading = false
        this.$nextTick(() => {
          this.$refs.goodsCategory.inputValue = data.categoryFullName
          this.$nextTick(() => {
            this.$refs.goodsCategory.presentText = data.categoryFullName
          })
        })
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    /**
     * 取消
     */
    handleCancel() {
      this.$store.commit('REMOVE_TAG', this.$route)
      this.$router.push('/goods/list')
    },
    /**
     * 提交
     */
    handleSubmit() {
      this.$refs.addGoodsForm.validate(async valid => {
        if (valid) {
          try {
            this.$openFullScreen()
            const params = {
              ...this.form,
              categoryFullId: this.form.categoryFullId.join(',')
            }
            if (!this.form.id) {
              await add(params)
              this.$message.success('创建商品成功')
            } else {
              if (this.baseUnit !== this.form.goodsUnit) {
                this.$confirm('修改单位或换算关系可能会造成库存计算错误，请确认是否提交？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                  await update(params)
                  this.$message.success('编辑商品成功')
                  this.$store.commit('REMOVE_TAG', this.$route)
                  clearBuffer('Goods').then(() => {
                    this.$router.push('/goods/list')
                  })
                }).catch(() => {
                  this.form.goodsUnit = this.baseUnit
                })
                return
              }
              await update(params)
              this.$message.success('编辑商品成功')
            }
            this.$closeFullScreen()
            this.$store.commit('REMOVE_TAG', this.$route)
            clearBuffer('Goods').then(() => {
              this.$router.push('/goods/list')
            })
          } catch (e) {
            this.$closeFullScreen()
            console.log(e)
          }
        }
      })
    },
    valueChange(value) {
      this.form.categoryFullId = value
      this.$nextTick(() => {
        console.log(this.$refs.goodsCategory?.presentText)
        const str = this.$refs.goodsCategory?.presentText
        this.form.categoryFullName = str.replace(new RegExp(/( )/g), '') || ''
      })
    }
  }
}
</script>

<style scoped>

.add-goods-form {
  background: #fff;
  padding: 20px;
}

</style>
