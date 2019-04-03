
const path = require('path')
const option = require('./option')
const fs = require('fs')
const ejs = require('ejs')

const stringUpCase = str => str.replace(str[0],str[0].toUpperCase());
const stringLowCase = str => str.replace(str[0],str[0].toLowerCase());

const component = (model, pathName) => {
  model.model.views.forEach(item => {
    let op = null
    switch (item) {
      case 'table':
      op = option.default.setTableOption(model)
      break
      case 'dialog':
      op = option.default.setDialogOption(model)
    }
    let str = fs.readFileSync(path.join(__dirname, `./template.${item}.ejs`), 'utf8');
    let viewTemp = ejs.render(str, op)
    const comVue = fs.writeFileSync(`${pathName}/${stringUpCase(model.code)}${stringUpCase(item)}.vue`, viewTemp)
  })
}
module.exports = component