<template>
  <div class="about-container" v-loading="loading || !srcLoading">
    <iframe v-if="src" class="about-content" :src="src" @load="srcLoading = true" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'about',
  components: {

  },
  data() {
    return {
      srcLoading: false
    }
  },
  computed: {
    ...mapState('about', { src: 'data', loading: 'loading' })
  },
  created() {
    this.fetchAbout()
  },
  mounted() {

  },
  methods: {
    ...mapActions('about', ['fetchAbout'])
  },
}
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>
