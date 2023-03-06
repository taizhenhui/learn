<template>
  <div class="empty-container">
    <icon type="empty" />
    <p >{{ text }}</p>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'empty',
  props: {
    text: {
      type: String,
      default: '无数据'
    }
  },
  components: {
    Icon
  },
  methods: {

  },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.empty-container {
  .self-center();
  color: @gray;
  text-align: center;
  p{
    font-size: 20px;
  }
}
.icon-container {
  font-size: 150px;
}
</style>
