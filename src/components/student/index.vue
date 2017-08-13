<template>
<div>
  <div class="bgCom bg_col_eee"></div>
  <div class="studentHome cfix">
    <studentNav :message="this.$route.params.num" @listenToChildEvent="getListData"></studentNav>
    <!-- 学生主页左侧导航 end -->
    <!-- 考试记录 start -->
    <div id="student_index" class="fRight studentHome_right">
      <div class="chart mb12 none"><img src="../../static/img/img_chart.png"></div>
      <div class="record_box">
        <div class="cfix record">
          <dl class="record_nav fLeft">
              <dt v-model="isShow">考试记录</dt>
          </dl>
        </div>
        <!-- 考试记录列表 start-->
        <ul class="test_list">
          <li class="cfix test_li_list" :class="{'li_list_math':dataList.examData.subject.name == '数学','li_list_english':dataList.examData.subject.name == '英语'}" v-for="dataList in dataLists">
          <router-link :to="{name:'StudentDetail',params: {id: dataList.examData.id, subjectid: dataList.examData.subject.id}}" class="block _w100">
            <img class="fLeft" :src="dataList.examData.subject.image">
            <div class="fLeft test_list_center">
              <h2 class="title_h2">{{dataList.examData.title}}</h2>
              <span class="time">{{dataList.examData.date}}</span>
            </div>
            <div class="fRight test_list_right">
              <span><em>{{dataList.score}}</em>分</span>
              <p><a class="exercise btn_v1">练习提高</a><a class="analyse btn_v1">查看分析</a></p>
            </div>
            </router-link>
          </li>
        </ul><!-- 考试记录列表 end -->
      </div>
    </div><!-- 考试记录 end -->
  </div>
</div>
</template>

<script>
import studentNav from './sub/studentNav';
export default {
  name: 'studentHome',
  components: {
    studentNav
  }, 
  data () {
    return {
      isShow:false,
      userToken:'',
      examDataId:'',//考试单条记录查找详情标识
      dataLists: [],//列表data
      listId:0
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    // console.log(userInfo);
    this.userToken = userInfo.token; 
    if(this.userToken == ''){
      this.$router.push({path: '/user/login'})
    }
    console.log(this.userToken);
    this.listId = this.$route.params.num?this.$route.params.num:0;
    this.getListData(this.listId);
  },
  methods:{
    getListData: function(i){//考试列表
      this.listId = i;
      console.log(i)
      var listUrl = 'http://139.196.164.112:9988/v1/examRecords?token='
        + this.userToken +'&offset=0&limit=2&subjectId=' + i;
      if( i == 0){
        listUrl = 'http://139.196.164.112:9988/v1/examRecords?token='
        + this.userToken +'&offset=0&limit=2';
      }//不加参数subjectId查找全部考试列表，加参数查找数学或英语考试列表
      // subjectId删除获取全部列表
      this.$http.get(listUrl)
        .then((response) => {
          //console.log(response.data.data)
          var result = response.data.data;
          for(var i = 0; i < result.length; i++){
            result[i].examData.date = this._date(result[i].examData.date);
          }
          this.dataLists = result;
          //console.log(this.dataLists)
        }).catch(function (response) {
          console.log(response)
          console.log('登录验证过期，请重新登录后查看！')
          })
    },
    _date: function(date){//时间戳转换格式
      var time = new Date(parseInt(date)); 
      var _time = time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日';
      return _time;
    }
  }
}
</script>

<style>
.record_box{ padding-bottom: 50px; }
.chart, .record, .studentDetail_right{ padding: 0 28px; }
.chart{ padding-top: 20px; padding-bottom:20px;}
.record{ border-top-left-radius: 8px; border-top-right-radius: 8px; padding-top: 28px; padding-bottom: 28px;  margin-bottom: 28px;}
.record_nav dt{ margin-right: 50px; background-position: 0 -204px; padding-left: 20px; }
.dd_list{ padding: 0 12px;}
.record_seach{ width: 200px; height: 28px; line-height: 28px; padding: 0 8px; border-radius: 20px;}
.search_txt{ left: 28px; width: 155px; top: 3px; height: 20px;}
.search_btn{ background-position: 0 -279px; width:14px; height:14px; left: 10px; top: 6px;}
.test_list{ width: 880px; margin: 0 auto; }
.test_li_list{ height: 150px;}
.test_list_center{ max-width: 390px; }
.test_list_center, .test_list_right{ padding: 30px 30px 0 30px; }
.test_li_list h2{ line-height: 22px; margin-bottom: 45px;}
.test_list_right span{ width: 244px; text-align: right; }
.test_li_list span em{ margin-right:6px; line-height: 56px;}
.test_li_list a.exercise, .test_li_list a.analyse{ padding:0 14px 0 34px; margin-left: 18px;}
.test_li_list a.exercise{ background-position: 15px -248px; }
.test_li_list a.analyse{ background-position: 13px -224px; }
._w100{ width: 100%; height: 100%; }
</style>