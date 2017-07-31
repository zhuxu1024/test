<template>
    <h2 class="tabTitle cfix">
      <router-link :class="{'tabTitleActive':num == 0}" :to="{name:'AnalysisVideoTest',params: {index: 4,page: 0}}">上传解析视频</router-link>
      <router-link :class="{'tabTitleActive':num == 1}" :to="{name:'KnowledgeVideoTest',params: {index: 4,page: 1}}">上传知识点视频</router-link>
    </h2>
</template>

<script>

export default {
  name: 'tabTitle',
  props:["page"],//父传子值
  data () {
    return {
      num: 0
    }
  },
  mounted(){
    console.log(this.page)
    this.num = this.page;
  },
  methods: {
  }
}
</script>