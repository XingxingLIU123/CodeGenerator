var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
<% let _fieldUpperName = _name.charAt(0).toUpperCase()+ _name.substr(1, _name.lengh) %>

package com.claymore.fire.<%- _name -%>.repository;

import com.claymore.fire.<%- _name -%>.entity.<%- _fieldUpperName -%>Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface <%- _fieldUpperName -%>Repository extends JpaRepository<<%- _fieldUpperName -%>Entity, Integer>, JpaSpecificationExecutor<<%- _fieldUpperName -%>Entity> {

}

`
  
  const repository = {
    temp: temp,
    code: option => {
      return ejs.render(temp, option)
    }
  }
  module.exports = repository