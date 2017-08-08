<template>
<div>
	<div class="bgCom bg_col_eee"></div>
	<div class="studentHome cfix">
	  <studentNav :message="this.$route.params.subjectid" ></studentNav><!-- 学生主页左侧导航 end -->
	  <div id="student_exercises" class="fRight studentExercises_right">
      <Tabs type="card" :animated="false">
        <Tab-pane label="代数式">
          <ul class="questionList">
            <li>
              <p>1. 某城市按以下规定收取每月气费;煤气用量不起过 60 立方米，按每立方娄 0.8 元收费， 如果超过 60 立方米，超过部分按每立方米 1.2 元收费，假定煤气用量为 x 立方米(x>60)， 收费 y 元，那么 y 与 x 的关系为？</p>
              <Radio-group v-model="radio1">
                <Radio label="A y=0.8x"></Radio>
                <Radio label="B y=1.2x+72"></Radio>
                <Radio label="C y=1.2x+48"></Radio>
                <Radio label="D y=1.2(x-60)+48"></Radio>
              </Radio-group>
            </li>
            <li>
              <p>1. 某城市按以下规定收取每月气费;煤气用量不起过 60 立方米，按每立方娄 0.8 元收费， 如果超过 60 立方米，超过部分按每立方米 1.2 元收费，假定煤气用量为 x 立方米(x>60)， 收费 y 元，那么 y 与 x 的关系为？</p>
              <Radio-group v-model="radio2">
                <Radio label="A y=0.8x"></Radio>
                <Radio label="B y=1.2x+72"></Radio>
                <Radio label="C y=1.2x+48"></Radio>
                <Radio label="D y=1.2(x-60)+48"></Radio>
              </Radio-group>
            </li>
            <li>
              <p>1. 某城市按以下规定收取每月气费;煤气用量不起过 60 立方米，按每立方娄 0.8 元收费， 如果超过 60 立方米，超过部分按每立方米 1.2 元收费，假定煤气用量为 x 立方米(x>60)， 收费 y 元，那么 y 与 x 的关系为？</p>
              <Radio-group v-model="radio3">
                <Radio label="A y=0.8x"></Radio>
                <Radio label="B y=1.2x+72"></Radio>
                <Radio label="C y=1.2x+48"></Radio>
                <Radio label="D y=1.2(x-60)+48"></Radio>
              </Radio-group>
            </li>
            <li>
              <p>1. 某城市按以下规定收取每月气费;煤气用量不起过 60 立方米，按每立方娄 0.8 元收费， 如果超过 60 立方米，超过部分按每立方米 1.2 元收费，假定煤气用量为 x 立方米(x>60)， 收费 y 元，那么 y 与 x 的关系为？</p>
              <Radio-group v-model="radio4">
                <Radio label="A y=0.8x"></Radio>
                <Radio label="B y=1.2x+72"></Radio>
                <Radio label="C y=1.2x+48"></Radio>
                <Radio label="D y=1.2(x-60)+48"></Radio>
              </Radio-group>
            </li>
            <li>
              <p>1. 某城市按以下规定收取每月气费;煤气用量不起过 60 立方米，按每立方娄 0.8 元收费， 如果超过 60 立方米，超过部分按每立方米 1.2 元收费，假定煤气用量为 x 立方米(x>60)， 收费 y 元，那么 y 与 x 的关系为？</p>
              <Radio-group v-model="radio5">
                <Radio label="A y=0.8x"></Radio>
                <Radio label="B y=1.2x+72"></Radio>
                <Radio label="C y=1.2x+48"></Radio>
                <Radio label="D y=1.2(x-60)+48"></Radio>
              </Radio-group>
            </li>
          </ul>
        </Tab-pane>
        <Tab-pane label="整式">标签二的内容</Tab-pane>
        <Tab-pane label="同类项">标签三的内容</Tab-pane>
        <Tab-pane label="整式的加减">标签三的内容</Tab-pane>
        <Tab-pane label="代数式">标签一的内容</Tab-pane>
      </Tabs>
    </div>
	</div>
</div>
</template>
<script>
import studentNav from './sub/studentNav';
export default {
  name: 'studentExercises',
  components: {
    studentNav
  }, 
  data () {
    return {
    	userToken:'',
    	listId:0,
      radio1:false,
      radio2:false,
      radio3:false,
      radio4:false,
      radio5:false,
   	}
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    this.userToken = userInfo.token; 
    this.listId = this.$route.params.num?this.$route.params.num:0;
  }
}
</script>
<style>
  .studentExercises_right .ivu-tabs-bar{ margin-bottom: 0; border: none;}
  .studentExercises_right .ivu-tabs-content{border-radius: 0 8px 8px 8px;}
  .studentExercises_right .ivu-tabs-nav-container{ margin-bottom: 0; }
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container{ height: 40px; }
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{ height: 40px; line-height: 40px; padding: 0 40px; border: none;border-radius:8px 8px 0 0; transition: none;}
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:nth-of-type(2){background-color: #0088d4;}
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:nth-of-type(3){background-color: #d33438;}
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:nth-of-type(4){background-color: #ffa939;}
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:nth-of-type(5){background-color: #73a930;}
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:nth-of-type(6){background-color: #a74fbf;}
  .studentExercises_right .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab.ivu-tabs-tab-active{  background-color:#fff; background-position: 30px -672px;transform:none;padding: 0 30px 0 50px;}
  .studentExercises_right .ivu-tabs .ivu-tabs-tabpane{ padding: 12px 30px; }
  .questionList li{ border-radius: 8px; padding: 32px 46px;}
  .questionList li:nth-of-type(even){ background-color: #eee; }
  .questionList li p{ line-height: 24px; margin-bottom: 22px;}
  .questionList li .ivu-radio-wrapper{width: 180px;}
  .questionList li .ivu-radio-checked .ivu-radio-inner{background: #73a930; border: 1px solid #73a930; }
  .questionList li .ivu-radio-inner{ width: 18px; height: 18px; border: 1px solid #aaa; background-color: #eee;}
  .ivu-radio-checked .ivu-radio-inner:after{-ms-transform: rotate(-54deg); transform: rotate(-54deg); transition: all .2s ease-in-out; }
  .ivu-radio-inner:after {position: absolute;width: 10px;height: 6px;left: 3px;top: 3px;border-radius: 0; content: ' ';background: transparent; border: 2px solid #fff; opacity: 0; border-top: none; border-right: none;-webkit-transform: rotate(-54deg); -moz-transform: rotate(-54deg); -o-transform: rotate(-54deg); -ms-transform: rotate(-54deg); transform: rotate(-54deg);
  }



</style>