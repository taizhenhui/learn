<template>
  <div
    class="aside-bar"
    :style="{ width: isCollapse ? '64px' : '250px', transition: '0.5s' }"
  >
    <div
      class="nav-sty"
      :style="{ justifyContent: isCollapse ? 'flex-start' : 'space-between' }"
    >
      <h1
        :style="{
          opacity: isCollapse ? 0 : 1,
          overflow: 'hidden',
          width: isCollapse ? '0' : '',
          transition: '0.3s',
        }"
      >
        导航菜单
      </h1>
      <Icon
        class="icon-sty"
        :style="{ transform: isCollapse ? ' rotate(180deg)' : '', transition: '0.3s' }"
        type="close"
        @click="handleCollapse"
      />
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      text-color="#333"
      @open="handleOpen"
      @close="handleOpen"
    >
      <el-sub-menu
        v-for="(item, index) in menuRoutes"
        :index="index.toString()"
        :class="{ active: index === indexRef }"
        :key="item.name"
      >
        <template #title>
          <Icon :type="item.meta?.icon" />
          <span style="margin-left: 5px">{{ item.meta?.title }}</span>
        </template>
        <el-menu-item
          v-for="(it, i) in item.children"
          :index="index + '-' + i"
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

const isCollapse = ref<boolean>(false);
const indexRef = ref<number>(-1);
const handleOpen = (key: string) => {
  indexRef.value = +key;
};

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@color: #625df7;
.aside-bar {
  // width: 250px;
  height: 100vh;
  background-color: #fff;
  color: #333333;
  .nav-sty {
    width: 100%;
    height: 50px;
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
}
.el-menu {
  border-right: none;
  overflow: scroll;
}
.el-menu-vertical-demo {
  height: 100%;
}


::v-deep .el-sub-menu__title {
  height: 42px;
}
::v-deep .el-sub-menu__title:hover {
  background-color: @color !important;
  color: #fff !important;
}

.el-menu-item {
  height: 42px;
  transition: 0.1s;
}
.el-menu-item:hover {
  background-color: #fff;
  color: @color;
  transition: 0.1s;
}
.el-menu-item.is-active {
  background-color: #e2e0f6 !important;
  border-left: 3px solid @color;
  color: @color !important;
}
.active {
  &.el-sub-menu {
    background-color: @color !important;
    ::v-deep .el-sub-menu__title {
      color: #fff !important;
    }
  }
}
</style>
