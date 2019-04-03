var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
package com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.domain;

import lombok.Data;
improt com.domita.backend.base.dict.domain.DictModel;

/**
 * <%- _displayName -%> Domain模型
 * Domita
 */
@Data
public class <%- _uperName -%>Model {
  <%for (let i = 0; i < _fields.length;i ++) { -%>
    <% let _field = _fields[i] %>
    <% if(['create_time', 'update_time'].indexOf(_field._name) >= 0) { %>
      <% continue; %>
    <% } %>
    // <%- _field._displayName -%>
    <% if(_field._dataType._code === 'FK_Dict'){_field._dataType._code = 'DictModel'} %>
    private <%- _field._dataType._code -%> <%- _field._name -%>;
  <%}-%>   
}
`
  const entity = {
    temp: temp,
    code: option => {
      return ejs.render(temp, option)
    }
  }
  module.exports = entity