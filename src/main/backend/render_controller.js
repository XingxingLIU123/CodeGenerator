var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
<% let _fieldUpperName = _name.charAt(0).toUpperCase()+ _name.substr(1, _name.lengh) %>

package com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.controller;

import com.domita.backend.common.domain.BaseResponse;
import com.domita.backend.common.domain.PageResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.entity.<%- _uperName -%>Entity;
import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.repository.<%- _uperName -%>Repository;
import com.domita.backend.businese.<%- _moduleName -%>.<%- _lowerName -%>.service.<%- _uperName -%>Service;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/<%- _lowerName -%>")
public class <%- _uperName -%>Controller {

    @Autowired
    private <%- _uperName -%>Service <%- _lowerName -%>Service;

    @Autowired
    private <%- _uperName -%>Repository <%- _lowerName -%>Repository;    


    /**
     * 返回所有列表
     * 
     */
    @GetMapping("/list")
    @ApiOperation("query all <%- _uperName -%>")
    public BaseResponse<List<<%- _uperName -%>Entity>> list() {
        Sort sort = new Sort(Sort.Direction.DESC,"id");
        List<<%- _uperName -%>Entity> all = <%- _lowerName -%>Repository.findAll(sort);
        return new BaseResponse(all);
    }

    /**
     * 创建实体模型
     * 
     */
    @PostMapping
    @ApiOperation("create <%- _uperName -%>")
    public BaseResponse create(@RequestBody <%- _uperName -%>Entity <%- _lowerName -%>) {
      <%- _lowerName -%>Repository.save(<%- _lowerName -%>);
        return BaseResponse.instance();
    }

    /**
     * 根据Id获取详细信息
     * 
     */
    @GetMapping("/{id}")
    @ApiOperation(value = "query <%- _uperName -%>Entity info with id", consumes = "GET", response = <%- _uperName -%>Entity.class)
    public BaseResponse<<%- _uperName -%>Entity> findById(@PathVariable("id") Integer id) {
        return new BaseResponse<>(<%- _lowerName -%>Repository.findById(id).get());
    }

    /**
     * 根据id删除实体
     * 
     */
    @DeleteMapping("/{id}")
    public BaseResponse delete(@PathVariable("id") Integer id) {
      <%- _lowerName -%>Repository.deleteById(id);
      return new BaseResponse();
    }    

    /**
     * 获取分页列表
     * 
     */
    @GetMapping("/pagelist/{pageSize}/{pageNo}")
    @ApiOperation("query <%- _uperName -%> by page")
    public BaseResponse<PageResult<<%- _uperName -%>Entity>> page(@PathVariable("pageSize") int pageSize, @PathVariable("pageNo") int pageNo) {
        Page<<%- _uperName -%>Entity> page = <%- _lowerName -%>Repository.findAll(PageRequest.of(pageNo - 1, pageSize, Sort.Direction.DESC,"id"));
        PageResult<<%- _uperName -%>Entity> result = new PageResult<<%- _uperName -%>Entity>();
        result.setContent(page.getContent());
        result.setPageNo(pageNo);
        result.setPageSize(pageSize);
        result.setTotalRecords(page.getTotalElements());
        return new BaseResponse(result);
    }
}


`
  const controller = {
    temp: temp,
    code: option => {
      return ejs.render(temp, option)
    }
  }
  module.exports = controller