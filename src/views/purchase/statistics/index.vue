<template>
  <div class="purchase-statistics">
    <CardList :data="list"></CardList>
    <div class="container">
      <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}" class="y-m-t-20"></y-table-pro>
    </div>
  </div>
</template>

<script>
import CardList from '@/components/CardList'
export default {
  name: 'PurchaseStatistics',
  components: {
    CardList
  },
  props: {

  },
  data() {
    return {
      list: [
        {
          id: 1,
          label: '采购总量',
          value: 89999,
          background: '#258f76',
          color: '#fff'
        },
        {
          id: 2,
          label: '采购商品数',
          value: 89999,
          background: '#ebaf39',
          color: '#fff'
        },
        {
          id: 3,
          label: '交易总额',
          value: 89999,
          background: '#DC7458',
          color: '#fff'
        }
      ],
      pageList: null,
      columns: [
        {
          label: '商品编号'
        },
        {
          label: '商品名称',
          prop: 'skuName',
          filter: true,
          fieldType: 'Input'
        },
        {
          label: '选择日期',
          prop: 'createTime',
          filter: true,
          fieldType: 'DatePicker',
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          onPick(value) {}
        },
        {
          label: '商品分类'
        },
        {
          label: '规格'
        },
        {
          label: '单位'
        },
        {
          label: '是否标品'
        },
        {
          label: '采购数量'
        },
        {
          label: '交易总额'
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
.purchase-statistics{
  margin: 0 16px;
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: calc(100% - 120px);
  }
}
</style>
