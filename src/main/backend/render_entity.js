var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
package com.claymore.fire.<%- _name -%>.entity;

import javax.persistence.*;

/**
 * <%- _displayName -%>实体模型
 */
@Entity
@Table(name = "<%- _name -%>")
public class StudentEntity {
    private int id;

  <%for (let i = 0; i < _fields.length;i ++) { -%>
    <% let _field = _fields[i] %>
    // <%- _field._displayName -%>

    private <%- _field._dataType._code -%> <%- _field._name -%>;
  <%}-%>    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    <%for (let i = 0; i < _fields.length;i ++) { -%>
      <% let _field = _fields[i] %>
      <% let _fieldUpperName = _field._name.charAt(0).toUpperCase()+ _field._name.substr(1,_field._name.lengh) %>
      // <%- _field._displayName -%>

      @Basic
      @Column(name = "<%- _field._name -%>", nullable = true, length = 45)
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