var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
<% let _fieldUpperName = _name.charAt(0).toUpperCase()+ _name.substr(1, _name.lengh) %>

package com.claymore.fire.<%- _name -%>.service;

import com.claymore.fire.<%- _name -%>.entity.<%- _fieldUpperName -%>Entity;
import com.claymore.fire.<%- _name -%>.repository.<%- _fieldUpperName -%>Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class <%- _fieldUpperName -%>Service {
    @Autowired
    private <%- _fieldUpperName -%>Repository <%- _name -%>Repository;

    @Transactional
    public <%- _fieldUpperName -%>Entity get<%- _fieldUpperName -%>ById(int id){
      <%- _fieldUpperName -%>Entity entity = <%- _name -%>Repository.findById(id).get();
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