var ejs = require('ejs'),
    _ = require('lodash')

let PERMISSION = {
  query : '检索',
  create: '新增',
  update: '更新',
  delete: '删除',
  batch_delete: '批量删除',
  import: '导入',
  export: '导出',
  batch_export: '批量导出'
}
let temp = `
<%for (let i = 0; i < _fns.length;i ++) { %>
  <% let _fn = _fns[i] %>
  // <%- _fn -%>
  
  INSERT INTO test_backend.menu_info (menu_desc, name, path, permission, viewable) VALUES ('<%- PERMISSION{_fn} -%>', '<%- PERMISSION{_fn} -%>', NULL, '_modelName:<%- _fn -%>',  1);

<%}%>
`

  const service = {
    temp: temp,
    code: option => {
      return ejs.render(temp, option)
    }
  }
  module.exports = service