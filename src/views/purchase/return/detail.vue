<template>
  <div class="purchase-return-detail">
    <div class="inner">
      <y-card :data="cardData" :columns="cardColumns"></y-card>
      <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}"></y-table-pro>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseDetail',
  data() {
    return {
      pageList: null,
      cardData: [],
      cardColumns: [
        {
          label: '创建时间'
        },
        {
          label: '采退单来源'
        },
        {
          label: '出库仓库'
        },
        {
          label: '备注'
        }
      ],
      columns: [
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
          label: '数量'
        },
        {
          label: '单价'
        },
        {
          label: '总额'
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
.purchase-return-detail{
  margin: 0 16px;
  .inner {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: calc(100% - 120px);
  }
}
</style>
