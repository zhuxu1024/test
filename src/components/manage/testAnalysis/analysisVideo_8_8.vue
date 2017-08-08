<template>
<div class="mInfo manageCon fRight">
    <videoNav :page="this.$route.params.page"></videoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form :label-width="120">
        <Form-item label="选择年级：">
            <Radio-group v-model="formItem.radio1">
                <Radio label="6">6年级</Radio>
                <Radio label="7">7年级</Radio>
                <Radio label="8">8年级</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择学科：">
            <Radio-group v-model="formItem.radio2">
                <Radio label="1">数学</Radio>
                <Radio label="2">英语</Radio>
            </Radio-group>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="getKnowledge">获取知识点</Button>
        </Form-item>
        <Form-item label="选择知识点：" class="cfix">
          <div v-for="(knowledgeInfo, index) in knowledgeInfos" class="fLeft">
            {{knowledgeInfo._level}}
            <Select v-model="knowledgeInfo.selValue" :key="knowledgeInfo.id" style="margin-right: 10px;" @on-change="getKnowledgeLevel(knowledgeInfo)">
                <Option v-for="knowledge in knowledgeInfo.konwledges" :value="knowledge.id" :key="knowledge.id">{{ knowledge.name }}</Option>
              </Select>
          </div>            
        </Form-item>        
        <Form-item label="选择知识点等级：">
            <Radio-group v-model="formItem.radio3">
                <Radio label="A">A</Radio>
                <Radio label="B">B</Radio>
                <Radio label="C">C</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择题型：">
          <Select v-model="model" style="width:200px">
              <Option v-for="item in cityList" :value="item.label" :key="item.label">{{ item.value }}</Option>
          </Select>
        </Form-item>
        <Form-item class="container" label="上传题目：">
          <div>
            格式：
            <Select v-model="modelType" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </div>
          <form id="testform" method="post" enctype="multipart/form-data" class="cfix">
            <input name="key" id="key" type="hidden" ref="keyFile">
            <input name="token" type="hidden" :value="upload_token">
            <input id="userfile" name="file" type="file" ref="inputFile" @change="fileOnChange" />
            <input name="accept" type="hidden" />
          </form>
          <label for="userfile" class="labelFile fLeft">
            <span></span>
            <em>题目上传</em>
          </label>
          <div class="fLeft fileInfo">
            <div class="selected-file">{{uploadFiles[0].oSelectedFile}}</div>
            <div class="progress">{{uploadFiles[0].progressFile}}</div>
            <div class="uploaded-result">{{uploadFiles[0].urlFile}}</div>
          </div>          
        </Form-item>
        <Form-item label="选择答案：">
            <Radio-group v-model="formItem.radio4">
                <Radio label="A">A</Radio>
                <Radio label="B">B</Radio>
                <Radio label="C">C</Radio>
                <Radio label="D">D</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="是否存在子题：">
            <Radio-group v-model="formItem.radio5" @on-change="ziTiShow">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="子题数" v-if="isShow" class="w100">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="标准分值" class="w100">
          <div v-for="inputList in inputLists">
            <Input v-model="inputList.input" placeholder="请输入"></Input>
          </div>            
        </Form-item>
        <Form-item label="附图上传" class="fuTuFile container">
          <div v-for="(inputList,index) in inputLists">
            <form :id="'testform'+inputList.id" method="post" enctype="multipart/form-data" class="cfix">
              <input name="key" :id="'keyFile'+inputList.id" type="hidden">
              <input name="token" type="hidden" :value="upload_token">
              <input :id="'userfile'+inputList.id" name="file" type="file" @change="fileOnChange2(inputList,index,'inputFile'+inputList.id)" />
              <input name="accept" type="hidden" />
            </form>
            <label :for="'userfile'+inputList.id" class="labelFile fLeft">
              <span></span>
              <em>附图上传</em>
            </label>
            <div class="fLeft fileInfo">
              <div class="selected-file">{{inputList.oSelectedFile}}</div>
              <div class="progress">{{inputList.progressFile}}</div>
              <div class="uploaded-result">{{inputList.urlFile}}</div>
            </div>
          </div>
        </Form-item>
        <Form-item label="答题时间" v-if="" class="w100">
            <Input v-model="formItem.input2" placeholder="请输入"></Input>
        </Form-item>
        <Form-item class="container" label="试题视频：">
          <div>
            格式：
            <Select v-model="modelType2" style="width:100px">
              <Option v-for="item in typeList2" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </div>
          <form id="testform1" method="post" enctype="multipart/form-data" class="cfix">
            <input name="key" id="key" type="hidden" ref="keyFile1">
            <input name="token" type="hidden" :value="upload_token">
            <input id="userfile1" name="file" type="file" ref="inputFile1" @change="fileOnChange1" />
            <input name="accept" type="hidden" />
          </form>
          <label for="userfile1" class="labelFile fLeft">
            <span></span>
            <em>视频上传</em>
          </label>
          <div class="fLeft fileInfo">
            <div class="selected-file">{{uploadFiles[1].oSelectedFile}}</div>
            <div class="progress">{{uploadFiles[1].progressFile}}</div>
            <div class="uploaded-result">{{uploadFiles[1].urlFile}}</div>
          </div>          
        </Form-item>
        <Form-item>
            <Button type="primary" @click="videoSubmit">点击上传</Button>
        </Form-item>
    </Form>
  </div>
</div>
</template>

<script>
import videoNav from './videoNav';
export default {
  name: 'mInfo',
  components: {
    videoNav
  },
  data () {
    return {
      isShow:false,
      userToken:'',//登录token
      upload_token:'',//七牛云token
      konwledgeValue:'',//知识点关联4级
      knowledgeInfos:[//知识点关联
        {
          id:0,
          konwledges:[],
          selValue:'',
          _level:'1级'
        },
        {
          id:1,
          konwledges:[],
          selValue:'',
          _level:'2级'
        },
        {
          id:2,
          konwledges:[],
          selValue:'',
          _level:'3级'
        },
        {
          id:3,
          konwledges:[],
          selValue:'',
          _level:'4级'
        }
      ],
      cityList: [//题型
            {
                value: '选择题',
                label: 'A'
            },
            {
                value: '填空题',
                label: 'B'
            }
        ],
        model: '',
      typeList: [//题目上传
        {
            value: 'PDF',
            id: 0
        },
        {
            value: 'html',
            id: 1
        },
        {
            value: 'jpg',
            id: 2
        }
      ],
      modelType: '',//题目上传
      typeList2: [//试题视频
        {
            value: 'PDF',
            id: 0
        },
        {
            value: 'html',
            id: 1
        },
        {
            value: 'jpg',
            id: 2
        }
      ],
      modelType2: '',//试题视频
      formItem: {
          radio1: '',//年级
          radio2: '',//学科
          radio3: '',//知识点等级
          radio4: '',//答案
          radio5: '',//是否存在子题     
          input:'',//子题数
          input2:''//答题时间
      },
      inputLists:[//标准分值数量
        {
          id:2,
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:3,
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        }
      ],
      uploadFiles:[
        {//题目上传
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {//视频上传
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {//附图上传
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        }
      ],
      analysisVideoInfos:{
        answer: "",
        answerDuration: 0,
        answerType: "",
        classfy: "",
        grade: "",
        knowledgePoint: {
          knowledgePointLevelId: "",
          konwledgePointId: ""
        },
        optionQuestionAanswer: [
          {
            content: "",
            number: 0,
            type: ""
          }
        ],
        pictureAttchmentUrl: "",
        standardScore: 0,
        stepQuestion: [
          {
            childQuestionPointId: "",
            childQuestionPointLevelId: "",
            standardScore: 0,
            substepNo: 0
          }
        ],
        subject: "",
        substep: false,
        videoPattern: "",
        videoUrl: ""
      }
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    // console.log(userInfo);
    this.userToken = userInfo.token; 
    console.log(this.userToken);
      this.$http.get('http://139.196.164.112:9988/v1/qiniu/uptoken?token='+ this.userToken)
          .then((response) => {
            console.log(response.data)
            var result = response.data;
            this.upload_token = result.token;
            console.log(this.upload_token)
          }).catch(function (response) {
            console.log(response)
          })
  },
  methods:{
    getKnowledge: function(){
      var that = this;
      that.$http.get('http://139.196.164.112:9988/v1/knowledgePoints?token='+ that.userToken +'&grade='+that.formItem.radio1+'&subject='+that.formItem.radio2)
          .then((response) => {
            console.log(response.data)
            that.knowledgeInfos[0].konwledges = response.data
          }).catch(function (response) {
            console.log(response)
          })
    },
    getKnowledgeLevel: function(data){
      var that = this;
      console.log(data)
      var i = data.id + 1;
      console.log(i)
      var containerid = that.konwledgeValue = data.selValue;
      console.log(that.konwledgeValue)
      if( i <=3){
        that.$http.get('http://139.196.164.112:9988/v1/knowledgePoints?token='+ that.userToken +'&grade='+that.formItem.radio1+'&subject='+that.formItem.radio2+'&containerId='+containerid)
          .then((response) => {
            //console.log(response.data)            
            that.knowledgeInfos[i].konwledges = response.data
          }).catch(function (response) {
            console.log(response)
          })
      }
      
    },
    videoSubmit: function(){
      console.log(this.model)
      console.log(this.formItem.radio3)
    },
    ziTiShow:function(data){
      console.log(data)
      if(data == 1){
        console.log(1)
        this.isShow = !this.isShow;
      }else{
        this.isShow = false;
      }
    },
    fileOnChange: function(){
      console.log(0)
      var that = this;
      that.uploadFiles[0].selectedFile = that.$refs.inputFile.value;
      that.uploadFiles[0].urlFile = '';
      console.log(that.$refs.inputFile.value)
      console.log(that.$refs)
      if (that.uploadFiles[0].selectedFile) {
        var ramdomName = Math.random().toString(36).substr(2) + that.uploadFiles[0].selectedFile.match(/\.?[^.\/]+$/);
        that.$refs.keyFile.value = ramdomName;
        that.uploadFiles[0].oSelectedFile = '文件：' + that.uploadFiles[0].selectedFile;
      } else {
        return false;
      }
      var f = new FormData(document.getElementById("testform"));
      $.ajax({
        url: 'http://upload.qiniu.com/',
        type: 'POST',
        data: f,
        processData: false,
        contentType: false,
        xhr: function(){
          const myXhr = $.ajaxSettings.xhr();  
          if(myXhr.upload){
            myXhr.upload.addEventListener('progress',function(e) {
              // console.log(e);
              if (e.lengthComputable) {
                var percent = e.loaded/e.total*100;
                that.uploadFiles[0].progressFile ='上传进度：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%";
              }
            }, false);
          }
          return myXhr;
        },
        success: function(res) {
          console.log("成功：" + JSON.stringify(res));
          var str;
          if (res.key) {
            str = 'URL：http://otslefigw.bkt.clouddn.com/' + res.key;
          }
          console.log(str)
          that.uploadFiles[0].urlFile = str;
          console.log(that.uploadFiles[0].urlFile)
        },
        error: function(res) {  
          console.log("失败:" +  JSON.stringify(res));
          that.uploadFiles[0].urlFile ='上传失败：' + res.responseText;
        }
      });
      return false;
    },
    fileOnChange1: function(){
      console.log(1)
      var that = this;
      that.uploadFiles[1].selectedFile = that.$refs.inputFile1.value;
      that.uploadFiles[1].urlFile = '';
      console.log(that.$refs.inputFile1.value)
      if (that.uploadFiles[1].selectedFile) {
        var ramdomName = Math.random().toString(36).substr(2) + that.uploadFiles[1].selectedFile.match(/\.?[^.\/]+$/);
        console.log(ramdomName)
        that.$refs.keyFile1.value = ramdomName;
        that.uploadFiles[1].oSelectedFile = '文件：' + that.uploadFiles[1].selectedFile;
      } else {
        return false;
      }
      var f = new FormData(document.getElementById("testform1"));
      $.ajax({
        url: 'http://upload.qiniu.com/',
        type: 'POST',
        data: f,
        processData: false,
        contentType: false,
        xhr: function(){
          const myXhr = $.ajaxSettings.xhr();  
          if(myXhr.upload){
            myXhr.upload.addEventListener('progress',function(e) {
              // console.log(e);
              if (e.lengthComputable) {
                var percent = e.loaded/e.total*100;
                that.uploadFiles[1].progressFile = '上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%";
              }
            }, false);
          }
          return myXhr;
        },
        success: function(res) {
          console.log("成功：" + JSON.stringify(res));
          var str;
          if (res.key) {
            str = 'URL：http://otslefigw.bkt.clouddn.com/' + res.key;
          }
          console.log(str)
          that.uploadFiles[1].urlFile = str;
          console.log(that.uploadFiles[1].urlFile)
        },
        error: function(res) {  
          console.log("失败:" +  JSON.stringify(res));
          that.uploadFiles[1].urlFile ='上传失败：' + res.responseText;
        }
      });
      return false;
    },
    fileOnChange2: function(data,index){

      var that = this;
      var fileId = "userfile"+data.id;
      var keyId = "keyFile"+data.id;
      that.inputLists[index].selectedFile = $("#"+fileId).val();
      that.inputLists[index].urlFile = '';

      if (that.inputLists[index].selectedFile) {
        var ramdomName = Math.random().toString(36).substr(2) + that.inputLists[index].selectedFile.match(/\.?[^.\/]+$/);
        $("#"+keyId).val(ramdomName);
        that.inputLists[index].oSelectedFile = '文件：' + that.inputLists[index].selectedFile;
      } else {
        return false;
      }
      var f = new FormData(document.getElementById("testform"+data.id));
      $.ajax({
        url: 'http://upload.qiniu.com/',
        type: 'POST',
        data: f,
        processData: false,
        contentType: false,
        xhr: function(){
          const myXhr = $.ajaxSettings.xhr();  
          if(myXhr.upload){
            myXhr.upload.addEventListener('progress',function(e) {
              // console.log(e);
              if (e.lengthComputable) {
                var percent = e.loaded/e.total*100;
                that.inputLists[index].progressFile = '上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%";
              }
            }, false);
          }
          return myXhr;
        },
        success: function(res) {
          console.log("成功：" + JSON.stringify(res));
          var str;
          if (res.key) {
            str = 'URL：http://otslefigw.bkt.clouddn.com/' + res.key;
          }
          console.log(str)
          that.inputLists[index].urlFile = str;
        },
        error: function(res) {  
          console.log("失败:" +  JSON.stringify(res));
          that.inputLists[index].urlFile ='上传失败：' + res.responseText;
        }
      });
      return false;
    }
  }
}
</script>

<style>

.uploadFile{ float: left; margin:0 0 50px 100px; }
.fileInfo{ margin: 20px 0 0 30px; }
#userfile, #userfile1, .container form, #userfile2, #userfile3, #userfile4{ display: none; }
.fuTuFile .labelFile{ margin: 0 0 24px; }
.fuTuFile.ivu-form-item{ margin-bottom: 0; }
.labelFile{
  display:block;
  width: 100px;
  height:100px;
  border-radius: 10px;
  border:2px dashed #ddd;
  overflow: hidden;
  cursor: pointer;
  margin-top:20px;
}
.labelFile span{
  display:block;
  width:40px;
  height:40px;
  border-radius: 100%;
  border:3px solid #0983C7;
  margin:14px auto 6px;
  position:relative;
}
.labelFile em{
  font-style: normal;
  text-align: center;
  display:block;
  font-size: 14px;
}
.labelFile span:before, .labelFile span:after{
  display:block;
  content:'';
  background-color: #0983C7;
  position: absolute;
}
.labelFile span:before{
  width:3px;
  height:22px;
  top:6px;
  left:16px;
}
.labelFile span:after{
  width:22px;
  height:3px;
  top:16px;
  left:6px;
}
.selected-file, .progress, .uploaded-result{
  line-height: 30px;
}
.uploaded-result span{
  display: block;
}
.uploaded-result img{
  display:block;
  margin: 20px auto;
  width:100%;
  max-width: 100%;
}
.w100 .ivu-input{ width:200px; }
</style>