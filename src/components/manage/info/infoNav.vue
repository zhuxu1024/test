<template>
    <h2 class="tabTitle cfix">
      <router-link :class="{'tabTitleActive':num == 0}" :to="{name:'UploadInfo',params: {index: 2,page: 0}}">上传学生信息</router-link>
      <router-link :class="{'tabTitleActive':num == 1}" :to="{name:'LookInfo',params: {index: 2,page: 1}}">查看学生信息</router-link>
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