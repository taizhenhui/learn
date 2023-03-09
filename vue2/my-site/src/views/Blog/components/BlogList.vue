<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="it in datas.rows" :key="it.id">
        <div class="thumb" v-if="it.thumb">
          <a href="">
            <img :src="it.thumb" :alt="it.title" :title="it.title" />
          </a>
        </div>
        <div class="main">
          <a href="">
            <h2>{{ it.title }}</h2>
          </a>
          <div class="aside">
            <span>日期：{{ it.createDate }}</span>
            <span>浏览：{{ it.scanNumber }}</span>
            <span>评论{{ it.commentNumber }}</span>
            <a href="/article/cate/8" class="">{{ it.category.name }}</a>
          </div>
          <div class="desc">
            {{ it.description }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <Pager v-if="datas.total" :current="routeInfo.page" :total="datas.total" :limit="routeInfo.limit" :visibleNumber="10"
      @pageChange="handlePageChange" />
  </div>
</template>

<script>
import Pager from '@/components/Pager'
import fetchData from '@/mixins/fetchData'
import { getBlogs } from '@/api/blog'
export default {
  mixins: [fetchData({})],
  components: {
    Pager,
  },
  data() {
    return {}
  },
  computed: {
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1
      const page = +this.$route.query.page || 1
      const limit = +this.$route.query.limit || 10
      return {
        categoryId,
        page,
        limit
      }
    }
  },
  watch: {
    async $route() {
      this.isLoading = true
      this.$refs.container.scrollTop = 0
      this.datas = await this.fetchData()
      this.isLoading = false
    }
  },
  methods: {
    async fetchData() {
      console.log(1111);
      const { categoryId, page, limit } = this.routeInfo
      return await getBlogs(page, limit, categoryId)
    },
    async handlePageChange(newpage) {
      const { categoryId, limit } = this.routeInfo
      const query = { page: newpage, limit }
      categoryId === -1
        ? this.$router.push({ name: 'Blog', query })
        : this.$router.push({ name: 'CategoryBlog', query, params: { categoryId } })
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;

  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;

    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }

  .main {
    flex: 1 1 auto;

    h2 {
      margin: 0;
    }
  }

  .aside {
    font-size: 12px;
    color: @gray;

    span {
      margin-right: 15px;
    }
  }

  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
