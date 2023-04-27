<template>
  <div class="aside-bar" :style="{ width: menuCollapse ? '64px' : '250px' }">
    <div :class="{ 'nav-sty': true, 'nav-sty-flex': menuCollapse }">
      <h1 :class="{ 'nav-menu': menuCollapse }">导航菜单</h1>
      <Icon
        :class="{ 'icon-sty': true, 'icon-sty-transform': menuCollapse }"
        type="close"
        @click="handleCollapse"
      />
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="menuCollapse"
      :collapse-transition="false"
    >
      <el-sub-menu
        v-for="(item, index) in menuRoutes"
        :index="index.toString()"
        :class="{ active: index === activeIndex }"
        :key="item.name"
      >
        <template #title>
          <Icon :type="item.meta?.icon" />
          <span style="margin-left: 5px">{{ item.meta?.title }}</span>
        </template>
        <el-menu-item
          v-for="(it, i) in item.children"
          :class="{ 'is-active': it.name === activeName }"
          :index="index + '-' + i"
          :key="it.name"
          @click="handleMenuItemClick(it, index)"
        >
          <span class="sub-title"></span> {{ it.meta?.title }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { routes, MENU_ROUTE_NAME, HOME_ROUTE_NAME } from "@/router";
import { RouteRecordRaw } from "vue-router";
import { useAppStore } from "@/store";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const { menuCollapse, activeIndex, activeName } = toRefs(appStore);

const getMenuRoutes = (routes: Array<RouteRecordRaw>) => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === MENU_ROUTE_NAME && routes[i].children) {
      return routes[i].children?.filter((r) => r.name !== HOME_ROUTE_NAME);
    }
  }
};

const menuRoutes = getMenuRoutes(routes);
watchEffect(() => {
  activeName.value = route.name!;
  if (route.name === HOME_ROUTE_NAME) activeIndex.value = -1;
});

const handleCollapse = () => {
  menuCollapse.value = !menuCollapse.value;
};

const handleMenuItemClick = (route: RouteRecordRaw, index: number) => {
  activeIndex.value = index;
  activeName.value = route.name!;
  router.push({ name: route.name });
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

.aside-bar {
  height: calc(100vh - 60px);
  background-color: #fff;
  color: #333333;
  transition: 0.1s;
  .nav-sty {
    width: 100%;
    height: 50px;
    .flex-common();
    color: #666666;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    h1 {
      font-size: 16px;
      font-weight: 400;
      overflow: hidden;
      transition: 0.3s;
      opacity: 1;
    }
    .nav-menu {
      width: 0;
      opacity: 0;
    }
    .icon-sty {
      cursor: pointer;
      font-size: 12px;
      color: #9f9f9f;
      transition: 0.3s;
    }
    .icon-sty-transform {
      transform: rotate(180deg);
    }
  }
  .nav-sty-flex {
    justify-content: flex-start;
  }
}
.el-menu {
  border-right: none;
  overflow-y: scroll;
  overflow-x: hidden;
}
.el-menu-vertical-demo {
  height: calc(100vh - 110px);
  .sub-title {
    display: block;
    margin-left: 10px;
  }
}

:deep(.el-sub-menu__title) {
  height: 42px;
}
:deep(.el-sub-menu__title:hover) {
  background-color: @theme !important;
  color: #fff !important;
}

.el-menu-item {
  height: 42px;
  transition: 0.1s;
}
.el-menu-item:hover {
  background-color: #fff;
  color: @theme;
  transition: 0.1s;
}
.el-menu-item.is-active {
  background-color: @subtopic !important;
  border-left: 3px solid @theme;
  color: @theme !important;
}
.active {
  &.el-sub-menu {
    background-color: @theme !important;
    :deep(.el-sub-menu__title) {
      color: #fff !important;
    }
  }
}
</style>
