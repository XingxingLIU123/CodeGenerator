<template lang="pug">
.flex.layout-column__between
  .add.right
    a-button(@click="add" type="primary") 添加模块
  modal(
    title="请输入模块名称"
    width="50%"
    :show="modalVisible"
    @submit="addTab"
    @close="cancelModal"
  )
    .ant-modal-body(slot="content")
      a-input(placeholder="请输入模块名称" v-model="newTabName")
  a-tabs.flex.layout-column.model-tabs(
    hideAdd
    size="small"
    v-model="activeTab"
    type="editable-card"
    @edit="onEdit"
  )
    a-tab-pane(
      v-for="pane in panes"
      :tab="pane.title"
      :key="pane.key"
      :closeable="false"
    ) 
      .layout-row.flex.full-view
        model-list(
          :modelList="pane.modelList"
          @changeItemActive="changeItemActive"
          @addModel="addModel"
        )
        model-form.flex.layout-column__scroll
  .btn-group.right
    a-button(
      style="margin-right: 10px;"
      @click="toPrevious"
    ) 上一步
    a-button(
      type="primary"
      @click="toNext"
    ) 下一步
</template>

<script>
import Modal from '../../Modal.vue'
import ModelList from './ModelList'
import ModelForm from './ModelForm'
export default {
  name: 'model-setting',
  components: {
    ModelList,
    ModelForm,
    Modal
  },
  data () {
    return {
      modalVisible: false,
      activeTab: 0,
      panes: [
        {
          title: '骨干人员',
          key: 0,
          modelList: [
            {
              code: 'abc',
              displayName: 'ABC',
              active: true
            },
            {
              code: 'aaa',
              displayName: 'AAA',
              active: false
            }
          ]
        }
      ],
      newTabName: ''
    }
  },
  methods: {
    addModel (data) {
      this.panes[this.activeTab].modelList.push(data)
    },
    changeItemActive (data) {
      data.data.map(item => {
        item.active = false
      })
      data.item.active = true
    },
    onEdit (targetKey, action) {
      console.log(targetKey, action)
      this[action](targetKey)
    },
    addTab () {
      const key = this.panes.length
      this.panes.push({
        title: this.newTabName,
        modelList: []
      })
      this.cancelModal()
      this.$nextTick(() => {
        this.activeTab = this.panes.length - 1
      })
    },
    cancelModal () {
      this.modalVisible = false
      this.newTabName = ''
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
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey
    },
    toNext () {
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
  /deep/ .ant-tabs-content{
    flex: 1;
    width: 100%;
    height: 100%;
    .ant-tabs-tabpane{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

