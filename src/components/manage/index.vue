<template>
  <div class="manage cfix">
    <manageNav :message="this.$route.params.index"></manageNav><!-- 导航 -->
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import manageNav from './manageNav';
export default {
  name: 'manage',
  components: {
    manageNav
  },
   mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    this.userToken = userInfo.token; 
    if(this.userToken == ''){
      this.$router.push({path: '/user/login'})
    }
  }
}
</script>

<style>

.manage{ width: 1200px; margin: 0 auto; }
.manageNav, .manageNav .ivu-menu-dark, .manageCon{ background: #eee;}
.manageCon{ width: 940px;}
.tabTitle{ border-bottom:2px solid #e5e5e5; height: 50px; line-height: 50px}
.tabTitle a{ font-size: 14px; display: inline-block; height: 50px; line-height: 50px; padding: 0 10px;  color: #000;}
.tabTitle a.tabTitleActive{border-bottom:2px solid #2d8cf0;}
.tabTitle a:hover{ color: #000;}
.tabCon{ padding: 20px 10px; min-height: 590px; color: #495060;}
.tabCon .ivu-input{ width: 300px; }
.tabCon .ivu-select{ width: 130px; }
.tabCon .ivu-form-item-label:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
  }
</style>