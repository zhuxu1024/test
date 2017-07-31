<template>
<div class="userBg">
  <div class="register">
    <img class="user_logo" src="../../static/img/login_logo.png">
    <form>
    	<input type="text" placeholder="请输入手机号" class="fLeft inpText" v-model="regModel.phone" v-bind:class="{'warn':isPhone}">
    	<div class="inpText reg_yzm fRight" v-bind:class="{'warn':isYzm, 'yzmBorder':colAdd}">
        <input type="text" class="col_808 inp_yzm abs" placeholder="请输入验证码" v-model="regModel.verifyCode" @focus="inpFocus" @blur="inpBlur">
        <a class="btn_yzm btn_v1 abs">{{yanZhengMa}}</a>
      </div>
      <input type="password" placeholder="设置密码" class="inpText fLeft" v-model="regModel.password"v-if="!isRegPw">
      <input type="text" placeholder="设置密码" class="fLeft inpText warn" v-model="regModel.password" v-if="isRegPw" >
      <input type="password" placeholder="请确认密码" class="inpText fRight" v-model="passwordTwo" v-if="!isRegPw2">
      <input type="text" placeholder="请确认密码" class="fRight inpText warn" v-model="passwordTwo" v-if="isRegPw2" >
    	<div class="cfix record_select">
        <div class="fLeft rel" v-for="(studentInfo,index) in studentInfos">
          <input type="text" v-model='studentInfo.selValue' class="inpText" v-bind:placeholder="studentInfo.title" v-on:focus="selToggle(index)" v-on:blur="isHide(index)" :class="{'warn':studentInfo.order === index}" :data-id="studentInfo.order">
          <dl class="select_dl_1" v-if="studentInfo.isTrue">
            <dt>{{studentInfo.title}}</dt>
            <dd v-for="item in studentInfo.arrayList" v-on:click='onChange(item,studentInfo,index)'><div>{{item.name}}</div></dd>
          </dl>
        </div>
    	</div>
      <input type="text" placeholder="请输入真实姓名" class="inpText fLeft" v-bind:class="{'warn':isName}" v-model="regModel.studentRegisterInfo.name">
      <input type="text" placeholder="请输入ID" class="inpText fRight" v-bind:class="{'warn':isId}" v-model="regModel.studentRegisterInfo.studentNo">
    	<div class="agree size_12 cfix">
    		<p class="fLeft" :class="{'agreement':isAgreement}">阅读并同意<a>《用户协议》</a></p>
    		<div class="checkboxFive fLeft">
          <input type="checkbox" value="1" id="checkboxFiveInput" name="" v-model="isChecked" />
          <label for="checkboxFiveInput"></label>
        </div>
    	</div>
    	<input type="button" value="注册" class="btn bor_col_73a bg_col_73a" v-on:click="regSubmit">
    </form>
  </div>
</div>
</template>
<script>
export default {
  name: 'register',
  data: function(){
    return{
      yanZhengMa:'获取验证码',
      regUrl: 'http://139.196.164.112:9988/v1/accounts/',
      yanZhengMaNum:'',//验证码值
      colAdd:false,
      isRegPw:false,
      isRegPw2:false,
      isPhone:false,
      isName:false,
      isId:false,
      isYzm:false,
      isSelect:false,
      selectId:0,
      isChecked:false,
      isAgreement:false,
      passwordTwo:'',
      regModel: {
        password: '',
        phone: '',
        role: '1',
        studentRegisterInfo: {
          cityId: '',
          classId: '',
          gradeId: '',
          name: '',
          provienceId: '',
          schoolId: '',
          studentNo: ''
        },
        verifyCode: ''
      },
      studentInfos:[
        {
          arrayList:[],
          isTrue:false,
          order:'',
          title:'选择地区',
          selValue:''
        },
        {
          arrayList:[],
          isTrue:false,
          order:'',
          title:'选择学校',
          selValue:''
        },
        {
          arrayList:[],
          isTrue:false,
          order:'',
          title:'选择年级',
          selValue:''
        },
        {
          arrayList:[],
          isTrue:false,
          order:'',
          title:'选择班级',
          selValue:''
        }
      ],
      userName: ''
    }
  },
  mounted(){
    this.$http.get('http://139.196.164.112:9988/v1/locations?parentId=101')
      .then((response) => {
        console.log(response.data)
        this.studentInfos[0].arrayList = response.data;
      }).catch(function (response) {
        console.log(response)
      })
  },
  methods:{
    regSubmit: function(){ 
      var that = this; 
      for( var i = 0; i < 4; i++){
        if( that.studentInfos[i].selValue ) {
          that.studentInfos[i].order = ''
        }else {
          that.selectId = i;
          break;
        }
      }
      if(!that.regModel.phone || !(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(that.regModel.phone))){
        that.isPhone = true;
        return false;
      }else if( !that.regModel.verifyCode ){
        that.isYzm = true;
        return false;
      }else if(!that.regModel.password){
        that.isRegPw = true;
        return false;
      }else if(!that.passwordTwo || that.passwordTwo != that.regModel.password){
        that.isRegPw2 = true;
        return false;
      }else if( !that.studentInfos[that.selectId].selValue){
        that.studentInfos[that.selectId].order = that.selectId;
        return false;
      }else if(!that.regModel.studentRegisterInfo.name){
        that.isName = true;
      }else if(!that.regModel.studentRegisterInfo.studentNo){
        that.isId = true;
      }else if(!that.isChecked){
        that.isAgreement = true;
      }else{
        that.regModel.studentRegisterInfo.classId = that.studentInfos[3].id;
        that.$http.post(that.regUrl, that.regModel).then((response) => {
            console.log(response.data)//返回值;
            var result = response.data;
            result = JSON.stringify(result);//json缓存需转换string
            localStorage.setItem('userInfo', result)
            that.$router.push({path: '/student/index'})
          }).catch(function (response) {
            if(response.status == 503){
              that.isPhone = true;
              that.regModel.phone = "手机号码重复，请重新填写！";
            }
          })
      }
      
    },
    inpFocus: function(){
      this.colAdd = true;
    },
    inpBlur: function(){
      this.colAdd = false;
    },
    selToggle: function(index){//弹出下拉框（区域、学校等）
      this.isFalse();
      this.studentInfos[index].isTrue = true;
    },
    onChange: function(item,info,i){//点击下拉框取值
      var itemId = info.id = item.id;
      info.selValue = item.name;
      this.studentInfos[i].order = '';
      this.$http.get('http://139.196.164.112:9988/v1/locations?parentId='+itemId)
        .then((response) => {
          console.log(response.data)
          this.studentInfos[i+1].arrayList = response.data;
        }).catch(function (response) {
          console.log(response)
        })
      this.isFalse();
    },
    isFalse: function(){
      var studentInfos = this.studentInfos;
      for(var i in studentInfos){
        studentInfos[i].isTrue = false;
      }
    },
    isHide:function(index){
      var that = this;
      setTimeout(function(){
        that.studentInfos[index].isTrue = false;
      }, 300)
    }
  },
  watch: {
    isPhone: function(){
      var that = this;
      setTimeout(function(){
        console.log(that.isPhone)
          that.isPhone = false;
        }.bind(that),800);
    },
    isRegPw: function(){
      var that = this;
      setTimeout(function(){
          that.isRegPw = false;
        }.bind(that),800);
    },
    isRegPw2: function(){
      var that = this;
      setTimeout(function(){
          that.isRegPw2 = false;
        }.bind(that),800);
    },
    isName: function(){
      var that = this;
      setTimeout(function(){
          that.isName = false;
        }.bind(that),800);
    },
    isId: function(){
      var that = this;
      setTimeout(function(){
          that.isId = false;
        }.bind(that),800);
    },
    isYzm: function(){
      var that = this;
      setTimeout(function(){
          that.isYzm = false;
        }.bind(that),800);
    },
    isChecked: function(){
      var that = this;
      setTimeout(function(){
          that.isAgreement = false;
        }.bind(that),800);
    }
  }
}

</script>
  
<style>
@import "../../static/css/common_user.css";
.register{ width: 664px; height: 520px; margin: 0 auto; }
.register .inpText{ background: none; padding-left: 12px; }
.reg_yzm{ background: none; display: inline-block; padding: 0 10px 0 16px; text-align: center;}
.inp_yzm{ width: 130px; left: 12px; top: 12px; height: 24px; line-height: 24px; border:none; font-size: 16px; }
.btn_yzm{ border:none; top: 12px; right: 10px;}
.record_select{ width: 584px; }
.record_select .fLeft{ margin-right: 20px; }
.record_select .inpText{ background-position: -188px -589px; padding-left: 12px; padding-right: 32px; width: 126px;}
.record_select .inpText:focus{ background-position: -188px -625px; }
.agree{ padding-left: 200px; margin: 12px 16px; }
.agree .checkboxFive{ margin: 3px 0 0 0;}
.register .btn{ margin: 0 auto; display: block; }
.record_select dl{ width: 272px; min-height: 48px; max-height: 154px; z-index: 9999; padding: 15px 8px 8px 0; overflow-y: scroll;}
.record_select dl dt{ margin-bottom: 4px; padding-left: 15px;}
.record_select dl dd{ height: 32px; line-height: 32px; overflow: hidden; padding-left: 15px;}
.select_dl_1{ left: 0; top: 48px; }
.select_dl_2{ left: 271px; top: 0; }
.register .warn .inp_yzm, .agreement, .agreement a{ color: #db1616 }
</style>
