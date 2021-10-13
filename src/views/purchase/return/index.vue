<template>
  <div class="purchase-return">
    <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}"></y-table-pro>
  </div>
</template>

<script>
export default {
  name: 'PurchaseReturn',
  data() {
    return {
      pageList: null,
      columns: [
        {
          label: '采退单编号',
          filter: true,
          fieldType: 'Input'
        },
        {
          label: '商品数'
        },
        {
          label: '退货金额'
        },
        {
          label: '创建时间'
        },
        {
          label: '操作'
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
.purchase-return{
  margin: 0 16px;
}
</style>
