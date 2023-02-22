<template>
  <div class="container">
    <div class="list">
      <strong>编辑：</strong>
      <div class="list">
        <CheckEditor v-for="item in products"
                     :key="item.id"
                     v-model="item.sell"
                     v-model:title.trim="item.title" />
      </div>
    </div>
    <div class="list">
      <strong>销售中:</strong>
      <template v-for="( it, index) in sells" :key="it.id">
        <span>{{ index + 1 }}.</span>
        <strong>{{ it.title}}</strong>
      </template>
    </div>
  </div>
</template>

<script>
import CheckEditor from './components/CheckEditor.vue'
import { computed, ref } from 'vue'
const defaultSells = [
  {
    id: 1,
    sell: true,
    title: 'iphone12',
  },
  { id: 2, sell: false, title: 'xiaomi' },
  { id: 3, sell: true, title: 'huawei' },
  { id: 4, sell: true, title: 'vivo' },
]

export default {
  components: {
    CheckEditor,
  },
  setup() {
    const productsRef = ref(defaultSells)

    const sellsRef = computed(() => productsRef.value.filter(i => i.sell))
    return {
      products: productsRef,
      sells: sellsRef,
    }
  },
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  width: 980px;
  margin: 50px auto;
}
.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}
strong {
  margin-right: 1em;
}
</style>
