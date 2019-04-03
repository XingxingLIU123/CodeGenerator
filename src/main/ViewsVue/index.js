const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ejs = require('ejs')

const setOption = require('./option')
/**
 * @description 生成模型页面入口文件
 * @param {Array} modules 模块模型数据
 * @param {String} projectPath 项目路径
 * @param {String} option 页面入口和组件入口路径配置
 * @param {Function} callback 创建完成回调函数
 */
const view = function ( modules, projectPath, option, callback ) {
  // 模版
  let template = fs.readFileSync(path.join(__dirname, './template.ejs'), 'utf8');
  // 判断是否存在入口目录
  if (!fs.existsSync(`${projectPath}${option.main}`)) {
    console.log('不存在页面入口目录，即将添加目录')
    fs.mkdirSync(`${projectPath}${option.main}`)
  }
  // 获取项目views/pages目录结构
  const files = fs.readdirSync(projectPath + option.main)

  // 创建文件方法
  const createFile = (item, model) => {
    fs.mkdir(`${projectPath}${option.main}/${item.name}/${stringUpCase(model.code)}`, function (err) {
      if (!err) {
        // 创建index.vue 入口文件
        const param = setOption(stringUpCase(item.name), model, item.title)
        let viewTemp = ejs.render(template, param)
        const modelIndex = fs.writeFileSync(`${projectPath}${option.main}/${item.name}/${stringUpCase(model.code)}/index.vue`, viewTemp)
        fs.mkdir(`${projectPath}${option.component}/${stringUpCase(item.name)}/${stringUpCase(model.code)}`, function (err) {
          // 创建views组件
          callback(model, `${projectPath}${option.component}/${stringUpCase(item.name)}/${stringUpCase(model.code)}`)
        })
      }
    })
  }

  modules.forEach(module => {
    // 是否存在模块目录 
    if (files.includes(module.name)) {
      console.log(chalk.yellow(module.name + '目录已存在, 检测是否有新增子模型'))
      // 检查子目录是否存在
      const childFiles = fs.readdirSync(`${projectPath}${option.main}/${module.name}`)
      module.modelList.forEach(model => {
        if (childFiles.includes(stringUpCase(model.code))) {
          console.log(chalk.yellow(`存在子模型${stringUpCase(model.code)}, 无法生成该模型代码`))
        } else {
          createFile(module, model)
        }
      })
    } else {
      fs.mkdir(`${projectPath}${option.component}/${stringUpCase(module.name)}`, function (err) {
        if (!err) {
          fs.mkdir(`${projectPath}${option.main}/${stringUpCase(module.name)}`, function (e) {
            if (!e) {
              // 创建父级目录成功、创建模型目录
              module.modelList.forEach(model => {
                createFile(module, model)
              })
            }
          })
        }
      })
    }
  })
}

module.exports = view
