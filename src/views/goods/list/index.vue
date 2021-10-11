<template>
  <div class="content-container">
    <y-table-pro ref="goodsTable" :columns="columns" :load-data-api="loadDataApi" ui-style="antd" :params.sync="paramsObj" :pagination="{'page-size': 20}" @size-change="sizeChange">
      <div slot="table-top-right">
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <!--        <el-button type="primary" @click="handleExport">导出</el-button>-->
        <!--        <el-button type="primary" @click="handleImport">导入</el-button>-->
        <y-batch-import
          btn-text="导入"
          :columns="importColumns"
          :upload-success="uploadSuccess"
          download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/%E4%BE%9B%E5%BA%94%E5%95%86%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5.xlsx"
          @upload="upload"
        >
          <div></div>
        </y-batch-import>
      </div>
    </y-table-pro>
    <y-dialog
      title="所属供应商"
      :visible.sync="supplierVisible"
      width="50%"
    >
      <div class="goods-supplier-title">
        <div>商品编码：</div>
        <div>{{ currentSupplier.goodsCode }}</div>
        <div>商品名称：</div>
        <div>{{ currentSupplier.goodsName }}</div>
      </div>
      <y-table :columns="supplierColumns" :data="currentSupplier.supplierPriceList"></y-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="supplierVisible = false">关 闭</el-button>
      </span>
    </y-dialog>
  </div>
</template>

<script>
import { get, updateStatus, getCategory, importGoods } from '@/api/goods'
import _ from 'lodash'
import clearBuffer from '@/utils/clearBuffer'
export default {
  name: 'Goods',
  data() {
    return {
      options: [],
      currentSupplier: {},
      supplierVisible: false,
      props: {
        lazy: true,
        checkStrictly: true,
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
      columns: [
        {
          prop: 'size',
          noReset: true,
          hidden: true
        },
        {
          label: '商品编号',
          prop: 'goodsCode'
        },
        {
          label: '商品名称',
          prop: 'goodsName',
          filter: true,
          fieldType: 'Input',
          placeholder: '请输入商品名称'
        },
        {
          label: '商品分类',
          prop: 'categoryFullName'
        },
        {
          label: '商品分类',
          prop: 'categoryId',
          filter: {
            render: (h) => {
              // return <y-category-cascader clearable v-model={this.categoryIdArr} dataApi={getCategory}>
              // </y-category-cascader>
              return <el-cascader clearable props={ { props: this.props } } v-model={this.categoryIdArr}>
              </el-cascader>
            }
          },
          hidden: true
        },
        {
          label: '规格',
          prop: 'spec'
        },
        {
          label: '单位',
          prop: 'goodsUnit'
        },
        {
          label: '是否标品',
          prop: 'isNormal',
          formatter(row) {
            return ['否', '是'][row.isNormal]
          }
        },
        {
          label: '加权平均价',
          prop: 'weightAvgPrice',
          formatter(row) {
            return _.round(row.weightAvgPrice, 4)
          }
        },
        {
          label: '状态',
          prop: 'status',
          filter: true,
          fieldType: 'Select',
          placeholder: '全部',
          options: [{ name: '停用', value: 0 }, { name: '启用', value: 1 }],
          model: {
            label: 'name',
            value: 'value'
          },
          formatter(row) {
            return ['停用', '启用'][row.status]
          }
        },
        {
          label: '所属供应商',
          prop: 'code',
          render: (h, { row }) => {
            return <el-button type='text' onClick={() => { this.handleViewSupplier(row) }}>{row?.supplierPriceList?.length || 0}</el-button>
          }
        },
        {
          label: '操作',
          prop: 'code',
          render: (h, { row }) => {
            return <div>
              <el-button type='text' onClick={() => { this.handleEdit(row) }}>修改</el-button>
              <el-button type='text' onClick={() => { this.handleDel(row) }}>{row.status ? '停用' : '启用'}</el-button>
            </div>
          }
        }
      ],
      supplierColumns: [
        {
          label: '供应商名称',
          prop: 'supplierName'
        },
        {
          label: '约定采购价',
          prop: 'purchasePrice'
        }
      ],
      supplierList: [],
      uploadSuccess: false,
      importColumns: [
        // {
        //   label: '商品编号',
        //   prop: 'code',
        //   type: 'input',
        //   required: true
        // },
        {
          label: '商品名称',
          prop: 'goodsName',
          type: 'input',
          required: true
        },
        {
          label: '一级分类',
          prop: 'category1',
          type: 'input',
          required: true
        },
        {
          label: '二级分类',
          prop: 'category2',
          type: 'input',
          required: true
        },
        {
          label: '三级分类',
          prop: 'category3',
          type: 'input',
          required: true
        },
        {
          label: '规格',
          prop: 'spec',
          type: 'input',
          required: true
        },
        {
          label: '单位',
          prop: 'goodsUnit',
          type: 'input',
          required: true
        },
        {
          label: '是否标品',
          prop: 'normal',
          type: 'input',
          required: true
        }
        // {
        //   label: '加权平均价',
        //   prop: 'ave',
        //   type: 'input',
        //   required: true
        // },
        // {
        //   label: '状态',
        //   prop: 'status',
        //   type: 'input',
        //   required: true
        // }
      ],
      paramsObj: {
        categoryId: '',
        size: 20
      },
      categoryIdArr: []
    }
  },
  watch: {
    categoryIdArr(v) {
      if (!v.length) {
        this.paramsObj.categoryId = ''
      } else {
        this.paramsObj.categoryId = v[v.length - 1]
      }
    },
    'paramsObj.categoryId'(v, oldv) {
      if (v === '' && v !== oldv) {
        this.categoryIdArr = []
      }
    },
    'paramsObj.size'(v, oldv) {
      if (v === '') {
        this.paramsObj.size = 20
      }
    }
  },
  methods: {
    loadDataApi: get,
    /**
     * 新增商品
     */
    handleAdd() {
      clearBuffer('AddGoods').then(() => {
        this.$router.push({
          name: 'AddGoods'
        })
      })
    },
    /**
     * 编辑商品
     * @param row
     * @return null
     */
    handleEdit(row) {
      this.$router.push({
        name: 'EditGoods',
        query: {
          id: row.id
        }
      })
    },
    handleExport() {

    },
    handleViewSupplier(row) {
      this.supplierVisible = true
      this.currentSupplier = row
    },
    /**
     * 启停商品
     * @param row
     * @return null
     */
    handleDel(row) {
      const str = row.status ? '停用' : '启用'
      this.$confirm(`确认${str}该商品, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await updateStatus({ id: row.id, status: row.status ? 0 : 1 })
        this.$message({
          type: 'success',
          message: `${str}成功!`
        })
        this.$refs.goodsTable.loadData()
      }).catch(() => {})
    },
    /**
     * 导入列表
     * @param data
     * @returns {Promise<void>}
     */
    async upload(data) {
      try {
        this.$openFullScreen()
        await importGoods(data)
        this.uploadSuccess = true
        this.$message.success('上传商品列表成功')
        this.$closeFullScreen()
        this.$refs.goodsTable.loadData()
        this.$nextTick(() => {
          this.uploadSuccess = false // 保证再次打开也能关闭
        })
      } catch (e) {
        this.$closeFullScreen()
        console.log(e)
      }
    },
    sizeChange(size) {
      this.paramsObj.size = size
    }
  }
}
</script>

<style scoped lang="scss">

.goods-supplier-title{
  display: flex;
  margin-bottom: 18px;
  div:nth-of-type(2n) {
    flex: 1;
  }
  div:nth-of-type(2n + 1) {
    width: 80px;
  }
}

</style>
