var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
<% let _fieldUpperName = _name.charAt(0).toUpperCase()+ _name.substr(1, _name.lengh) %>

package com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.service;

import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.entity.<%- _uperName -%>Entity;
import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.repository.<%- _uperName -%>Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class <%- _uperName -%>Service {
    @Autowired
    private <%- _uperName -%>Repository <%- _lowerName -%>Repository;

    @Transactional
    public <%- _uperName -%>Entity get<%- _uperName -%>ById(int id){
      <%- _uperName -%>Entity entity = <%- _lowerName -%>Repository.findById(id).get();
        return entity;
    }
}

`

  const service = {
    temp: temp,
    code: option => {
      return ejs.render(temp, option)
    }
  }
  module.exports = service