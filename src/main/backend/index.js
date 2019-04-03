const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ejs = require('ejs')

const controller = require('./render_controller')
const entity = require('./render_entity')
const repository = require('./render_repository')
const service = require('./render_service')
const patchsql = require('./render_patchsql')

const folderNames = ['controller', 'entity', 'repository', 'service', 'patchsql']

const backEnd = (data, path) => {
  console.error(path)
  console.error(data)
  // 创建模块目录
  data.forEach(item => {
    fs.mkdir(path + '/' + stringLowCase(item.name), function (err) {
      if (!err) {
        console.log('创建目录' + path + '/' + stringLowCase(item.name) + '成功')
        item.modelList.forEach(m => {
          fs.mkdir(`${path}/${stringLowCase(item.name)}/${stringLowCase(m.code)}`, function() {
            console.log(`创建目录${path}/${stringLowCase(item.name)}/${stringLowCase(m.code)}成功`)
            folderNames.forEach(folder => {
              fs.mkdir(`${path}/${stringLowCase(item.name)}/${stringLowCase(m.code)}/${folder}`, function (e) {
                if (!e) {
                  console.log(`创建目录${path}/${stringLowCase(item.name)}/${stringLowCase(m.code)}/${folder}成功`)
                }
              })
            })
          })
        })
        setTimeout(() => {
          item.modelList.forEach(model => {
            let option = {
              // 模块名
              _moduleName: item.name,
              // 模型英文名
              _name: stringUpCase(model.code),
              // 模型首字母大写名
              _uperName: stringUpCase(model.code),
              // 模型首字母小写名
              _lowerName: stringLowCase(model.code),
              // 展示名，用于备注及注释
              _displayName: model.displayName,              
              _fns: model.model.fn,
              // 字段
              _fields: model.model.forms.map(f => {
                return {
                  _name: f.name,
                  _dataType: {
                    _code: f.dataType
                  },
                  _displayName: f.displayName
                }
              })
            }
            console.log('=============-------=============')
            console.log(option)
            folderNames.forEach(folder => {
              let str = ''
              switch (folder) {
                case 'controller':
                str = controller.code(option)
                break;
                case 'entity':
                str = entity.code(option)
                break
                case 'repository':
                str = repository.code(option)
                break
                case 'service':
                str = service.code(option)
                break
                case 'patchsql':
                str = patchsql.code(option)
              }
              const file = fs.writeFileSync(`${path}/${stringUpCase(item.name)}/${stringUpCase(model.code)}/${folder}/${stringUpCase(model.code)}${stringUpCase(folder)}.java`, str)
            })
          })
        }, 2000)
      }
    })
  })
}

module.exports = backEnd