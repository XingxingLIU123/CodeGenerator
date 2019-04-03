const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')


/**
 * @description 生成模型页面入口文件
 * @param {Array} modules 模块模型数据
 * @param {String} projectPath 项目路径
 * @param {String} filePath 读写路由配置文件路径
 */
const Router = function (modules, projectPath, filePath) {
  let json = fs.readFileSync(`${projectPath}${filePath}`, 'utf-8')
  let route = JSON.parse(json)
  const routeNames = route.map(n => n.path)
  modules.forEach(module => {
    if (!routeNames.includes(`/${stringLowCase(module.name)}/`)) {
      let obj = {
        path: `/${stringLowCase(module.name)}/`,
        children: [],
        redirect: 'noredirect',
        meta: { title: `${module.title}` }
      }
      module.modelList.forEach(model => {
        obj.children.push({
          pathName: `${stringUpCase(module.name)}/${stringUpCase(model.code)}/index.vue`,
          path: `${stringLowCase(model.code)}`,
          name: `${model.displayName}`,
          meta: {
            title: `${model.displayName}`,
            icon: ''
          }
        })
      })
      if (obj.children.length > 1) {
        obj.alwaysShow = true
      }
      route.push(obj)
    }
  })
  fs.writeFileSync(`${projectPath}${filePath}`, JSON.stringify(route))
}

export default Router