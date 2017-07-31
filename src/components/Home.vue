<template>
  <div class="home">
    <router-link to="/user/login">登录</router-link><br>
    <router-link to="/user/reg">注册</router-link><br>
    <router-link :to="{name:'AddGrade',params: {index: 1,page: 0}}">后台管理</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
   name: 'Home',
}
</script>

<style>
body{background: #fff;}
</style>
