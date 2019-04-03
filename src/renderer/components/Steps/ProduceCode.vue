<template lang="pug">
  div
    el-button(@click="prevStep" size="small") 上一步
    el-button(@click="produceFrontend" type="primary" size="small") 生成前端代码
    el-button(@click="produceBackend" type="primary" size="small") 生成后端代码
    el-dialog(
      title="请选择输入文件夹"
      width="50%"
      :visible.sync="backendModal"
      @close="cancelModal"
    )
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
      .btn
        el-button(@click="produceBackendCode") 确 定
</template>

<script>
const ipc = require('electron').ipcRenderer
export default {
  name: 'produce-code',
  created () {
    let self = this
    ipc.on('produce-front-success', function (event, arg) {
      self.$message.success('前端代码生成成功')      
    })
    ipc.on('produce-backend-success', function (event, arg) {
      self.$message.success('后端代码生成成功')   
      self.backendModal = false   
    })
  },
  data () {
    return {
      backendModal: false,
      path: '',
      fileList: []
    }
  },
  methods: {
    produceFrontend () {
      ipc.send('produce-front', {
        data: this.$store.state.json,
        project: this.$store.state.folder,
        option: this.$store.state.option
      })
    },
    cancelModal () {
      this.backendModal = false
    },
    prevStep () {
      this.$store.dispatch('toPrevious')
      this.$router.push('/model-setting')
    },
    produceBackend () {
      this.backendModal = true
    },
    handleRemove (file) {
      this.fileList = []
      this.path = ''
    },
    beforeUpload (file, fileList) {
      this.fileList = [file]
      this.path = file.path
    },
    produceBackendCode () {
      if (this.path !== '') {
        ipc.send('produce-backend', {
          data: this.$store.state.json,
          project: this.path,
          option: this.$store.state.option
        })
      } else {
        this.$message.error('请选择后端路径')
      }
    }
  }
}
</script>
