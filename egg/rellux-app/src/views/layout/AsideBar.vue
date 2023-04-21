<template>
  <div class="aside-bar">
    <div class="nav-sty">
      <h1>导航菜单</h1>
      <Icon class="icon-sty" type="close" />
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu
        v-for="(item, index) in menuRoutes"
        :index="(index + 1).toString()"
        :class="{}"
        :key="item.name"
      >
        <template #title>
          <Icon :type="item.meta?.icon" />
          <span style="margin-left: 5px">{{ item.meta?.title }}</span>
        </template>
        <el-menu-item
          v-for="(it, i) in item.children"
          :index="index + 1 + '-' + (i + 1)"
          :key="it.name"
        >
          <span class="sub-title"></span> {{ it.meta?.title }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { routes, MENU_ROUTE_NAME } from "@/router";
import { RouteRecordRaw } from "vue-router";

const getMenuRoutes = (routes: Array<RouteRecordRaw>) => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === MENU_ROUTE_NAME) return routes[i].children;
  }
};
const menuRoutes = getMenuRoutes(routes);

const isCollapse = ref(false);
const indexRef = ref("");
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  indexRef.value = key;
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.aside-bar {
  width: 250px;
  height: 100vh;
  background-color: #fff;
  color: #333333;
  .nav-sty {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666666;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    h1 {
      font-size: 16px;
      font-weight: 400;
    }
    .icon-sty {
      cursor: pointer;
      font-size: 12px;
      color: #9f9f9f;
    }
  }
  .el-menu {
    border-right: none;
    overflow: scroll;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }

  ::v-deep .el-menu-item {
    height: 48px;

    .sub-title {
      display: block;
      width: 10px;
    }
  }
  ::v-deep .is-active {
    background-color: #e2e0f6;
    color: #625df7;
  }
  ::v-deep .el-sub-menu__title {
    height: 48px;
  }
  ::v-deep(.el-sub-menu__title:hover) {
    background-color: #625df7 !important;
    color: #fff;
  }
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 250px;
// }
// .title_sty {
//   height: 60px;
// }

// .open {
//   width: 200px;
//   transition: 0.4s;
//   background-color: #545c64;
// }
// .close {
//   width: 64px;
//   transition: 0.4s;
//   background-color: #545c64;
// }
</style>
