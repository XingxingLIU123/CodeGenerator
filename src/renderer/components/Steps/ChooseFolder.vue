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
  el-form(:model="option" size="small" inline label-width="130px")
    el-form-item(label="页面入口目录")
      el-input(v-model="option.main")
    el-form-item(label="组件目录")
      el-input(v-model="option.component")
    el-form-item(label="路由配置文件地址")
      el-input(v-model="option.routePath")
    el-form-item(label="api接口文件目录")
      el-input(v-model="option.apiPath")
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
      fileList: [],
      option: {
        main: '/src/views/pages',
        component: '/src/components',
        routePath: '/src/router/router.json',
        apiPath: '/src/services'
      }
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
      this.$store.dispatch('updateOption', this.option)
      this.$router.push('/model-setting')
    }
  }
}
</script>

<style lang="scss">
.ant-upload.ant-upload-drag{
  width: 50%;
  margin: 0 auto;
  margin-top: 5vh;
}
</style>

