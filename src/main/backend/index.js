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

const folderNames = ['controller', 'entity', 'repository', 'service']

const backEnd = (data, path) => {
  // 创建模块目录
  data.forEach(item => {
    fs.mkdir(path + '/' + stringUpCase(item.name), function (err) {
      if (!err) {
        console.log('创建目录' + path + '/' + stringUpCase(item.name) + '成功')
        item.modelList.forEach(m => {
          fs.mkdir(`${path}/${stringUpCase(item.name)}/${stringUpCase(m.code)}`, function() {
            console.log(`创建目录${path}/${stringUpCase(item.name)}/${stringUpCase(m.code)}成功`)
            folderNames.forEach(folder => {
              fs.mkdir(`${path}/${stringUpCase(item.name)}/${stringUpCase(m.code)}/${folder}`, function (e) {
                if (!e) {
                  console.log(`创建目录${path}/${stringUpCase(item.name)}/${stringUpCase(m.code)}/${folder}成功`)
                }
              })
            })
          })
        })
        setTimeout(() => {
          item.modelList.forEach(model => {
            let option = {
              _name: stringUpCase(model.code),
              _displayName: model.displayName,
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