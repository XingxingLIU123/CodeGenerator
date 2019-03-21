<template lang="pug">
  div
    el-button(@click="prevStep" size="small") 上一步
    el-button(@click="produce" type="primary" size="small") 生成前端代码
</template>

<script>
const ipc = require('electron').ipcRenderer
export default {
  name: 'produce-code',
  created () {
    let self = this
    ipc.on('produce-front-success', function (event, art) {
      self.$message.success('代码生成成功')      
    })
  },
  methods: {
    produce () {
      ipc.send('produce-front', this.$store.state.json)
    },
    prevStep () {
      this.$store.dispatch('toPrevious')
      this.$router.push('/model-setting')
    }
  }
}
</script>
