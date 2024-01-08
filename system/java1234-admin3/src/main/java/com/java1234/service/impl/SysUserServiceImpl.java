package com.java1234.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.java1234.entity.SysUser;
import com.java1234.service.SysUserService;
import com.java1234.mapper.SysUserMapper;
import org.springframework.stereotype.Service;

/**
* @author java1234
* @description 针对表【sys_user】的数据库操作Service实现
* @createDate 2022-08-30 10:49:41
*/
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser>
    implements SysUserService{

}




