<template>
  <div class="goods-list">
    <y-table-pro :load-data-api="pageList" :columns="columns" ui-style="antd" :pagination="{'page-size': 20}"></y-table-pro>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'GoodsList',
  components: {
  },
  props: {

  },
  data() {
    return {
      pageList: api.goodsApi.getGoodsList,
      columns: [
        {
          label: '商品编号',
          prop: 'skuId',
          filter: true,
          fieldType: 'Input'
        },
        {
          label: '商品名称',
          prop: 'skuName',
          filter: true,
          fieldType: 'Input'
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
          label: '约定单价'
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
.goods-list{
  margin: 0 16px;
}
</style>
