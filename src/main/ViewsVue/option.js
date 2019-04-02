const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const setOption = (name, model, title) => {
  const views = model.model.views
  const fns = model.model.fn
  // 创建index.vue文件
  let option = {
    name: `'${model.code}'`,
    component: ``, // template 中组件
    components: ``, // js 中注册组件
    imports: ``, // import 引入的组件
    data: [], // js中data数据
    methods: [], // js中方法
    services: [], // apis,
    title: title
  }
  option.component = (() => {
    let component = []
    // 生成apis数据
    option.services = (() => {
      let apis = []
      let MAP_SERVICES = {
        query: 'getTableData',
        create: 'addTableData',
        update: 'updateTableData',
        delete: 'deleteTableData',
        batch_delete: 'BatchDeleteTableData',
        import: 'importTableData',
        export: 'exportTableData',
        batch_export: 'BatchExportTableData'
      }
      fns.forEach(fn => {
        apis.push(MAP_SERVICES[fn])
      })
      return `import { ${apis.join(', ')} } from '@/services/${stringUpCase(name)}/${stringUpCase(model.code)}'`
    })()

    // 视图项
    views.forEach(view => {
      // index.vue中template模版
      let str =`    ${stringLowCase(model.code)}-${stringLowCase(view)}` // 主容器
      switch (view) {
        case 'table':
        str += `(:dataSource="tableData" :page="page" @changePage="changePage" @selectionChange="selectionChange" ref="table" v-loading="isTableLoading")`
        option.methods.push(
    `
    /**
     * @description selectionChange 表格勾选改变事件
     * @param {Array} rows 勾选的数据
     */
    selectionChange (rows) {
      this.selectionRows = rows
    }`
        )
        // 添加分页事件
        option.methods.push(
    `
    /**
     * @description changePage 分页改变事件, 重新获取表格数据
     * @param {Object} page 分页对象，包含pageSize和pageNo
     */
    changePage (page) {
      this.page = {...page}
      this.getTableData()
    }`
        )
        // 添加获取表格事件
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
      this.isTableLoading = true // 打开loading
      getTableData(param).then(res => {
        this.$nextTick(() => { this.isTableLoading = false }) // 关闭loading
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows // 表格赋值
          this.page.total = res.data.data.total // page总数赋值
        } else {
          this.$message.error('获取表格数据失败')
        }
      }).catch(e => {
        this.$message.error('获取表格数据失败')
      })
    }`
        )
        // 添加表格相关数据
        option.data.push(`tableData: []`)
        option.data.push(`page: { pageSize: 20, pageNo: 1, total: 0 }`)
        option.data.push(`isTableLoading: false`)
        option.data.push(`selectionRows: []`)
        break;

        case 'dialog':
        // 添加dialog组件数据
        str += `(:show="dialogShow" :title="dialogTitle" @close="closeDialog" @ok="submitDialog" :data="dialogData")`
        // 添加dialog data 数据
        option.data.push(`dialogShow: false`)
        option.data.push(`dialogData: null`)
        option.data.push(`dialogTitle: ''`)
        option.data.push(`dialogType: 'add'`)
        // 添加dialog 关闭事件
        option.methods.push(
    `
    /**
     * @description closeDialog 关闭弹窗事件,重置弹窗数据
     * @param {null} 
     */
    closeDialog () {
      this.dialogData = null
      this.dialogShow = false
    }`
      )
      // 添加dialog提交事件
      option.methods.push(
    `
    /**
     * @description submitDialog 关闭弹窗事件
     * @param {Object} param 提交表单的数据 
     */
    submitDialog (param) {
      let method = this.dialogType === 'add' ? addTableData : updateTableData
      method(param).then(res => {
        if (res.data.code === 200) {
          this.$message.success(this.dialogType === 'add' ? '添加数据成功' : '修改数据成功')
          this.closeDialog()
          this.getTableData()
        } else {
          this.$message.error(this.dialogType === 'add' ? '添加数据失败' : '修改数据失败')
        }
      }).catch(e => {
        this.$message.error(this.dialogType === 'add' ? '添加数据失败' : '修改数据失败')
      })
    }`
          )
          break
        }
        component.push(str)
      })
      return component.join('\n')
    })()
    // 设置js 中注册组件
    option.components = (() => {
      let component = []
      views.forEach(view => {
        component.push(`    ${stringUpCase(model.code)}${stringUpCase(view)}`)
      })
      return component.join(',\n')
    })()
    // 设置js 中import内容
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
          option.fn.fns.update = 'el-button(type="primary" @click="updateData" :disabled="selectionRows.length !== 1") 编辑\n'
          option.methods.push(
    `
    /**
     * @description updateData 修改数据，打开弹窗填写表单
     * @param {Object} row 勾选的数据（只有一个）
     */
    updateData () {
      this.dialogData = Object.assign({}, this.selectionRows[0])
      this.dialogTitle = '编辑'
      this.dialogShow = true
    }`
          )
          break;
          case 'delete':
          option.fn.fns.delete = 'el-button(type="danger" @click="deleteData" :disabled="selectionRows.length === 0") 删除\n'
          option.methods.push(
    `
    /**
     * @description deleteData 删除数据
     * @param {null}
     */
    deleteData () {
      let ids = this.selectionRows.map(n => n.id)
      deleteTableData(ids).then(res => {
        if (res.data.code === 200) {
          this.$message.success('数据删除成功')
          this.getTableData()
        } else {
          this.$message.error('数据删除失败')
        }
      }).catch(e => {
        this.$message.error('数据删除失败, 请稍后再试')
      })
    }`
          )
          break;
          case 'batch_delete':
          option.fn.fns.batch_delete = 'el-button(type="danger" @click="batchDeleteData" :disabled="selectionRows.length === 0") 批量删除\n'
          option.methods.push(
    `
    /**
     * @description batchDeleteData 批量删除
     * @param {null}
     */
    batchDeleteData () {
      let ids = this.selectionRows.map(n => n.id)
      BatchDeleteTableData(ids).then(res => {
        if (res.data.code === 200) {
          this.$message.success('数据删除成功')
          this.getTableData()
        } else {
          this.$message.error('数据删除失败')
        }
      }).catch(e => {
        this.$message.error('数据删除失败, 请稍后再试')
      })
    }`
          )
          break;
          case 'import':
          option.fn.fns.import = 'el-button(type="primary" @click="importData") 导入\n'
          option.methods.push(
    `
    /**
     * @description importData 导入
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