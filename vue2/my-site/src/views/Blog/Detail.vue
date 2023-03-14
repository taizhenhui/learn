<template>
  <Layout>
    <div class="main-container" v-loading="isLoading">
      <BlogDetail :blog="datas" v-if="datas" />
      <BlogComment v-if="!isLoading"/>
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="datas.toc" v-if="datas" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData'
import { getBlog } from '@/api/blog'
import Layout from "@/components/Layout";
import BlogDetail from './components/BlogDetail.vue';
import BlogTOC from './components/BlogTOC.vue';
import BlogComment from './components/BlogComment.vue';
export default {
  name: 'Detail',
  mixins: [fetchData({})],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  methods: {
    async fetchData() {
      const { id } = this.$route.params
      return await getBlog(id)
    }
  },
}
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
