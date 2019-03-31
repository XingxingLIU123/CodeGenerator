var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
package com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.entity;

import javax.persistence.*;
import lombok.Data;
import com.domita.backend.common.entity.BaseEntity;

/**
 * <%- _displayName -%>实体模型
 * Domita
 */
@Entity
@Table(name = "<%- _lowerName -%>")
@Data
public class <%- _uperName -%>Entity extends BaseEntity {
  <%for (let i = 0; i < _fields.length;i ++) { -%>
    <% let _field = _fields[i] %>
    // <%- _field._displayName -%>

    private <%- _field._dataType._code -%> <%- _field._name -%>;
  <%}-%> 

  <%for (let i = 0; i < _fields.length;i ++) { -%>
    <% let _field = _fields[i] %>
    <% let _fieldUpperName = _field._name.charAt(0).toUpperCase()+ _field._name.substr(1,_field._name.lengh) %>
    // <%- _field._displayName -%>

    @Basic
    @Column(name = "<%- _field._name -%>")
    public <%- _field._dataType._code -%> get<%- _fieldUpperName -%>() {
        return <%- _field._name -%>;
    }

    public void set<%- _fieldUpperName -%>(<%- _field._dataType._code -%> <%- _field._name -%>) {
        this.<%- _field._name -%> = <%- _field._name -%>;
    }      
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