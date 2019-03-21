<template lang="pug">
.flex.layout-column__between
  el-dialog(
    title="请输入模块名称"
    width="50%"
    :visible.sync="modalVisible"
    @close="cancelModal"
  )
    el-input(placeholder="请输入模块中文名" size="small" v-model="newTabName" style="margin-bottom: 20px;")
    el-input(placeholder="请输入模块英文名, 建议首字母大写并采用驼峰写法" size="small" v-model="newTabNameEn")
    span.dialog-footer(slot="footer")
      el-button(@click="cancelModal" size="small") 取 消
      el-button(@click="addTab" type="primary" size="small") 确 定
  </span>
  el-tabs.flex.layout-column.model-tabs(
    closable
    addable
    v-model="activeTab"
    type="card"
    @tab-remove="removeTab"
    @edit="handleTabsEdit"
  )
    el-tab-pane(
      v-for="pane in panes"
      :label="pane.title"
      :name="pane.title"
      :closable="true"
    ) 
      .layout-row.flex.full-view
        model-list(
          :modelList="pane.modelList"
          @changeItemActive="changeItemActive"
          @addModel="addModel"
        )
        model-form(
          :form="form"
          v-show="!!form"
          @update="updateModel"
        )
  .btn-group.right
    a-button(
      style="margin-right: 10px;"
      @click="toPrevious"
    ) 上一步
    a-button(
      type="primary"
      @click="toNext"
      :disabled="panes.length === 0"
    ) 下一步
</template>

<script>
import ModelList from './ModelList'
import ModelForm from './ModelForm'
export default {
  name: 'model-setting',
  components: {
    ModelList,
    ModelForm
  },
  data () {
    return {
      modalVisible: false,
      activeTab: '',
      panes: [],
      newTabName: '',
      newTabNameEn: '',
      form: null
    }
  },
  
  watch: {
    panes: {
      handler: function (val) {
        if (val.length === 0) {
          this.form = null
          return false
        }
        this.$nextTick(() => {
          let pane = val.find((n) => n.title === this.activeTab)
          if (!pane.modelList[0]) {
            this.form = null
          } else {
            pane.modelList.map(item => {
              if (item.active) {
                this.form = _.cloneDeep(item.model)
              }
            })
          }
        })
      },
      deep: true
    }
  },
  methods: {
    updateModel (form) {
      let pane = this.panes.find((n) => n.title === this.activeTab)
      let model = pane.modelList.find((n) => n.active)
      model.model = _.cloneDeep(form)
      this.$message.success('模型配置成功')
    },
    addModel (data) {
      let item = this.panes.find((n) => n.title === this.activeTab)
      item.modelList.forEach(model => {
        model.active = false
      })
      data.active = true
      item.modelList.push(data)
    },
    changeItemActive (data) {
      data.data.map(item => {
        item.active = false
      })
      data.item.active = true
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        this.add()
      }
    },
    removeTab (name) {
      const index = this.panes.findIndex((n) => n.title = name)
      this.panes.splice(index, 1)
    },
    addTab () {
      this.panes.push({
        title: this.newTabName,
        name: this.newTabNameEn,
        modelList: []
      })
      this.cancelModal()
      this.$nextTick(() => {
        this.activeTab = this.panes[this.panes.length - 1].title
      })
    },
    cancelModal () {
      this.modalVisible = false
      this.newTabName = ''
      this.newTabNameEn = ''
    },
    add () {
      this.modalVisible = true
    },
    toPrevious () {
      this.$store.dispatch('toPrevious')
      this.$router.push({
        path: '/choose-folder',
        name: 'choose-folder',
        params: {
          isSetFileList: true
        }
      })
    },
    toNext () {
      this.$store.dispatch('updateJson', this.panes)
      this.$store.dispatch('toNext')
      this.$router.push('/produce-code')
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  width: fit-content;
  position: absolute;
  right: 15px;
  z-index: 101;
}
.model-tabs {
  /deep/ .el-tabs__content{
    flex: 1;
    width: 100%;
    height: 100%;
    .el-tab-pane{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

