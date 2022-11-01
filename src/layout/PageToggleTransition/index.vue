<template>
  <transition v-if="!disabled" :enter-active-class="`animated ${enterAnimate} page-toggle-enter-active`" :leave-active-class="`animated ${leaveAnimate} page-toggle-leave-active`">
    <slot></slot>
  </transition>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageToggleTransition',
  components: {
  },
  props: {

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

</style>
