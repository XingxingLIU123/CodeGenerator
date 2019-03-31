const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const setOption = (name, model) => {
  const views = model.model.views
  // 创建index.vue文件
  let option = {
    name: `'${model.code}'`,
    component: ``,
    components: ``,
    imports: ``,
    data: [],
    methods: [],
  }
  option.component = (() => {
    let component = []
    views.forEach(view => {
      let str =`    ${stringLowCase(model.code)}-${stringLowCase(view)}`
      switch (view) {
        case 'table':
        str += `(:dataSource="tableData" :page="page" @changePage="changePage" ref="table")`
        option.methods.push(
    `
    /**
     * @description changePage 分页改变事件
     * @param {Object} page 分页对象，包含pageSize和pageNo
     */
    changePage (page) {
      this.page = {...page}
      this.getTableData()
    }`
        )
        option.methods.push(
    `
    /**
     * @description getTableData 获取表格数据
     * @param {null}
     */
    getTableData () {
      let param = {
        query: this.keyWord,
        ...this.page
      }
      // 此处异步获取数据
    }`
        )
        option.data.push(`tableData: []`)
        option.data.push(`page: { pageSize: 20, pageNo: 1, total: 0 }`)
        break;
        case 'dialog':
        str += `(:show="dialogShow" :title="dialogTitle" @close="closeDialog" @ok="submitDialog" :data="dialogData")`
        option.data.push(`dialogShow: false`)
        option.data.push(`dialogData: null`)
        option.data.push(`dialogTitle: ''`)
        option.methods.push(
    `
    /**
     * @description closeDialog 关闭弹窗事件
     * @param {null} 
     */
    closeDialog () {
      // do something here
      this.dialogShow = false
    }`
      )
      option.methods.push(
    `
    /**
     * @description submitDialog 关闭弹窗事件
     * @param {Object} param 提交表单的数据 
     */
    submitDialog (param) {
      // do something here
      this.closeDialog()
      this.getTableData()
    }`
          )
          break
        }
        component.push(str)
      })
      return component.join('\n')
    })()
    option.components = (() => {
      let component = []
      views.forEach(view => {
        component.push(`    ${stringUpCase(model.code)}${stringUpCase(view)}`)
      })
      return component.join(',\n')
    })()
    option.imports = (() => {
      let component = []
      views.forEach(view => {
        component.push(`import ${stringUpCase(model.code)}${stringUpCase(view)} from '@/components/${name}/${stringUpCase(model.code)}/${stringUpCase(model.code)}${stringUpCase(view)}.vue'`)
      })
      return component.join('\n')
    })()
    if (model.model.fn.length > 0) {
      option.fn ={
        fns: {}
      }
      let fn = model.model.fn
      fn.forEach(f => {
        switch (f) {
          case 'query':
          option.fn.query = '      el-input(placeholder="请输入搜索内容" v-model="keyWord")\n        el-button(slot="append" icon="el-icon-search" @click="getTableData")'
          option.data.push(`keyWord: ''`)
          break;
          case 'create':
          option.fn.fns.create = 'el-button(type="primary" @click="createData") 新增\n'
          option.methods.push(
    `
    /**
     * @description createData 新增数据，打开弹窗填写表单
     * @param {null}
     */
    createData () {
      this.dialogData = null
      this.dialogTitle = '新增'
      this.dialogShow = true
    }`
          )
          break;
          case 'update':
          option.fn.fns.update = 'el-button(type="primary" @click="updateData") 编辑\n'
          option.methods.push(
    `
    /**
     * @description updateData 修改数据，打开弹窗填写表单
     * @param {Object} row 行的数据
     */
    updateData (row) {
      this.dialogData = Object.assign({}, row) // 应该修改为选择的数据
      this.dialogTitle = '编辑'
      this.dialogShow = true
    }`
          )
          break;
          case 'delete':
          option.fn.fns.delete = 'el-button(type="danger" @click="deleteData") 删除\n'
          option.methods.push(
    `
    /**
     * @description deleteData 删除数据
     * @param {null}
     */
    deleteData () {
      // do something
      this.getTableData()
    }`
          )
          break;
          case 'batch_delete':
          option.fn.fns.batch_delete = 'el-button(type="danger" @click="batchDeleteData") 批量删除\n'
          option.methods.push(
    `
    /**
     * @description batchDeleteData 批量删除
     * @param {null}
     */
    batchDeleteData () {
      // do something
      this.getTableData()
    }`
          )
          break;
          case 'import':
          option.fn.fns.import = 'el-button(type="primary" @click="importData") 导入\n'
          option.methods.push(
    `
    /**
     * @description importData 批量删除
     * @param {null}
     */
    importData () {
      // do something
    }`
          )
          break;
          case 'export':
          option.fn.fns.export = 'el-button(type="primary" @click="exportData") 导出\n'
          option.methods.push(
    `
    /**
     * @description exportData 批量删除
     * @param {Object} row 导出的行数据 
     */
    exportData (row) {
      // do something
    }`
          )
          break;
          case 'batch_export':
          option.fn.fns.batch_export = 'el-button(type="primary" @click="batchExportData") 批量导出\n'
          break;
        }
      })
    }
    option.data = option.data.join(`,\n      `)
    option.methods = option.methods.join(`,\n`)
    return option
}

module.exports = setOption