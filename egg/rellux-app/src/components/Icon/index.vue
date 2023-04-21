<template>
  <div class="icon-container">
    <i class="iconfont" :class="fontClass"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Iprops {
  type: string;
}
const props = defineProps<Iprops>();

type KeyType = {
  [key: string]: string;
};

const classMap: KeyType = {
  shanchu: "icon-shanchu",
  url: "icon-shengchengurl",
  search: "icon-chakan",
  xiajia: "icon-xiajia",
  shangjia: "icon-shangjia1",
  bangding: "icon-bangding",
  date: "icon-xuanzeriqi",
  cancel: "icon-quxiaohexiao",
  import: "icon-daoru",
  download: "icon-xiazai",
  export: "icon-daochu",
  downTml: "icon-mobanxiazai",
  importTml: "icon-daorumoban",
  modify: "icon-bianji",
  resetPwd: "icon-zhongzhimima",
  arrowDown: "icon-gengduo",
  arrowLeft: "icon-shangyiye",
  arrowRight: "icon-xiayiye",
  increase: "icon-zengjia",
  user: "icon-yonghu",
  edit: "icon-xiugai",
  out: "icon-tuichu",
  close: "icon-guanbiliebiao",
  maidanshuju: "icon-maidanshuju",
  configCenter: "icon-peizhizhongxin",
  projectCenter: "icon-xiangmuzhongxin",
  saleCenter: "icon-xiangmuzhongxin",
  brandCenter: "icon-pinpaizhongxin",
  rightsCenter: "icon-quanyizhongxin",
  calcCenter: "icon-hesuanzhongxin",
  systemCenter: "icon-xitongzhongxin",
  financeCenter: "icon-caiwuzhongxin",
  batchCenter: "icon-quanyimapicizhongxin",
  customerCenter: "icon-kefuzhongxin",
  procureCenter: "icon-caigouzhongxin",
  packageSaleCenter: "icon-quanyibaoxiaoshouzhongxin",
};

const fontClass = computed(() => classMap[props.type]);
console.log(fontClass.value);
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/c/font_4012061_izg7a3hua3h.css";

.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>
