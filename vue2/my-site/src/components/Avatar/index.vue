<template>
  <div class="avatar-container">
    <img
      class="avatar-img"
      alt=""
      :src="url"
      :style="{
        width: size + 'px',
        height: size + 'px'
      }"
    />
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: {
    url: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.avatar-img{
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>