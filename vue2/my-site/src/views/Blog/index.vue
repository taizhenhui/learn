<template>
  <div class="blog-container">
    <RightList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from './components/RightList.vue'
import fetchData from '@/mixins/fetchData'
import {getBlogTypes,getBlogs} from '@/api/blog'
export default {
  name: 'blog',
  mixins:[fetchData([])],
  components: {
    RightList
  },
  data() {
    return {
      list: [
        { name: 'A', isSelect: false },
        { name: 'B', isSelect: false },
        {
          name: 'C', isSelect: true, children: [
            { name: 'c-1', isSelect: false },
            {
              name: 'c-2', isSelect: false, children: [
                { name: 'c-2-1', isSelect: false },
                { name: 'c-2-2', isSelect: false },
              ]
            },
            { name: 'c-3', isSelect: false },
            { name: 'c-4', isSelect: false },
          ]
        },
        { name: 'D', isSelect: false },
      ],
      dataTypes:[],
      dataBlogs:{}
    }
  },

  methods: {
    async fetchData(){
      this.dataTypes =  await getBlogTypes()
      this.dataBlogs = await getBlogs()
      console.log('this.dataTypes',this.dataTypes);
      console.log('this.dataBlogs',this.dataBlogs);
    },
    handleSelect(item){
      // console.log(item);
    }
  },
}
</script>

<style scoped lang="less"></style>
