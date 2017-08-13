<template>
<div class="mGrade manageCon fRight">
    <testNav :page="this.$route.params.page"></testNav><!-- 导航 -->
    <div class="mLookTest tabCon">
        <Form :label-width="100">
        	<Form-item label="选择班级">
                <Select style="margin-right: 10px;" v-for="LinkageInfo in LinkageInfos" :value="LinkageInfo.id" :key="LinkageInfo.id" v-model="LinkageInfo.selValue" @on-change="onChangeCity(LinkageInfo)" :placeholder="'请'+LinkageInfo.title">
                    <Option v-for="arrayList in LinkageInfo.arrayLists" :value="arrayList.id" :key="arrayList.id">{{arrayList.name}}</Option>
                </Select>
            </Form-item>
            <Form-item label="选择学科：">
            <Radio-group v-model="subjectId" @on-change="onChangeSubject">
                <Radio label="1">数学</Radio>
                <Radio label="2">英语</Radio>
            </Radio-group>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="getTest">查询</Button>
        </Form-item>
        </Form>
        <div class="tableList">
            <Row>
              <i-col span="24">
                  <Table highlight-row :columns="columns" :data="tests"></Table>
              </i-col>
            </Row>
        </div>
    </div>
</div>
</template>

<script>
import testNav from './testNav';
export default {
  name: 'mGrade',
  components: {
    testNav
  },
  data () {
    return {
        containnerId:'',
        subjectId:'',
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
      columns: [
          {
              title: '考试名称',
              key: 'title'
          },
          {
              title: '考试时间',
              key: 'examTime'
          },
          {
              title: '考试时长',
              key: 'date'
          },
          {
              title: '考试描述',
              key: 'description'
          },
          {
              title: '试卷名称',
              key: 'paperName'
          }
      ],
      tests: []
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
        var i = data.id + 1;
        if( i <= that.LinkageInfos.length -1){
            that.$http.get('http://139.196.164.112:9988/v1/locations?parentId='+data.selValue)
              .then((response) => {
                that.LinkageInfos[i].arrayLists = response.data;
              }).catch(function (response) {
                console.log(response)
            })
        }
        that.containnerId = data.selValue;
        console.log(that.containnerId)
    },
    onChangeSubject: function(id){
      console.log(id)
        var that = this;
        that.$http.get('http://139.196.164.112:9988/v1/papers?token=' + that.userToken + '&subject=' + id)
              .then((response) => {
                //console.log(response.data)
                that.examPapers = response.data;
              }).catch(function (response) {
                console.log(response)
            })
    },
    _date: function(date){//时间戳转换格式
      var time = new Date(parseInt(date)); 
      var _time = time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日';
      return _time;
    },
    getTest: function(){
      var that = this;
      that.$http.get('http://139.196.164.112:9988/v1/exams?token=' + that.userToken + '&offset=&limit=&subjectId=' + that.subjectId + '&locationId='+that.containnerId)
            .then((response) => {
              console.log(response.data.data)
              // var result = response.data.data;
              // for(var i = 0; i< result.length; i++){
              //   result[i].examTime = that._date(result[i].examTime);
              //   result[i].paperName = result[i].paper.name;
              // }
              // that.tests = response.data.data;
            }).catch(function (response) {
              console.log(response)
          })
    }
  }
}
</script>

<style>
.mLookTest ul.fLeft, .studentInfoRight{ height: 580px; }
.mLookTest .ivu-menu-vertical.ivu-menu-light:after{ background: none; }
.mLookTest .ivu-menu-light{ background: #eee; border:1px solid #e5e5e5; margin-right: 20px; }
.tableList{ width: 688px; margin-left: 100px; }
</style>