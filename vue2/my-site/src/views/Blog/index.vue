<template>
  <Layout>
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList";
import BlogCategory from "./components/BlogCategory";
export default {
  name:'Blog',
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
};
</script>

<style></style>
