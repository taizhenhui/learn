<template>
  <div class="app-container">
    <suspense>
      <router-view />
    </suspense>
  </div>
</template>

<style lang="less">
@import '~@/styles/var.less';
.app-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: @bgColor;
}
</style>
