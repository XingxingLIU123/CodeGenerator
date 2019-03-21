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
    .pointer(slot="header" @click="showModel")
      a-icon(type="plus")
      span 添加模型
    el-dialog(
      :visible.sync="modalShow"
      @close="closeModal"
      title="添加模型"
      width="50%"
    )
      el-form(:model="form" size="small" label-width="120px")
        el-form-item(
          label="模型名称："
          prop="displayName"
          required
        )
          el-input(v-model="form.displayName")
        el-form-item(
          label="模型代码"
          prop="code"
          required
        )
          el-input(v-model="form.code" placeholder="建议首字母大写并采用驼峰写法")
      span.dialog-footer(slot="footer")
        el-button(@click="closeModal" size="small") 取 消
        el-button(@click="addModel" type="primary" size="small") 确 定
</template>

<script>
export default {
  name: 'model-list',
  props: {
    modelList: Array
  },
  data () {
    return {
      modalShow: false,
      form: {
        displayName: '',
        code: ''
      }
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
      this.$emit('addModel', {
        active: false,
        model: {
          fn: [],
          views: [],
          forms: [],
        },
        ...this.form
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


