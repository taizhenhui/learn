<template>
  <div class="icon-container">
    <i class="iconfont" :class="fontClass"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
const props = defineProps({
  type: {
    type: String,
    require: true,
  },
})
type KeyType = {
  [key: string]: string
}
const classMap: KeyType = {
  home: 'iconzhuye',
  success: 'iconzhengque',
  error: 'iconcuowu',
  close: 'iconguanbi',
  warn: 'iconjinggao',
  info: 'iconxinxi',
  blog: 'iconblog',
  code: 'iconcode',
  about: 'iconset_about_hov',
  weixin: 'iconweixin',
  mail: 'iconemail',
  github: 'icongithub',
  qq: 'iconsign_qq',
  arrowUp: 'iconiconfonticonfonti2copy',
  arrowDown: 'iconiconfonticonfonti2',
  empty: 'iconempty',
  chat: 'iconliuyan',
  string: 'iconliuyan',
}
const fontClass = computed(() => classMap[props.type!])

</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';

.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>
