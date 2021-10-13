<template>
  <div class="reconciliation-purchase">
    <CardList :data="list"></CardList>
    <div class="container">
      <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}" class="y-m-t-20"></y-table-pro>
    </div>
  </div>
</template>

<script>
import CardList from '@/components/CardList'
export default {
  name: 'ReconciliationPurchase',
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
          label: '采购金额',
          value: 89999,
          background: '#DC7458',
          color: '#fff'
        },
        {
          id: 2,
          label: '退货金额',
          value: 89999,
          background: '#88AEAC',
          color: '#fff'
        }
      ],
      pageList: null,
      columns: [
        {
          label: '选择日期',
          prop: 'createTime',
          filter: true,
          fieldType: 'DatePicker',
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          onPick(value) {
            console.log(value)
          },
          hidden: true
        },
        {
          label: '流水类型',
          filter: true,
          fieldType: 'Select',
          options: [{ label: '采购', value: '' }, { label: '退货', value: '' }]

        },
        {
          label: '关联单号'
        },
        {
          label: '交易金额'
        },
        {
          label: '完成时间'
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
.reconciliation-purchase{
  margin: 0 16px;
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: calc(100% - 120px);
  }
}
</style>
