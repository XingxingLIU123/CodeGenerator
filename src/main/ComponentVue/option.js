const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const option = {
  setTableOption: model => {
    let op = {}
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
    return op
  },
  setDialogOption: (model) => {
    let op = {}
    op.jsName = `'${stringUpCase(model.code)}Dialog'`
    op.className = `${stringLowCase(model.code)}-dialog`
    op.forms = model.model.forms.map(item => {
      let obj = {
        defaultValue: '',
        html: '',
        displayName: item.displayName,
        name: item.name
      }
      switch (item.dataType) {
        case 'String':
        obj.defaultValue = `''`
        break
        case 'Integer':
        obj.defaultValue = `0`
        break
        case 'Float':
        obj.defaultValue = `0`
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
        obj.html = `el-input(v-model="form.${item.name}")`
        break
        case 'textarea':
        obj.html = `el-input(v-model="form.${item.name}" type="textarea)`
        break
        case 'select':
        obj.html = `el-select(v-model="form.${item.name}")\n  el-option(label="" value="")`
        if (item.dataType === 'FK_Dict') {
          obj.html = `el-select(v-model="form.${item.name}")\n  el-option(v-for="item in DICTS.${item.FK_Dict}" :key="item.value" :label="item.label" :value="item.value")`
        }
        break
        case 'date':
        obj.html = `el-date-picker(v-model="form.${item.name}" type="datetime")`
      }
      return obj
    })
    return op
  }
}
module.exports = option