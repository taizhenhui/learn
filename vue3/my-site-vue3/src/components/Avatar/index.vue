<template>
  <div class="avatar-container">
    <img
      class="avatar-img"
      alt=""
      :src="url"
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 150
  }
})
</script>

<style lang="less" scoped>
.avatar-img {
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
</style>
