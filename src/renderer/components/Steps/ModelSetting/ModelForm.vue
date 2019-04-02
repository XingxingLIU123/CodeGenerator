<template lang="pug">
  .model-form
    .title 功能项
    el-checkbox-group.item(v-model="fn" size="small")
      //- el-checkbox(label="list") 列表
      el-checkbox(label="query") 检索
      el-checkbox(label="create") 新增
      el-checkbox(label="update") 编辑
      el-checkbox(label="delete") 删除
      el-checkbox(label="batch_delete") 批量删除
      el-checkbox(label="import") 导入
      el-checkbox(label="export") 导出
      el-checkbox(label="batch_export") 批量导出
    .title 视图项
    el-checkbox-group.item(v-model="views" size="small")
      el-checkbox(label="table") 表格
      el-checkbox(label="dialog") 弹框表单
    .title.layout-row
      span 字段项
      a-icon.pointer(type="plus" style="align-self: center;margin-left: 10px" @click="addFiled")
    .item
      el-form(v-for="(form, index) in forms" :model="form" size="small" label-width="120px" inline)
        .title-sub.layout-row
          span 字段{{index + 1}}
          a-icon.pointer(type="close" style="align-self: center;margin-left: 10px" @click="removeFiled(index)")
        el-form-item(label="字段code：" prop="name")
          el-input(v-model="form.name")
        el-form-item(label="字段中文名：" prop="displayName")
          el-input(v-model="form.displayName")
        el-form-item(label="数据类型：" prop="dataType")
          el-select(v-model="form.dataType")
            el-option(v-for="type in types" :key="type.code" :label="type.name" :value="type.code")
        el-form-item(label="模型关联：" prop="FK_Model" v-if="form.dataType === 'FK_Model'")
          el-input(v-model="form.FK_Model" placeholder="请输入模型code")
        el-form-item(label="字典关联：" prop="FK_Dict" v-if="form.dataType === 'FK_Dict'")
          el-input(v-model="form.FK_Dict" placeholder="请输入字典健名")
        el-form-item(label="数据长度：" prop="length")
          el-input(v-model="form.length")
        el-form-item(label="校验类型：" prop="validateType")
          el-select(v-model="form.validateType")
            el-option(label="非空" value="not_null")
            el-option(label="大于0" value="bigthan_zero")
        el-form-item(label="校验内容：" prop="validateOptions")
          el-input(v-model="form.validateOptions")
        el-form-item(label="控件类型：" prop="type")
          el-select(v-model="form.type")
            el-option(label="单行输入框" value="input" v-show="form.dataType !== 'FK_Dict'")
            el-option(label="多行输入框" value="textarea" v-show="form.dataType !== 'FK_Dict'")
            el-option(label="下拉框" value="select")
            el-option(label="日期选择器" value="date" v-show="form.dataType !== 'FK_Dict'")
        el-form-item(label="是否可检索:" value="isSearch")
          el-radio(v-model="form.isSearch" :label="0") 否
          el-radio(v-model="form.isSearch" :label="1") 是
        el-form-item(label="是否可排序:" value="isSort")
          el-radio(v-model="form.isSort" :label="0") 否
          el-radio(v-model="form.isSort" :label="1") 是
        el-form-item(label="是否在表格显示:" value="isShowInTable")
          el-radio(v-model="form.isShowInTable" :label="0") 否
          el-radio(v-model="form.isShowInTable" :label="1") 是
        
    .btn-group
      a-button(@click="reset") 重 置
      a-button(type="primary" style="margin-left: 10px" @click="update") 保 存
</template>

<script>
export default {
  name: 'model-form',
  props: {
    form: Object
  },
  data () {
    return {
      fn: [],
      views: [],
      forms: [],      
      types: [
        {
          code: 'String',
          name: '字符串',
          default_length: 255
        },
        {
          code: 'Integer',
          name: '整形',
          default_length: 20
        },
        {
          code: 'Float',
          name: '浮点',
          default_length: 20
        },
        {
          code: 'Date',
          name: '日期',
          default_length: 255
        },
        {
          code: 'DateTime',
          name: '时间'
        },
        {
          code: 'FK_Dict',
          name: '关联字典'
        },
        {
          code: 'FK_Model',
          name: '关联模型'
        }
      ]
    }
  },
  watch: {
    form: {
      handler: function (val) {
        if (!!val) {
          this.fn = _.cloneDeep(val.fn)
          this.views = _.cloneDeep(val.views)
          this.forms = _.cloneDeep(val.forms)
        }
      },
      deep: true
    }
  },
  methods: {
    reset () {
      if (!!this.form) {
        this.fn = _.cloneDeep(val.fn)
        this.views = _.cloneDeep(val.views)
        this.forms = _.cloneDeep(val.forms)
      } else {
        this.fn = []
        this.views = []
        this.forms = []
      }
    },
    update () {
      this.$emit('update', {
        fn: this.fn,
        views: this.views,
        forms: this.forms
      })
    },
    addFiled () {
      this.forms.push({
        name: '',
        displayName: '',
        dataType: '',
        FK_Model: '',
        FK_Dict: '',
        length: '',
        validateType: '',
        validateOptions: '',
        type: '',
        isSearch: 0,
        isSort: 0,
        isShowInTable: 0
      })
    },
    removeFiled (index) {
      this.forms.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.model-form{
  margin-left: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
  /deep/ .el-form-item{
    width: 46%;
  }
}
.title {
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
}
.title-sub{
  font-size: 16px;
  margin: 5px 0;
}
.item {
  padding: 0 10px;
}
</style>


