<template>
  <div class="nav-bar-container">
    <van-nav-bar>
      <template #left>
        <div class="img-box" @click="onClickLeft" v-if="props.isBackIcon">
          <img src="../../assets/back.png" alt="">
          
        </div>
      </template>
      <template #title>
        <span v-if="props.title" class="title-sty">{{ props.title }}</span>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang='ts'>
const emit = defineEmits(['goBack'])
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isBackIcon: {
    type: Boolean,
    default: true,
  }
})
const onClickLeft = () => {
  emit('goBack')
}
</script>

<style scoped lang='less'>
@height: 44px;

.nav-bar-container {
  width: 100%;
  height: @height;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;

  .img-box {
    height: 100%;
    width: 30px;
    display: flex;
    align-items: center;

    img {
      width: 16px;
    }
  }

  .title-sty {
    font-weight: 500;
  }
}
</style>
