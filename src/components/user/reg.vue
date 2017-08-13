<template>
<div>
  <div class="bgCom userBg"></div>
  <div class="register">
    <img class="user_logo" src="../../static/img/login_logo.png">
    <form>
    	<input type="text" placeholder="请输入手机号" class="fLeft inpText" v-model="phoneYzm.phone" v-bind:class="{'warn':isPhone}" @blur="phoneBlur">
    	<div class="inpText reg_yzm fRight" v-bind:class="{'warn':isYzm, 'yzmBorder':colAdd}">
        <input type="text" class="col_808 inp_yzm abs" placeholder="请输入验证码" v-model="regModel.verifyCode" @focus="inpFocus" @blur="inpBlur">
        <input type="button" class="btn_yzm btn_v1 abs" :class="{'btn_v2':isNum}" @click="getYzm" :value="yanZhengMa">
      </div>
      <input type="password" placeholder="设置密码" class="inpText fLeft" v-model="regModel.password"v-if="!isRegPw">
      <input type="text" placeholder="设置密码" class="fLeft inpText warn" v-model="regModel.password" v-if="isRegPw" >
      <input type="password" placeholder="请确认密码" class="inpText fRight" v-model="passwordTwo" v-if="!isRegPw2" @blur="isSame">
      <input type="password" placeholder="请确认密码" class="fRight inpText warn" v-model="passwordTwo" v-if="isRegPw2">
    	<div class="cfix record_select">
        <div class="fLeft rel" v-for="(studentInfo,index) in studentInfos">
          <input type="text" v-model='studentInfo.selValue' class="inpText" v-bind:placeholder="studentInfo.title" @focus="selToggle(index)" @blur="isHide(index)" :class="{'warn':studentInfo.order === index}" :data-id="studentInfo.order">
          <dl class="select_dl_1" v-if="studentInfo.isTrue">
            <dt>{{studentInfo.title}}</dt>
            <dd v-for="item in studentInfo.arrayList" @click='onChange(item,studentInfo,index)'><div>{{item.name}}</div></dd>
          </dl>
        </div>
    	</div>
      <input type="text" placeholder="请输入真实姓名" class="inpText fLeft" v-bind:class="{'warn':isName}" v-model="regModel.studentRegisterInfo.name">
      <input type="text" placeholder="请输入真实学号" class="inpText fRight" v-bind:class="{'warn':isId}" v-model="regModel.studentRegisterInfo.studentNo">
    	<div class="agree size_12 cfix">
    		<p class="fLeft" :class="{'agreement':isAgreement}">阅读并同意<a @click="agreement = true">《用户协议》</a></p>
    		<div class="checkboxFive fLeft">
          <input type="checkbox" value="1" id="checkboxFiveInput" name="" v-model="isChecked" @change="isChecked2"/>
          <label for="checkboxFiveInput"></label>
        </div>
    	</div>
      <a class="reg_btn bor_col_73a" @click="regSubmit">注册</a>
    </form>
    <Modal
        v-model="agreement"
        title="用户使用协议"
        width="1000"
        :styles="{top: '20px'}"
        @on-ok="agreementOk">
        <p>如果你想注册成为月光族用户，请务必阅读本使用协议（以下简称“本协议”）并在注册过程中表明你同意接受本协议。</p>
        <p class="agreementP">   1. 月光族 moonzu.com 用户指在本站注册并验证注册邮件地址的用户。用户可以使用个人空间、迷你博客、相册、群组和分享等基本功能。</p>
        <p class="agreementP">   2. 一旦注册成为月光族用户，即代表你保证：（a）你提交的个人信息是真实、准确、完整的；（b）你会不断更新个人资料，以符合及时、详尽、准确的要求；（c）你在使用服务时不会违反任何适用的国家法律或法规；（d）你在使用服务时不会违反月光族一切有效的管理办法和规定。</p>
        <p class="agreementP">   3. 用户的个人资料受到月光族的保护。月光族承诺不会在未获得用户许可的情况下擅自将用户的个人资料信息出租或出售给任何第三方，但以下情况除外：（a）用户同意让第三方共享资料；（b）用户同意公开其个人资料，享受相应的产品和服务；（c）月光族需要听从法庭传票、法律命令或遵循法律程序；（d）月光族发现用户违反了本站服务条款或本站其他使用规定。更多关于隐私保护的内容请查看月光族的隐私声明。</p>
        <p class="agreementP">   4. 用户应随时根据实际情况更新个人资料。帐号相关信息不得影射党和国家领导人或者含有不雅含义，对违反者将予以删除帐号。</p>
        <p class="agreementP">   5. 用户在月光族发文或使用任何服务时，以及在自己的个人资料中，均不能对他人进行骚扰或人身攻击、包含侮辱性言辞、引起不必要的纠纷、影射党和国家领导人或含有其他不恰当的内容。如果违犯上述情形，将视情况予以警告、封禁部分权限直至删除帐号。</p>
        <p class="agreementP">   6. 用户不得使用本站的帐号从事非法商业行为或发表猥亵、色情、反党反政府言论或者其他不当言论。违者将封禁部分权限直至删除帐号。</p>
        <p class="agreementP">   7. 用户不得利用本站帐号、个人资料、迷你博客、分享、照片、群组和私信等服务进行直接或者间接商业宣传，否则将视情节轻重给予警告、封禁部分权限直至删除帐号的处罚；对于蓄意为某一商业机构进行多个商业宣传的，将视情节轻重予以警告、封禁部分权限直至删除帐号的处罚。</p>
        <p class="agreementP">   8. 用户必须保证拥有上传之照片和文字等作品的著作权或已获得合法授权，用户必须保证在本站的上传行为未侵犯任何第三方之合法权益。否则，将由用户本人承担由此带来的一切法律责任。</p>
        <p class="agreementP">   9. 用户不得手动或者使用特殊程序对本站系统进行恶意冲击。对于恶意冲击系统并可能危及系统稳定运行的用户，直接删除帐号。</p>
        <p class="agreementP">  10. 用户有权力和责任对站内出现的违反国家法律法规以及有关站规的事件进行举报。</p>
        <p class="agreementP">  11. 月光族用户帐号代表用户个人，由于用户发布消息或者其他站上交流引起的法律上的或者经济上的责任，月光族不予负担其中任何形式的责任，用户的言论文责自负。</p>
        <p class="agreementP">  12. 用户应保护好月光族帐号和密码安全，对任何人利用你的帐号和密码所进行的活动负全部责任。因月光族无法对非法或未经用户授权使用的帐号的行为作出甄别，因此月光族不承担任何责任。</p>
        <p class="agreementP">  13. 用户帐号仅代表使用者个人，不得转借、售卖或共用帐号。违者将视情节受到警告、封禁部分权限直至删除帐号的处罚。对于有意泄露帐号密码者，视同共用帐号从重处理。</p>
        <p class="agreementP">  14. 月光族 moonzu.com 有权随时修改本协议中的任何条款。任何修改自发布之时起生效。如果你在修改发布后继续使用月光族的服务，即表示你同意遵守对本协议所作出的修改。欢迎随时查看本协议，以确保了解所有相关的最新修改。如果你不同意相关修改，请你离开本站并立即停止使用本站服务。</p>
        <p class="agreementP">  15. 本协议解释权归月光族 moonzu.com，有关事项与其他声明或协议互为补充。若有冲突，以月光族 moonzu.com 公布的最新协议为准。本协议自公布之日起施行。</p>
    </Modal>
  </div>
</div>
</template>
<script>
export default {
  name: 'register',
  data: function(){
    return{
      agreement: false,
      yanZhengMa:'获取验证码',
      regUrl: 'http://139.196.164.112:9988/v1/accounts/',
      regCheckedUrl: 'http://139.196.164.112:9988/v1/accounts/check',
      phoneYzm:{
        phone:''
      },
      isNum:false,//验证码值
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
      isAgreement:true,
      passwordTwo:'',
      regModel: {
        password: '',
        phone: '',
        role: 'student',
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
      if(!that.phoneYzm.phone || !(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(that.phoneYzm.phone))){
        that.isPhone = true;
        that.$message.error('请输入手机号码!');
        return false;
      }else if( !that.regModel.verifyCode ){
        that.isYzm = true;
        that.$message.error('请输入验证码!');
        return false;
      }else if(!that.regModel.password){
        that.isRegPw = true;
        that.$message.error('请输入密码!');
        return false;
      }else if(!that.passwordTwo){
        that.isRegPw2 = true;
        that.$message.error('请确认密码!');
        return false;
      }else if( !that.studentInfos[that.selectId].selValue){
        that.studentInfos[that.selectId].order = that.selectId;
        that.$message.error('请选择学校信息!');
        return false;
      }else if(!that.regModel.studentRegisterInfo.name){
        that.isName = true;
        that.$message.error('请输入真实姓名!');
        return false;
      }else if(!that.regModel.studentRegisterInfo.studentNo){
        that.isId = true;
        that.$message.error('请输入真实学号!');
        return false;
      }else if(!that.isChecked){
        that.isAgreement = true;
        that.$message.error('阅读并同意《用户协议》!');
        return false;
      }else{
        that.regModel.studentRegisterInfo.classId = that.studentInfos[3].id;
        that.regModel.phone = that.phoneYzm.phone;
        that.$http.post(that.regUrl, that.regModel).then((response) => {
            that.$message.success('恭喜您注册成功!');
            console.log(response.data)//返回值;
            var result = response.data;
            result = JSON.stringify(result);//json缓存需转换string
            localStorage.setItem('userInfo', result)
            that.$router.push({path: '/student/index'})
          }).catch(function (response) {
            console.log(response.data)
            that.$message.error(response.data.message);
            // if(response.status == 503){
            //   that.isPhone = true;
            //   that.regModel.phone = "手机号码重复，请重新填写！";
            // }
          })
      }
    },
    inpFocus: function(){
      this.colAdd = true;
    },
    inpBlur: function(){
      var that = this;
      if(that.regModel.verifyCode){
        that.$http.post('http://139.196.164.112:9988/v1/accounts/check?code='+that.regModel.verifyCode).then((response) => {
          console.log(response.data)
          if(response.data == 0){
            that.isYzm = true;
            that.$message.error('输入验证码不正确，请重新输入!');
          }
        }).catch(function (response) {
          console.log(response)
        })
      }      
      this.colAdd = false;
    },
    phoneBlur: function(){
      var that = this;
      if(that.phoneYzm.phone){
        that.$http.get('http://139.196.164.112:9988/v1/accounts?phone=' + that.phoneYzm.phone).then((response) => {
          console.log(response.data)
          if(response.data == 1){
            that.isPhone = true;
            that.$message.error('手机号已注册，请重新输入!');
          }
        }).catch(function (response) {
          console.log(response)
        })
      }      
      this.colAdd = false;
    },
    selToggle: function(index){//弹出下拉框（区域、学校等）
      this.isFalse();
      this.studentInfos[index].isTrue = true;
    },
    getYzm: function(){  
      var that = this, times=10, timer=null;
      if(that.phoneYzm.phone){  
        // 计时开始   
        timer=setInterval(function(){  
          if(times < 0){  
              that.yanZhengMa = "获取验证码"; 
              $(".btn_yzm").attr("disabled",false);
              clearInterval(timer);  
              times=60;  
              that.isNum =false;  
          }else{
            $(".btn_yzm").attr("disabled",true);
            that.yanZhengMa = times+'秒后重试';
            that.isNum = true;
          }
          times--; 
        },1000)
        console.log(that.phoneYzm)
        that.$http.post('http://139.196.164.112:9988/v1/accounts/sms',that.phoneYzm)
          .then((response) => {
            console.log(response.data)
          }).catch(function (response) {
            console.log(response)
          })
      }else {
        that.isPhone = true;
        return false;
      }
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
    isSame: function(){
      if( this.passwordTwo!= this.regModel.password){
        this.isRegPw2 = true;
        this.$message.error('确认密码不一致，请重新输入!');
      }
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
    },
    agreementOk: function(){
      this.isChecked = true;
      this.isAgreement = false;
    },
    isChecked2: function(){
      var that = this;
      if(that.isChecked){
        that.isAgreement = false;
      }else{
        that.isAgreement = true;
      }
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
    }
  }
}

</script>
  
<style>
/*@import "../../static/css/common_user.css";*/
.register{ width: 664px; height: 520px; margin: 0 auto; }
.agreementP{ text-indent: 24px; line-height: 20px;}
.register .inpText{ background: none; padding-left: 12px; }
.reg_yzm{ background: none; display: inline-block; padding: 0 10px 0 16px; text-align: center;}
.inp_yzm{ width: 130px; left: 12px; top: 12px; height: 24px; line-height: 24px; border:none; font-size: 16px; }
.reg_yzm a:hover{ color:#fff; }
.reg_yzm .btn_v2{ background: #808080; }
.btn_yzm{ border:none; top: 12px; right: 10px; width: 100px;}
.record_select{ width: 584px; }
.record_select .fLeft{ margin-right: 20px; }
.record_select .inpText{ background-position: -188px -589px; padding-left: 12px; padding-right: 32px; width: 126px;}
.record_select .inpText:focus{ background-position: -188px -625px; }
.agree{ padding-left: 200px; margin: 12px 16px; }
.agree .checkboxFive{ margin: 3px 0 0 0;}
.register .reg_btn{ margin: 0 auto; display: block; }
.record_select dl{ width: 272px; min-height: 48px; max-height: 154px; z-index: 9999; padding: 15px 8px 8px 0; overflow-y: scroll;}
.record_select dl dt{ margin-bottom: 4px; padding-left: 15px;}
.record_select dl dd{ height: 32px; line-height: 32px; overflow: hidden; padding-left: 15px;}
.select_dl_1{ left: 0; top: 48px; }
.select_dl_2{ left: 271px; top: 0; }
.register .warn .inp_yzm, .agreement, .agreement a{ color: #db1616 }
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
