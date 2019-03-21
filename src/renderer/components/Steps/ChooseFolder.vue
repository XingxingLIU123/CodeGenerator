<template lang="pug">
.flex.layout-column__between
  a-upload-dragger(
    name="file"
    :remove="handleRemove"
    :fileList="fileList"
    :beforeUpload="beforeUpload"
    directory
  )
    p.ant-upload-drag-icon
      a-icon(type="inbox")
    p.ant-upload-text 选择项目
    p.ant-upload-hint 请点击或拖拽 文件夹
  .btn-group.right
    a-button(
      type="primary"
      :disabled="fileList.length !== 1"
      @click="toNext"
    ) 下一步
</template>

<script>
export default {
  name: 'chose-folder',
  computed: {
    folder () {
      return this.$store.state.folder
    }
  },
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove (file) {
      this.fileList = []
      this.$store.dispatch('folderClear')
    },
    beforeUpload (file, fileList) {
      this.fileList = [file]
      this.$store.dispatch('folderAdd', file.path)
      return false
    },
    toNext () {
      this.$store.dispatch('toNext')
      this.$router.push('/model-setting')
    }
  }
}
</script>

<style lang="scss">
.ant-upload.ant-upload-drag{
  width: 50%;
  margin: 0 auto;
  margin-top: 20vh;
}
</style>

