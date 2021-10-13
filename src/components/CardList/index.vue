<template>
  <div class="card-list y-flex">
    <y-container v-for="(item, index) in data" :key="item.id || index" class="card-item" border-type="" :background="item.background">
      <div class="inner" :style="{color: item.color}">
        <div class="title">{{ item.label }}</div>
        <div class="desc y-m-t-10">
          <count-to :start-val="0" :end-val="item.value" :duration="2000"></count-to>
        </div>
      </div>
    </y-container>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'CardList',
  components: {
    CountTo
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.card-list{
  .card-item {
    margin-right: 20px;
    &:last-child{
      margin-right: 0;
    }

    .inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      .title {

      }
      .desc {

      }
    }
  }
}
</style>
