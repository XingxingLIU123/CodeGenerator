var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
package com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.service;

import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.entity.<%- _uperName -%>Entity;
import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.repository.<%- _uperName -%>Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.transaction.Transactional;

/**
 * <%- _displayName -%> 模型业务逻辑层
 * Domita
 */
@Service
@Transactional
public class <%- _uperName -%>Service {
    @Autowired
    private <%- _uperName -%>Repository <%- _lowerName -%>Repository;

    /**
     * 更新实体
     */     
    public <%- _uperName -%>Entity get<%- _uperName -%>ById(int id){
      <%- _uperName -%>Entity entity = <%- _lowerName -%>Repository.findById(id).get();
        return entity;
    }

    /**
     * 根据ids批量删除
     */
    public void deleteByIds(List<Integer> ids){
      <%- _lowerName -%>Repository.deleteByIds(ids);
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