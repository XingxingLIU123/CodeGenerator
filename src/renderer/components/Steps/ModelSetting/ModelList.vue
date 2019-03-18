<template lang="pug">
  a-list.model-list(
    class="model-list"
    size="small"
    bordered
    itemLayout="horizontal"
    :dataSource="modelList"
  )
    a-list-item(
      slot="renderItem"
      slot-scope="item, index"
      :class="item.active ? 'active' : ''"
      @click="changeItem(item, modelList)"
    ) {{item.displayName}}
    div(slot="header")
      a-button(size="small" type="primary" shape="circle" icon="plus" @click="showModel")
    modal(
      :show="modalShow"
      title="添加模型"
      width="50%"
      @close="closeModal"
      @submit="addModel"
    )
      .ant-modal-body(slot="content")
        a-form(:form="form" size="small")
          a-form-item(
            label="模型名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 19 }"
          )
            a-input(v-decorator="['modelName',{rules: [{ required: true, message: '请输入模型名称!' }]}]")
          a-form-item(
            label="模型代码"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 19 }"
          )
            a-input(v-decorator="['modelCode',{rules: [{ required: true, message: '请输入模型代码!' }]}]")
</template>

<script>
import Modal from '../../Modal.vue'
export default {
  name: 'model-list',
  components: {
    Modal
  },
  props: {
    modelList: Array
  },
  data () {
    return {
      modalShow: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    closeModal () {
      this.modalShow = false
    },
    changeItem (item, modelList) {
      this.$emit('changeItemActive', {
        data: modelList,
        item
      })
    },
    addModel () {
      const value = this.form.getFieldsValue()
      this.$emit('addModel', {
        active: false,
        code: value.modelCode,
        displayName: value.modelName
      })
      this.closeModal()
    },
    showModel () {
      this.modalShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.model-list{
  width: 20%;
}
.active{
  background: rgba(24, 144, 255, .7);
  color: #fff;
}
</style>


