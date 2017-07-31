<template>
  <div id="dlBox">
    <!-- <app-header></app-header> -->
    <router-view></router-view>
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
  //导入头尾vue文件
	import AppHeader from './components/Header'
	import AppFooter from './components/Footer'
	export default {
	  name: 'dlBox',
	  components: {
      'app-header': AppHeader,
      'app-footer': AppFooter
      }
	}
</script>

<style>
@import "./static/css/common.css";
</style>
