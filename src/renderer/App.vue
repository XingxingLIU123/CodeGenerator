<template lang="pug">
#app.layout-column
  .layout-header 多米塔科技-前后端代码生成器
  .layout-container.flex.layout-column
    a-steps(:current="currentStep")
      a-step(
        v-for="step in steps"
        :key="step.title"
        :title="step.title"
      )
    keep-alive
      router-view
</template>

<script>
export default {
  name: 'electron-vue',
  computed: {
    currentStep () {
      return this.$store.state.currentStep
    },
    steps () {
      return this.$store.state.steps
    }
  }
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
}
#app .ant-steps{
  margin-bottom: 10px;
}
</style>
