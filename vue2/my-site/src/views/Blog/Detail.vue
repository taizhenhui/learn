<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="datas" v-if="datas" />
      <BlogComment v-if="!isLoading"/>
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="datas.toc" v-if="datas" />
      </div>
    </template>
    <ToTop />
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData'
import { getBlog } from '@/api/blog'
import Layout from "@/components/Layout";
import BlogDetail from './components/BlogDetail.vue';
import BlogTOC from './components/BlogTOC.vue';
import BlogComment from './components/BlogComment.vue';
import ToTop from '@/components/ToTop'
import mainScroll from '@/mixins/mainScroll'
import {titleController} from '@/utils'
export default {
  name: 'Detail',
  mixins: [fetchData({}), mainScroll('mainContainer')],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
    ToTop,
  },

  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },

  methods: {
    async fetchData() {
      const { id } = this.$route.params
      const resp = await getBlog(id)
      
      if(!resp) this.$router.push('/404')
      
      titleController.setRouterTitle(resp.title);
       return resp
    },
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
