<template>
  <div class="message-area-container">
    <DataForm @submit="handleSubmit" />
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list"></DataList>
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script setup lang="ts">
import { FormDataType, IList } from '@/types';
import DataForm from './DataForm.vue'
import DataList from './DataList.vue'

interface IProps {
  list: Array<IList>
  title: string
  subTitle: string
  isListLoading: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  title: '',
  subTitle: '',
  isListLoading: false,
})
const { list, title, subTitle, isListLoading } = props

const emit = defineEmits(['submit'])
const handleSubmit = (data: FormDataType, cb: (successMsg: string) => void) => {
  emit('submit', data, cb)
}
</script>

<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>
