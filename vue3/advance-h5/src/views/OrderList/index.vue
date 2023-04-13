<template>
  <div class="order-list-container">
    <NavBar title="订单列表" :isBackIcon="false" @goBack="handleGoBack" />
    <ul v-if="data.rows.length">
      <li v-for="(item) in data.rows" :key="item.id">{{ item.lessonName }}</li>
    </ul>

  </div>
</template>

<script setup lang='ts'>
import NavBar from '@/components/NavBar/index.vue';
import { ref } from 'vue';
import useGetList from './useGetList'

const { data } = await useGetList()
console.log(data,'data---');

const handleGoBack = () => {
  console.log('handleGoBack');

}


</script>

<style scoped lang='less'>
.order-list-container {
  width: 100%;
  // height: 100%;
  padding: 44px 15px 15px;
  box-sizing: border-box;

}
</style>
