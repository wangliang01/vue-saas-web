<template>
  <div class="purchase-list">
    <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}"></y-table-pro>
  </div>
</template>

<script>
export default {
  name: 'PurchaseList',
  data() {
    return {
      pageList: null,
      columns: [
        {
          label: '采购单编号',
          prop: 'purchaseOrderNo',
          filter: true,
          fieldType: 'Input'
        },
        {
          label: '采购单来源',
          prop: 'purchaseOrderOrigin'
        },
        {
          label: '采购单类型',
          prop: 'purchaseOrderType'
        },
        {
          label: '商品数',
          prop: 'goodsNum'
        },
        {
          label: '采购总额',
          prop: 'purchaseAmoutSum'
        },
        {
          label: '状态',
          prop: 'status',
          filter: true,
          fieldType: 'Select',
          options: [{ label: '待出库', value: 0 }, { label: '已出库', value: 1 }]
        },
        {
          label: '要求配送时间',
          prop: 'distributionDate',
          filter: true,
          fieldType: 'DatePicker',
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          onPick(value) {
            console.log(value)
          }
        },
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '完成时间',
          prop: 'updateTime'
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return <el-button type='text'>详情</el-button>
          }
        }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.purchase-list {
  margin: 0 16px;
}
</style>
