var ejs = require('ejs'),
    _ = require('lodash')
let temp = `
<% let _fieldUpperName = _name.charAt(0).toUpperCase()+ _name.substr(1, _name.lengh) %>

package com.claymore.fire.<%- _name -%>.controller;

import com.claymore.fire.common.domain.BaseResponse;
import com.claymore.fire.common.domain.PageResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.claymore.fire.<%- _name -%>.entity.<%- _fieldUpperName -%>Entity;
import com.claymore.fire.<%- _name -%>.repository.<%- _fieldUpperName -%>Repository;
import com.claymore.fire.<%- _name -%>.service.<%- _fieldUpperName -%>Service;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/<%- _name -%>")
public class <%- _fieldUpperName -%>Controller {

    @Autowired
    private <%- _fieldUpperName -%>Service <%- _name -%>Service;

    @Autowired
    private <%- _fieldUpperName -%>Repository <%- _name -%>Repository;    


    /**
     * 返回所有列表
     * 
     */
    @GetMapping("/list")
    @ApiOperation("query all <%- _fieldUpperName -%>")
    public BaseResponse<List<<%- _fieldUpperName -%>Entity>> list() {
        Sort sort = new Sort(Sort.Direction.DESC,"id");
        List<<%- _fieldUpperName -%>Entity> all = <%- _name -%>Repository.findAll(sort);
        return new BaseResponse(all);
    }

    /**
     * 创建实体模型
     * 
     */
    @PostMapping
    @ApiOperation("create <%- _name -%>")
    public BaseResponse create(@RequestBody <%- _fieldUpperName -%>Entity <%- _name -%>) {
      <%- _name -%>Repository.save(<%- _name -%>);
        return BaseResponse.instance();
    }

    /**
     * 根据Id获取详细信息
     * 
     */
    @GetMapping("/{id}")
    @ApiOperation(value = "query <%- _fieldUpperName -%>Entity info with id", consumes = "GET", response = <%- _fieldUpperName -%>Entity.class)
    public BaseResponse<<%- _fieldUpperName -%>Entity> findById(@PathVariable("id") Integer id) {
        return new BaseResponse<>(<%- _name -%>Repository.findById(id).get());
    }

    /**
     * 根据id删除实体
     * 
     */
    @DeleteMapping("/{id}")
    public BaseResponse delete(@PathVariable("id") Integer id) {
      <%- _name -%>Repository.deleteById(id);
      return new BaseResponse();
    }    

    /**
     * 获取分页列表
     * 
     */
    @GetMapping("/pagelist/{pageSize}/{pageNo}")
    @ApiOperation("query service zone by page")
    public BaseResponse<PageResult<<%- _fieldUpperName -%>Entity>> page(@PathVariable("pageSize") int pageSize, @PathVariable("pageNo") int pageNo) {
        Page<<%- _fieldUpperName -%>Entity> page = <%- _name -%>Repository.findAll(PageRequest.of(pageNo - 1, pageSize, Sort.Direction.DESC,"id"));
        PageResult<<%- _fieldUpperName -%>Entity> result = new PageResult<<%- _fieldUpperName -%>Entity>();
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