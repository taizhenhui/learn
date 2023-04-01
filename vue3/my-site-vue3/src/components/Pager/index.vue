<template>
  <div class="pager-container" v-if="pageNumberRef > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="n in numbersRef"
      :key="n"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumberRef }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pageNumberRef)"
      :class="{ disabled: current === pageNumberRef }"
      >&gt;&gt;|</a
    >
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface IProps {
  current?: number
  total?: number
  limit?: number
  visibleNumber?: number
}
const props = withDefaults(defineProps<IProps>(), {
  current: 1,
  total: 0,
  limit: 10,
  visibleNumber: 10,
})
console.log(props);

const emit = defineEmits(['pageChange'])
let { current, total, limit, visibleNumber } = toRefs(props)

// 总页数
const pageNumberRef = computed(() => Math.ceil(total.value / limit.value))
// 得到显示的最小的数字
const visibleMinRef = computed(() => {
  let min = current.value - Math.floor(visibleNumber.value / 2)
  if (min < 1) min = 1
  return min
})
// 得到显示的最大的数字
const visibleMaxRef = computed(() => {
  let max = visibleMinRef.value + visibleNumber.value - 1
  if (max > pageNumberRef.value) max = pageNumberRef.value
  return max
})
// 页码数组
const numbersRef = computed(() => {
  let nums = []
  for (let i = visibleMinRef.value; i <= visibleMaxRef.value; i++) {
    nums.push(i)
  }
  return nums
})

const handleClick = (newpage: number) => {
  console.log(pageNumberRef.value)

  if (newpage < 1) newpage = 1
  if (newpage > pageNumberRef.value) newpage = pageNumberRef.value
  if (newpage === current.value) return
  emit('pageChange', newpage)
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;

  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;

    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }

    &.active {
      color: @dark;
      font-weight: 600;
      cursor: text;
    }
  }
}
</style>
