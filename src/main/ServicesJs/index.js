const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ejs = require('ejs')
/**
 * @description 生成模型页面入口文件
 * @param {Array} modules 模块模型数据
 * @param {String} projectPath 项目路径
 * @param {String} filePath 读写路由配置文件路径
 */
const services = function (modules, projectPath, apiPath) {
  // 创建services文件夹
  fs.mkdir(`${projectPath}${apiPath}`, function () {
    modules.forEach(module => {
      // 创建模块目录
      if (fs.existsSync(`${projectPath}${apiPath}/${stringUpCase(module.name)}`)) {
        console.log(chalk.red(`已存在${projectPath}${apiPath}/${stringUpCase(module.name)}目录, 停止创建services`))
        return false
      }
      fs.mkdirSync(`${projectPath}${apiPath}/${stringUpCase(module.name)}`);
      console.log(chalk.yellow(`创建目录${projectPath}${apiPath}/${stringUpCase(module.name)}成功`))
      // 创建模型services文件
      module.modelList.forEach(model => {
        let option =  {apis: [], apiNames: [] } 
        model.model.fn.forEach(fn => {
          switch (fn) {
            case 'query':
            option.apis.push(`
/**
 * @description 获取表格数据
 * @param {pageNo, pageSize, keywords} 页码 分页大小 搜索词
 * @return getTableData
 */
const getTableData = param => {
  return axios.get('${stringLowCase(module.name)}/${stringLowCase(model.code)}/list', param)
}
`
            )
            option.apiNames.push('getTableData')
            break;
            case 'create':
            option.apis.push(`
/**
 * @description 新增数据
 * @param param 详细字段参数
 * @return addTableData
 */
const addTableData = param => {
  return axios.post('${stringLowCase(module.name)}/${stringLowCase(model.code)}', param)
}
            `)
            option.apiNames.push('addTableData')
            break
            case 'update':
            option.apis.push(`
/**
 * @description 编辑数据
 * @param param 详细字段参数
 * @return updateTableData
 */
const updateTableData = param => {
  return axios.put('${stringLowCase(module.name)}/${stringLowCase(model.code)}', param)
}
            `)
            option.apiNames.push('updateTableData')
            break
            case 'delete':
            option.apis.push(`
/**
 * @description 删除数据
 * @param id id
 * @return deleteTableData
 */
const deleteTableData = id => {
  return axios.delete('${stringLowCase(module.name)}/${stringLowCase(model.code)}/' + id)
}
            `)
            option.apiNames.push('deleteTableData')
            break
            case 'batch_delete':
            option.apis.push(`
/**
 * @description 批量删除数据
 * @param ids id数组
 * @return BatchDeleteTableData
 */
const BatchDeleteTableData = ids => {
  return axios.post('${stringLowCase(module.name)}/${stringLowCase(model.code)}', ids)
}
            `)
            option.apiNames.push('BatchDeleteTableData')
            break
            case 'import':
            option.apis.push(`
/**
 * @description 导入数据
 * @return importTableData
 */
// const importTableData = ids => {
//   return axios.delete('${stringLowCase(module.name)}/${stringLowCase(model.code)}/list', ids)
// }
            `)
            break
            option.apiNames.push('importTableData')
            case 'export':
            option.apis.push(`
/**
 * @description 导出数据
 * @return exportTableData
 */
const exportTableData = ids => {
//   return axios.delete('${stringLowCase(module.name)}/${stringLowCase(model.code)}/list', ids)
}
            `)
            option.apiNames.push('exportTableData')
            break
            case 'batch_export':
            option.apis.push(`
/**
 * @description 批量导出数据
 * @return exportTableData
 */
const batchExportTableData = ids => {
//   return axios.delete('${stringLowCase(module.name)}/${stringLowCase(model.code)}/list', ids)
}
            `)
            option.apiNames.push('batchExportTableData')
            break
          }
          const str = fs.readFileSync(path.join(__dirname, './template.services.ejs'), 'utf8')
          const template = ejs.render(str, option)
          fs.writeFileSync(`${projectPath}${apiPath}/${stringUpCase(module.name)}/${stringUpCase(model.code)}.js`, template)
        })
      })
    })
  })
}

module.exports = services