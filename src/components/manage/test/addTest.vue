<template>
<div class="mTest manageCon fRight">
    <testNav :page="this.$route.params.page"></testNav><!-- 导航 -->
    <div class="mAddSchool tabCon cfix">
     <Form :label-width="100" :model="formItem">
        <Form-item label="考试名称：">
            <Input v-model="formItem.title" placeholder="请输入考试名称"></Input>
        </Form-item>
        <Form-item label="考试时间：">
            <div class="inputw130">               
              <Date-picker placeholder="选择日期" type="datetime" v-model="formItem.examTime" format="yyyy-MM-dd HH:mm:ss" ></Date-picker>
            </div>
        </Form-item>
        <Form-item label="考试描述：">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item label="考试时长：">
            <div class="cfix"><div class="inputw40 fLeft"><Input v-model="formItem.date" placeholder="请输入考试用时分钟数"></Input></div><span class="minutesSpan fLeft">分钟</span></div>
        </Form-item>
        <Form-item label="选择年级：">
            <Select style="margin-right: 10px;" v-for="LinkageInfo in LinkageInfos" :value="LinkageInfo.id" :key="LinkageInfo.id" v-model="LinkageInfo.selValue" @on-change="onChangeCity(LinkageInfo)" :placeholder="'请'+LinkageInfo.title">
                <Option v-for="arrayList in LinkageInfo.arrayLists" :value="arrayList.id" :key="arrayList.id">{{arrayList.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="选择学科：">
            <Radio-group v-model="formItem.subjectId" @on-change="onChangeSubject">
                <Radio label="1">数学</Radio>
                <Radio label="2">英语</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择试卷：">
            <Select v-model="formItem.paperId" placeholder="请选择试卷" @on-change="getPaper(formItem.paperId)">
                <Option :value="examPaper.id" :key="examPaper.id" v-for="examPaper in examPapers">{{examPaper.name}}</Option>
            </Select>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="addSchoolSubmit">提交</Button>
        </Form-item>
    </Form>
  </div>
</div>
</template>

<script>
import testNav from './testNav';
export default {
  name: 'mTest',
  components: {
    testNav
  },
  data () {
    return {
        userToken:'',
        LinkageInfos:[
          {
            arrayLists:[{
                  id: "101",
                  name: "上海",
                  type: null
              }
            ],
            id:0,
            title:'选择市',
            selValue:''
          },
          {
            arrayLists:[],
            id:1,
            title:'选择地区',
            selValue:''
          },
          {
            arrayLists:[],
            id:2,
            title:'选择学校',
            selValue:''
          },
          {
            arrayLists:[],
            id:3,
            title:'选择年级',
            selValue:''
          }
      ],
      examPapers:[],
      formItem:{
        containnerId: "",
        date: 0,
        description: "",
        examTime: 0,
        paper: {},
        subjectId: "",
        title: ""
      },
      formItem1:{
        containnerId: "",
        date: 0,
        description: "",
        examTime: 0,
        paper: {
          copyUrl: "",
          id: "",
          name: ""
        },
        subjectId: "",
        title: ""
      },
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    this.userToken = userInfo.token; 
    console.log(this.userToken)
  },
  methods:{
    onChangeCity: function(data){
        var that = this;
        console.log(data.selValue)
        var i = data.id + 1;
        if( i <= that.LinkageInfos.length -1){
            that.$http.get('http://139.196.164.112:9988/v1/locations?parentId='+data.selValue)
              .then((response) => {
                that.LinkageInfos[i].arrayLists = response.data;
                console.log(that.LinkageInfos[i].arrayLists)
              }).catch(function (response) {
                console.log(response)
            })
        }
        if( i == that.LinkageInfos.length){
          that.formItem.containnerId = data.selValue;
        }
    },
    onChangeSubject: function(id){
        console.log(id)
        var that = this;
        that.$http.get('http://139.196.164.112:9988/v1/papers?token=' + that.userToken + '&subject=' + id)
              .then((response) => {
                //console.log(response.data)
                that.examPapers = response.data;
                console.log(that.examPapers)
              }).catch(function (response) {
                console.log(response)
            })
    },
    getPaper: function(data){
      var that = this;
      for(var i = 0; i<that.examPapers.length; i++){
        if(that.examPapers[i].id == data){
          that.formItem.paper = that.examPapers[i];
        }
      }
      console.log(that.formItem.paper)
    },
    addSchoolSubmit: function(){
      var that = this;      
      if(that.formItem.title == '') {
        that.$message.error('请填写考试名称!');
      }else if(that.formItem.examTime == ''){
        that.$message.error('请填写考试时间!');
      }else if(that.formItem.description == ''){
        that.$message.error('请填写考试描述!');
      }else if(that.formItem.date == ''){
        that.$message.error('请填写考试时长!');
      }else if(that.formItem.containnerId == ''){
        that.$message.error('请选择学校班级!');
      }else if(that.formItem.subjectId == ''){
        that.$message.error('请选择学科!');
      }else if(that.formItem.paperId == ''){
        that.$message.error('请选择试卷!');
      }else{
        that.formItem.examTime = Date.parse(that.formItem.examTime)/1000;
        console.log(that.formItem)
        that.$http.post('http://139.196.164.112:9988/v1/exams?token='+that.userToken, that.formItem).then((response) => {
          //console.log(response.data)
          that.$message.success('提交成功!');
          that.formItem = that.formItem1;
          for(var i = 0; i < that.LinkageInfos.length; i++){
            that.LinkageInfos[i].selValue = '';
          }
        }).catch(function (response) {
          console.log(response)
        })
      }
    }
  }
}
</script>

<style>
.inputw40 .ivu-input{ width:40px;}
.minutesSpan{ margin-left: 6px; }
.inputw130 .ivu-col-span-2{ width: 39px; }
.inputw130 .ivu-col-span-11, .inputw130 .ivu-col-span-11 .ivu-input{ width: 130px; }
</style>