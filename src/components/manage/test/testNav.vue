<template>
    <h2 class="tabTitle cfix">
      <router-link :class="{'tabTitleActive':num == 0}" :to="{name:'AddTest',params: {index: 3,page: 0}}">新增测验</router-link>
      <router-link :class="{'tabTitleActive':num == 1}" :to="{name:'LookTest',params: {index: 3,page: 1}}">查看测验</router-link>
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