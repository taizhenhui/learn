package com.system.controller;

import com.system.entity.R;
import com.system.entity.SysUser;
import com.system.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private SysUserService sysUserService;

    @RequestMapping("/user/list")
    public R userList(){
        Map<String,Object> resutlMap=new HashMap<>();
        List<SysUser> userList = sysUserService.list();
        resutlMap.put("userList",userList);
        return R.ok(resutlMap);
    }
}
