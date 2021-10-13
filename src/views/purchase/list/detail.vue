<template>
  <div class="purchase-list-detail">
    <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}"></y-table-pro>
  </div>
</template>

<script>
export default {
  name: 'PurchaseDetail',
  data() {
    return {
      pageList: null,
      columns: [
        {
          label: '采购日期'
        },
        {
          label: '商品编号'
        },
        {
          label: '商品名称'
        },
        {
          label: '规格'
        },
        {
          label: '单位'
        },
        {
          label: '采购数量'
        },
        {
          label: '约定单价'
        },
        {
          label: '采购总额'
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
.purchase-list-detail{
  margin: 0 16px;
}
</style>
