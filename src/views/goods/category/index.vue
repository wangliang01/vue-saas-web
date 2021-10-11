<template>
  <div class="content-container">
    <div class="category-tooltip">
      <div>
        <i class="el-icon-warning-outline"></i>
        提示：请创建至三级品类，以免商品绑定不成功~
      </div>
    </div>
    <div class="category-container">
      <Item title="一级分类" :level="0" :parent-id="0" @changeItem="handleChangeRootItem"></Item>
      <div class="iconfont icon-xiayijibie"></div>
      <Item title="二级分类" :params="params" :level="1" @changeItem="handleChangeRootItem"></Item>
      <div class="iconfont icon-xiayijibie"></div>
      <Item title="三级分类" :params="params" :level="2"></Item>
    </div>
  </div>
</template>

<script>
import Item from './item'
// import { getCategory } from '@/api/goods'
export default {
  name: 'Category',
  components: {
    Item
  },
  data() {
    return {
      params: {
        level: 0,
        parentId: 0
      }
    }
  },
  methods: {
    /**
     * 改变父级ID
     * @param item
     */
    handleChangeRootItem(item) {
      let level = item.level
      this.params = {
        parentId: item.id,
        level: ++level
      }
    }
  }
}
</script>

<style scoped lang="scss">

.container {
  height: 100%;
  overflow: auto;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  background-color: $--background-color-grey;
  position: relative;
}

.category-container {
  padding: 20px;
  box-sizing: border-box;
  height: calc(100% - 50px);
  background: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  > div:nth-child(2n+1) {
    flex: 1;
  }
  .iconfont {
    color: #E5E5E5;
    margin: 0 6px;
  }

}

.category-tooltip {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  margin-bottom: 10px;
  font-size: 13px;
  >div {
    //float: right;
    background: rgba(21, 174, 87, 0.1);
    color: $--color-primary;
    padding: 0 10px;
    border-radius: 5px;
  }
}

</style>
