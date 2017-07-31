<template>
  <div class="fLeft manageNav">        
    <Menu :active-name="'1-' + message" :theme="theme1">
      <Menu-item name="1-1"><router-link :to="{name:'AddGrade',params: {index: 1, page: 0}}">学校年级班级管理</router-link></Menu-item>
      <Menu-item name="1-2"><router-link :to="{name:'UploadInfo',params: {index: 2, page: 0}}">学生信息导入</router-link></Menu-item>
      <Menu-item name="1-3"><router-link :to="{name:'AddTest',params: {index: 3, page: 0}}">新增测验</router-link></Menu-item>
      <Menu-item name="1-4"><router-link :to="{name:'AnalysisVideoTest',params: {index: 4, page: 0}}">上传解析视频</router-link></Menu-item>
    </Menu>
  </div>
</template>

<script>
export default {
  props:["message"],//父传子值
  name: 'manageNav',
  data () {
    return {
      theme1: 'dark'
    }
  }
}
</script>

<style>
.manageNav, .manageNav .ivu-menu-dark, .manageCon{ background: #eee;}
.manageNav{ width: 240px; height: 640px;}
.manageNav .ivu-menu-dark{ padding-bottom: 100px;}
.manageNav .ivu-menu-vertical .ivu-menu-item{ padding: 0; }
/*.manageNav .ivu-menu-vertical .ivu-menu-item:first-child{ border-top-left-radius: 8px; border-top-right-radius: 8px; }*/
.manageNav .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active, .manageNav .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:hover{ background: #2d8cf0; border-right: none;}
.manageNav a{ display: block; color: #000; padding: 14px 24px;}
.manageNav .ivu-menu-item-active a{ color: #fff; }
.manageNav a:hover{ background: #2d8cf0; color: #fff;}
</style>