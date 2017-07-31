<template>
    <h2 class="tabTitle cfix">
      <router-link :class="{'tabTitleActive':num == 0}" :to="{name:'AddGrade',params: {index: 1,page: 0}}">新增学校</router-link>
      <router-link :class="{'tabTitleActive':num == 1}" :to="{name:'LookGrade',params: {index: 1,page: 1}}">查看学校</router-link>
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
    this.num = this.page;
  },
  methods: {
  }
}
</script>