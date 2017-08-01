<template>
<div class="userBg">
  <div class="login">
    <img class="user_logo" src="../../static/img/login_logo.png">
    <form>
      <input type="text" placeholder="请输入手机号" class="inpText txt" v-bind:class="{'warn':isUesrName}" v-model="loginModel.accountName" >
      <input type="password" placeholder="请输入密码" v-model="loginModel.password" class="inpText psw" v-if="!isPassword" >
      <input type="text" placeholder="请输入密码" v-model="loginModel.password" class="inpText warn" v-if="isPassword" >
      <input type="button" value="登  录" class="btn bor_col_73a bg_col_73a" v-on:click="btnSubmit">
      <div class="cfix pswBox">
        <a href="#" class="fLeft">找回密码</a>
        <div class="fRight cfix">
          <label for="checkboxFiveInput" class="fLeft">记住密码</label>
          <div class="checkboxFive fRight">
            <input type="checkbox" value="1" id="checkboxFiveInput" name="" />
            <label for="checkboxFiveInput"></label>
          </div>
        </div>
      </div>
      <router-link to="/user/reg" class="reg_btn bor_col_73a">注册</router-link>
    </form>
  </div>
</div>
  
</template>
<script>
export default {
  name: 'login',
  data: function(){
    return{
      isTrue:false,
      isUesrName:false,
      isPassword:false,
      loginUrl: 'http://139.196.164.112:9988/v1/accounts/login',
      token:'',
      loginModel: {
        accountName: '',
        password: ''
      },
      msg: ''
    }
  },
  // mounted(){
  //   var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
  //   // console.log(userInfo);
  //   if(userInfo.token){
  //     this.$router.push({path: '/student/index'})
  //   }
  // },
  methods: {
    btnSubmit:function(){
      var that = this; 
      that.msg = '';
      if(!that.loginModel.accountName || !(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(that.loginModel.accountName))){
        that.isUesrName = true;
        that.loginModel.accountName = "请输入正确的用户名！";
      }else if( !that.loginModel.password ){
        that.isPassword = true;
        that.loginModel.password = "请输入正确的密码！";
      }else{
        that.$http.post(that.loginUrl, that.loginModel)
          .then((response) => {
            // console.log(result.data)//返回值;
            var result = response.data;
            result = JSON.stringify(result);//json缓存需转换string
            localStorage.setItem('userInfo', result)
            //that.$router.push({path: '/student/index'})
            that.$router.push({path: '/grade/addSchool/1/0'})
          }).catch(function (response) {
            if(response.status == 401){
              that.isUesrName = true;
              that.loginModel.accountName = "请输入正确的用户名！";
              that.isPassword = true;
              that.loginModel.password = "请输入正确的密码！";
            }
          })
      }
    }
  },
  watch: {    
    isUesrName: function(){
      var that = this;
      setTimeout(function(){
          that.isUesrName = false;
          that.loginModel.accountName ='';
        }.bind(that),500);
    },
    isPassword: function(){
      var that = this;
      setTimeout(function(){
          that.isPassword = false;
          that.loginModel.password='';
        }.bind(that),500);
    }
  }
}
</script>
  
<style>
@import "../../static/css/common_user.css";
.login{ width:368px; text-align:center;}
</style>
