<template>
  <div>
    <ul class="right-list-container">
      <li v-for="item in list" :key="item.name">
        <span :class="{ active: item.isSelect }" @click="handleClick(item)">{{ item.name }}</span>
        <RightList :list="item.children"  @click="handleClick(item)"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RightList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('select', item)
    },
  }
}
</script>


<style lang="less" scoped>
@import "~@/styles/var.less";

.right-list-container {
  list-style: none;
  padding: 0;

  .right-list-container {
    margin-left: 1em;
  }

  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;

    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}</style>