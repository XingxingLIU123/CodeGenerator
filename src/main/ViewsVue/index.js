const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ejs = require('ejs')

const setOption = require('./option')

const view = function ( json, pathName, callback ) {
  let str = fs.readFileSync(path.join(__dirname, './template.ejs'), 'utf8');
  
  // 获取项目views/pages目录结构
  const files = fs.readdirSync(pathName + '/src/views/pages')

  const createFile = (item, model) => {
    fs.mkdir(`${pathName}/src/views/pages/${item.name}/${stringUpCase(model.code)}`, function (err) {
      if (!err) {
        // 创建index.vue 入口文件
        const option = setOption(model)
        let viewTemp = ejs.render(str, option)
        const modelIndex = fs.writeFileSync(`${pathName}/src/views/pages/${item.name}/${stringUpCase(model.code)}/index.vue`, viewTemp)
        // 创建views组件
        callback(model, `${pathName}/src/views/pages/${item.name}/${stringUpCase(model.code)}`)
      }
    })
  }

  json.forEach(item => {
    // 是否存在模块目录 
    if (files.includes(item.name)) {
      console.log(chalk.yellow(item.name + '目录已存在, 检测是否有新增子模型'))
      // 检查子目录是否存在
      const childFiles = fs.readdirSync(pathName + '/src/views/pages/' + item.name)
      let isNewFlag = false
      item.modelList.forEach(model => {
        if (childFiles.includes(stringUpCase(model.code))) {
          console.log(chalk.yellow(`存在子模型${stringUpCase(model.code)}, 无法生成该模型代码`))
        } else {
          createFile(item, model)
        }
      })
    } else {
      fs.mkdir(pathName + '/src/views/pages/' + item.name, function (err) {
        if (!err) {
          // 创建父级目录成功、创建模型目录
          item.modelList.forEach(model => {
            createFile(item, model)
          })
        }
      })
    }
  })
}

module.exports = view
