<template>
  <div class="aside-bar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <Icon type="systemCenter" />
          <span style="margin-left:5px;">系统管理</span>
        </template>
          <el-menu-item index="1-1">角色管理</el-menu-item>
          <el-menu-item index="1-2">账号管理</el-menu-item>
      </el-sub-menu>
      
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
.aside-bar{
  width: 250px;
 .self-fill();
  background-color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
.el-menu-vertical-demo {
  height: 100%;
  background-color: red;
}
.el-menu {
  border-right: 0;
}
::v-deep(.el-sub-menu__title:hover) {
  background-color: #625DF7 !important;
  color: #fff;
}
.title_sty {
  height: 60px;
}

.open {
  width: 200px;
  transition: 0.4s;
  background-color: #545c64;
}
.close {
  width: 64px;
  transition: 0.4s;
  background-color: #545c64;
}
</style>
