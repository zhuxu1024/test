<template>
<div>
  <div class="bgCom bg_col_eee"></div>
  <div class="studentHome cfix">
    <studentNav :message="this.$route.params.subjectid"></studentNav>
    <!-- 考试记录详情页 start-->
    <div id="student_detail" class="fRight studentDetail_right">
      <div class="details">
        <div class="details_header">
          <h2 class="title_h2 bold mb12">{{dataDetail.title}}</h2>
          <span class="time size_12">{{dataDetail.date}}</span>
        </div>
        <h3 class="title_h3 bor_b_col_eee">本次测试目标</h3>
        <p>{{dataDetail.description}}</p>
      </div><!-- details end -->
      <div class="report">
        <h3 class="title_h3 bor_b_col_eee">诊断报告下载</h3>
        <ul class="report_list cfix">
          <li class="li_zdbg">
            <div>
              <!-- <h4 class="title_h4">{{dataDetail.title}}</h4>
              <span class="size_12 col_222">诊断报告</span> -->
              <h4 class="title_h4">诊断报告</h4>
              <a target="_blank" :href="dataDetail.report.url" class="pos_1">在线查看</a><a :href="dataDetail.report.url" download="dataDetail.title" class="pos_2">下载文件</a>
            </div>
          </li>
          <li class="li_sjyj">
            <div>
              <h4 class="title_h4">试卷原件</h4>
              <a target="_blank" :href="dataDetail.paper.copyUrl" class="pos_1">在线查看</a><a :href="dataDetail.paper.copyUrl" download="dataDetail.title" class="pos_2">下载文件</a>
            </div>
          </li>
          <li class="li_dtyj">
            <div>
              <h4 class="title_h4">答题原件</h4>
              <a target="_blank" :href="dataDetail.answerCopyUrl" class="pos_1">在线查看</a><a :href="dataDetail.answerCopyUrl" :download="dataDetail.title" class="pos_2" >下载文件</a>
            </div>
          </li>
        </ul>
      </div><!-- report end -->
      <div class="subject_video">
        <h3 class="title_h3 bor_b_col_eee">试题视频解析</h3>
        <div class="subject_error ml25">
          <h5 class="size_16 col_d33 bold">错误题目解析视频</h5>
          <dl class="cfix">
            <dd v-for="(wrongData,index) in wrongDatas"><a @click='_dialog(wrongData,index)'>第{{wrongData.sequence}}题</a></dd>
          </dl>
        </div>
        <div class="subject_torrect ml25">
          <h5 class="size_16 col_73a bold">正确题目解析视频</h5>
          <dl class="cfix">            
            <dd v-for="(rightData,index) in rightDatas" v-if="index <= num"><a @click='_dialog(rightData)'>第{{rightData.sequence}}题</a></dd>
            <dd class="dd_more" v-if="moreShow" @click="moreClick"><a>查看全部</a></dd>
          </dl>
        </div>
        <!-- <div class="subject_torrect ml25 last-child">
          <h5 class="size_16 col_73a bold">本卷知识点视频</h5>
          <dl class="cfix">            
            <dd v-for="(rightData,index) in rightDatas"><a>知识点</a></dd>
          </dl>
        </div> -->
      </div><!-- word_video end -->
      <router-link :to="{name:'StudentExercises'}" class="subject_more">智能配套习题</router-link>
      <Modal v-model="modal1" :title="videoTitle" @on-cancel="cancel" width="672" class="dialogDetail">
        <video-player  ref="videoPlayer" :options="playerOptions" @ready="playerReadied"></video-player>
      </Modal>
    </div><!-- 考试记录详情页 end-->
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
      parentMsg:'hello hello',
      examDataId:'',//考试单条记录查找详情标识
      num: 6,//正确视频首屏显示条数
      moreShow:false,//点击更多显示
      userToken:'',
      dataDetail: '',//详情data
      rightDatas: [],//正确题data
      wrongDatas: [],//错误题data
      modal1: false,//弹出框模板
      palyer:[],
      videoTitle:'',
      playerOptions: {//视频
          // component options
          start: 0,
          playsinline: false,
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          poster: "",
        }
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    // console.log(userInfo);
    this.userToken = userInfo.token; 
    this.getDetailData(this.$route.params.id);
    var index = 0;
    if(this.rightDatas.lenght >= 8){
      this.moreShow = true;
    }
    // console.log('this is current player instance object', this.player)
    setTimeout(() => {
      // console.log('dynamic change options', this)
      this.playerOptions.muted = false
    }, 2000)
  },
  methods:{
    cancel () {
        this.player.pause();//弹窗关闭停止播放
    },
    getDetailData: function(data){//考试详情
      this.$http.get('http://139.196.164.112:9988/v1/examRecords/'+ data +'?token='
        + this.userToken)
        .then((response) => {
          this.dataDetail = response.data;
          console.log(this.dataDetail)
          this.rightDatas = response.data.answerItems.right;
          this.wrongDatas = response.data.answerItems.wrong
          console.log(this.rightDatas)
          console.log(this.wrongDatas)
          response.data.date = this._date(response.data.date)
          //console.log(this.dataDetail)
        }).catch(function (response) {
          console.log('请重新登录后查看！')
            //this.$router.push({path: '/user/login'})
          })
    },
    moreClick: function(){//vide more
      this.num = this.rightDatas.length-1;
      this.moreShow = false;
    },
    _date: function(date){//时间戳转换格式
      var time = new Date(parseInt(date)); 
      var _time = time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日';
      return _time;
    },
    _dialog: function(test,index){
      this.modal1 = true;
      this.curVideoIndex = index;
      this.playerOptions.sources[0].src = test.videoUrl;
      this.videoTitle = '第'+test.sequence+'题'
    },
    playerReadied: function(player) {
      this.player = player
    }
  }
}
</script>

<style>
/*student_detail*/
.studentDetail_right{padding-bottom: 40px; padding-top: 32px;}
.details_header{ padding-bottom: 22px;}
.details_header .title_h2{ line-height: 20px;}
.details{ padding-bottom: 28px; }
.details p{ line-height: 26px; text-indent: 2em;}
.details .title_h3{ background-position: -284px -345px; }
.title_h3{ padding:0 0 16px 25px; margin-bottom: 28px;}
.report_list{ margin-bottom: 50px; }
.report .title_h3{ background-position: -284px -425px; }
.subject_video .title_h3{ background-position: -284px -384px; }
.report_list{ width: 918px; }
.report_list li{ width: 270px; padding-left: 80px; margin-right: 36px;}
.report_list li:hover, .subject_video dd:hover{ box-shadow: 0px 0px 20px rgba(236,236,236,1);}
.report_list li div{ height: 95px; padding: 14px;}
.report_list li div a.pos_1, .report_list li div a.pos_2{ bottom: 18px; height: 18px; line-height: 16px; padding:0 8px;}
.report_list li div a.pos_1{ left: 12px;}
.report_list li div a.pos_2{ right:12px;}
.li_zdbg{ background-position: 0 -304px;}
.li_sjyj{ background-position: 0 -399px;}
.li_dtyj{ background-position: 0 -494px;}
.title_h4{ margin-bottom: 8px; }
.subject_video h5{ margin-bottom: 20px;}
.subject_video dl{ width: 900px; margin-bottom: 12px;}
.subject_video dd{ margin: 0 20px 16px 0; padding: 10px 14px;}
.subject_video dd a{  background-position: right -314px; padding-right: 24px; height: 22px; line-height: 22px;}
.subject_video .last-child a{background-position: right -274px;}
.subject_video dd.dd_more{ width: 175px; }
.subject_video dd.dd_more a{ background-position: right -505px; padding-right: 18px; }
.subject_more{ width: 272px; height: 48px; line-height: 48px; text-align: center; border-radius: 8px; margin: 0 auto; background-position: -99px -447px; margin-top: 34px;}
.dialogDetail .ivu-modal-footer{ display: none; }
</style>
