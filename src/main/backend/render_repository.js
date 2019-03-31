var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
<% let _fieldUpperName = _name.charAt(0).toUpperCase()+ _name.substr(1, _name.lengh) %>

package com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.repository;

import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.entity.<%- _uperName -%>Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface <%- _uperName -%>Repository extends JpaRepository<<%- _uperName -%>Entity, Integer>, JpaSpecificationExecutor<<%- _uperName -%>Entity> {

}

`
  
  const repository = {
    temp: temp,
    code: option => {
      return ejs.render(temp, option)
    }
  }
  module.exports = repository