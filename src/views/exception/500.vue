<template>
  <exception-page home-route="/home" :style="`min-height: ${minHeight}`" type="500"></exception-page>
</template>

<script>
import ExceptionPage from '@/components/Exception/ExceptionPage'
import { mapState } from 'vuex'
export default {
  name: 'Exp500',
  components: { ExceptionPage },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + 'px' : '100vh'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
