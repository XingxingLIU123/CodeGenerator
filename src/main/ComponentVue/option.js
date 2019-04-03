const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const option = {
  setTableOption: model => {
    let op = {}
    op.handles = []
    op.jsName = `'${stringUpCase(model.code)}Table'`
    op.className = `${stringLowCase(model.code)}-table`
    op.columns = model.model.forms.map(item => {
      if (item.isShowInTable) {
        return {
          displayName: item.displayName,
          name: item.name
        }
      }
    })
    model.model.fn.forEach(item => {
      switch (item) {
        case 'update':
          op.handles.push({
            text: '编辑',
            type: 'primary',
            eval: "$emit('updateRow', scope.row)"
          })
          break
        case 'delete':
          op.handles.push({
            text: '删除',
            type: 'danger',
            eval: "$emit('deleteRow', scope.row)"
          })
          break
        case 'export':
          op.handles.push({
            text: '导出',
            type: 'primary',
            eval: "$emit('exportRow', scope.row)"
          })
          break
      }
    })
    return op
  },
  setDialogOption: model => {
    let op = {}
    op.jsName = `'${stringUpCase(model.code)}Dialog'`
    op.className = `${stringLowCase(model.code)}-dialog`
    op.forms = model.model.forms.map(item => {
      let obj = {
        defaultValue: '',
        html: '',
        rules: [],
        displayName: item.displayName,
        name: item.name,
        methods: []
      }
      if (item.isRequired) {
        obj.rules.push({ required: true, message: `${item.displayName}不能为空`})
      }
      switch (item.dataType) {
        case 'String':
        obj.defaultValue = `''`
        break
        case 'Integer':
        obj.defaultValue = `0`
        obj.rules.push({ type: 'number', message: `${item.displayName}必须为数字`})
        break
        case 'Float':
        obj.defaultValue = `0`
        obj.rules.push({ type: 'number', message: `${item.displayName}必须为数字`})
        break
        case 'Date':
        obj.defaultValue = new Date()
        break
        case 'DateTime':
        obj.defaultValue = new Date()
        break
        default:
        obj.defaultValue = `''`
        break
      }
      switch (item.type) {
        case 'input':
        obj.html = `el-input(v-model="form.${item.name}" size="small")`
        break
        case 'textarea':
        obj.html = `el-input(v-model="form.${item.name}" size="small" type="textarea)`
        break
        case 'select':
        obj.html = `el-select(v-model="form.${item.name}" size="small")\n  el-option(label="" value="")`
        if (item.dataType === 'FK_Dict') {
          obj.html = `el-select(v-model="form.${item.name}" size="small")\n        el-option(v-for="item in DICTS.${item.FK_Dict.split('-')[0]}.dicts" :key="item.id" :label="item.dictValueDisplayName" :value="item.dictValue")`
        }
        if (item.dataType === 'FK_Model') {
          obj.methods(
            `
            /**
             * @description get${stringUpCase(item.FK_Model)}Data 获取${item.displayName}数据
             * @param {null}
             */
            get${stringUpCase(item.FK_Model)}Data () {
              this.$http.get('')
            }
            `
          )
          obj.html = `el-select(v-model="form.${item.name}" size="small")\n        el-option(v-for="item in DICTS.${item.FK_Model}.dicts" :key="item.id" :label="item.dictValueDisplayName" :value="item.dictValue")`
        }
        break
        case 'date':
        obj.html = `el-date-picker(v-model="form.${item.name}" size="small" type="datetime")`
      }
      obj.rules = JSON.stringify(obj.rules)
      return obj
    })
    return op
  }
}
export default option