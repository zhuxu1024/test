<template>
<!-- 学生主页左侧导航 start -->
<div class="fLeft studentHome_left">
  <div class="user_info">
    <img class="studentHome_logo" src="../../../static/img/home_logo.png">
  <span class="user_img ine_block"><img src="../../../static/img/user_img.png"></span>
  <span class="user_name ine_block">{{userInfo.student.name}}</span>
  <span class="user_school block">{{userInfo.instituteDisplayName}}</span>
  </div>
  <ul class="nav_list">
    <li v-for="(item, index) in items" class="li_list" :class="{'li_list_active':id == index}" @click="sendMsgToParent(index)"><router-link :to="{name:'StudentIndex',params: {num: index}}" :class=" 'item_' + index ">{{item.title}}</router-link></li>
  </ul>   
  <div class="exit li_list" @click="logout"><a>退出</a></div>
  <p class="copyFooter">Copyright ©️ JiaoYiyou</p>
</div><!-- 学生主页左侧导航 end -->
</template>
<script>
export default {
  props:["message"],//父传子值
  name: 'Index', 
  data () {
    return {
      userInfo:'',
      id: 0,//nav第一条active
      items: [//导航
        {title: '主页'},
        {title: '数学'},
        {title: '英语'}
      ]
    }
  },
  mounted(){
    var index = 0;
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    this.id = this.message ? this.message : 0
  },
  methods:{
    sendMsgToParent:function(i){
      //console.log(i);
      this.id = i;
      this.$emit("listenToChildEvent",i);
    },
    logout: function() {
      this.userInfo.token = '';
      var _result = JSON.stringify(this.userInfo);//json缓存需转换string
      localStorage.setItem('userInfo', _result)
      this.$router.push({path: '/user/login'})
    }
  }
}
</script>

<style>
.studentHome{ width: 1200px; margin: 0 auto; overflow: hidden; zoom: 1;}
.studentHome_left{ width: 240px; padding: 20px 35px; min-height: 660px;}
.studentHome_logo, .user_info{ margin-bottom: 40px;}
.user_img img{ width: 100px; height: 100px; }
.user_name{height: 28px; line-height: 26px; overflow: hidden; background-position: right bottom; padding-right:20px; margin-bottom: 16px;}
.user_school{line-height: 24px;}
.li_list{ width: 170px; height: 40px; line-height: 40px;}
.li_list_active{ background: url(../../../static/img/bg_nav.png) no-repeat; }
.li_list a{ padding-left: 24px; }
.item_0{ background-position: -120px 0; }
.item_1{ background-position: -120px -40px; }
.item_2{ background-position: -120px -80px; }
.item_3{ background-position: -120px -120px; }
.exit a{ background-position: -120px -160px; }
.li_list_active .item_0{ background-position: 0 0; }
.li_list_active .item_1{ background-position: 0 -40px; }
.li_list_active .item_2{ background-position: 0 -80px; }
.li_list_active .item_3{ background-position: 0 -120px; }
.copyFooter{ bottom: 26px; left: 56px; }
</style>