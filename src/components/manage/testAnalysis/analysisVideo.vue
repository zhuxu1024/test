<template>
<div class="mInfo manageCon fRight">
    <videoNav :page="this.$route.params.page"></videoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form :label-width="120">
        <Form-item label="选择年级：">
            <Radio-group v-model="analysisInfos.grade">
                <Radio label="6">6年级</Radio>
                <Radio label="7">7年级</Radio>
                <Radio label="8">8年级</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择学科：">
            <Radio-group v-model="analysisInfos.subjectId" @on-change="getKnowledge">
                <Radio label="1">数学</Radio>
                <Radio label="2">英语</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择题型：">
          <Select v-model="analysisInfos.classfy" @on-change="getClassfy">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </Form-item>
        <Form-item label="上传题目：" class="fuTuFile container">
          <div class="cfix">
            <div class="mb12 fLeft mr15">
              格式：{{analysisInfos.richMedia.type}}
            </div>
            <form :id="'testform'+uploadFiles[0].id" method="post" enctype="multipart/form-data" class="cfix">
              <input name="key" :id="'keyFile'+uploadFiles[0].id" type="hidden">
              <input name="token" type="hidden" :value="upload_token">
              <input :id="'userfile'+uploadFiles[0].id" name="file" type="file" @change="fileOnChange1(uploadFiles[0],0,analysisInfos.richMedia.type)" />
              <input name="accept" type="hidden" />
            </form>
            <label :for="'userfile'+uploadFiles[0].id" class="labelFile fLeft">
              <span></span>
              <em>上传题目</em>
            </label>
            <div class="fLeft fileInfo">
              <div class="selected-file">{{uploadFiles[0].oSelectedFile}}</div>
              <div class="progress">{{uploadFiles[0].progressFile}}</div>
              <div class="uploaded-result">{{uploadFiles[0].urlFile}}</div>
            </div>
          </div>
          <div class="cfix typeTextarea">
            <div class="mb12 fLeft mr15">
              格式：txt
            </div>
            <Input v-model="analysisInfos.richMedia.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </div>
        </Form-item>
        <Form-item label="插入子题：">
            <Radio-group v-model="analysisInfos.substep" @on-change="stepShow">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
            </Radio-group>
        </Form-item>
      <div class="borderDashed">
        <Form-item label="选择知识点：" class="cfix">
          <div v-for="(knowledgeInfo, index) in knowledgeInfos.knowledge0" class="fLeft">
            {{knowledgeInfo.id}}级
            <Select v-model="knowledgeInfo.selId" :key="knowledgeInfo.id" style="margin-right: 10px;" @on-change="getKnowledgeLevel(knowledgeInfo)">
                <Option v-for="knowledge in knowledgeInfo.knowledges" :value="knowledge.id" :key="knowledge.id">{{ knowledge.name }}</Option>
              </Select>
          </div>
        </Form-item>    
        <Form-item label="选择知识点等级：">
            <Radio-group v-model="formItem.radio1" @on-change="getKonwledgeLevel2">
                <Radio v-for="levelItem in knowledgeLevel.level0" :label="levelItem.name" :key="levelItem.id">{{levelItem.name}}</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择知识点内容：" class="w200">
          <Select v-model="analysisInfos.ziti.knowledgePointLevelId" @on-change="getKnowledgeContent">
              <Option v-for="knowledgeContent in knowledgeContents.contents" :value="knowledgeContent.id" :key="knowledgeContent.id">{{ knowledgeContent.content }}</Option>
          </Select>
        </Form-item>
        <Form-item label="分数：" class="w130">
            <Input v-model="analysisInfos.standardScore" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="上传答案：" class="fuTuFile container" v-if="isShow">
          <div class="cfix">
            <div class="mb12 fLeft mr15">
              格式：{{analysisInfos.ziti[0].richMedia.type}}
            </div>
            <form :id="'testform'+uploadFiles[1].id" method="post" enctype="multipart/form-data" class="cfix">
              <input name="key" :id="'keyFile'+uploadFiles[1].id" type="hidden">
              <input name="token" type="hidden" :value="upload_token">
              <input :id="'userfile'+uploadFiles[1].id" name="file" type="file" @change="fileOnChange1(uploadFiles[1],1,analysisInfos.ziti[0].richMedia.type)" />
              <input name="accept" type="hidden" />
            </form>
            <label :for="'userfile'+uploadFiles[1].id" class="labelFile fLeft">
              <span></span>
              <em>上传答案</em>
            </label>
            <div class="fLeft fileInfo">
              <div class="selected-file">{{uploadFiles[1].oSelectedFile}}</div>
              <div class="progress">{{uploadFiles[1].progressFile}}</div>
              <div class="uploaded-result">{{uploadFiles[1].urlFile}}</div>
            </div>
          </div>
          <div class="cfix typeTextarea">
            <div class="mb12 fLeft mr15">
              格式：txt
            </div>
            <Input v-model="analysisInfos.ziti[0].richMedia.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </div>
        </Form-item>  
        <Form-item label="上传附图：" class="fuTuFile container" v-if="isShow">
            <div class="mb12 fLeft mr15">
              格式：{{imgType}}
            </div>
          <form :id="'testform'+uploadFiles[2].id" method="post" enctype="multipart/form-data" class="cfix">
            <input name="key" :id="'keyFile'+uploadFiles[2].id" type="hidden">
            <input name="token" type="hidden" :value="upload_token">
            <input :id="'userfile'+uploadFiles[2].id" name="file" type="file" @change="fileOnChange1(uploadFiles[2],2,imgType)" />
            <input name="accept" type="hidden" />
          </form>
          <label :for="'userfile'+uploadFiles[2].id" class="labelFile fLeft">
            <span></span>
            <em>上传附图</em>
          </label>
          <div class="fLeft fileInfo">
            <div class="selected-file">{{uploadFiles[2].oSelectedFile}}</div>
            <div class="progress">{{uploadFiles[2].progressFile}}</div>
            <div class="uploaded-result">{{uploadFiles[2].urlFile}}</div>
          </div>
        </Form-item>
      </div>
        <Form-item label="上传答案：" class="fuTuFile container" v-if="!isShow">
          <div class="mb12">
            格式：{{analysisInfos.questionOption.richMedia.type}}
          </div>
          <div v-for="(inputList,index) in inputLists" class="cfix">
            <form :id="'testform'+inputList.id" method="post" enctype="multipart/form-data" class="cfix">
              <input name="key" :id="'keyFile'+inputList.id" type="hidden">
              <input name="token" type="hidden" :value="upload_token">
              <input :id="'userfile'+inputList.id" name="file" type="file" @change="fileOnChange0(inputList,index,formItem.answerFormat2)" />
              <input name="accept" type="hidden" />
            </form>
            <label :for="'userfile'+inputList.id" class="labelFile fLeft">
              <span></span>
              <em>上传答案{{inputList.name}}</em>
            </label>
            <div class="fLeft fileInfo">
              <div class="selected-file">{{inputList.oSelectedFile}}</div>
              <div class="progress">{{inputList.progressFile}}</div>
              <div class="uploaded-result">{{inputList.urlFile}}</div>
            </div>
            <div class="cfix typeTextarea">
              <div class="mb12 fLeft mr15">
                格式：txt
              </div>
              <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </div>
          </div>
        </Form-item>
        <Form-item label="试题视频：" class="fuTuFile container">
          <div class="mb12">
            格式：{{analysisInfos.videoPattern}}
          </div>
          <form :id="'testform'+uploadFiles[3].id" method="post" enctype="multipart/form-data" class="cfix">
            <input name="key" :id="'keyFile'+uploadFiles[3].id" type="hidden">
            <input name="token" type="hidden" :value="upload_token">
            <input :id="'userfile'+uploadFiles[3].id" name="file" type="file" @change="fileOnChange1(uploadFiles[3],3,analysisInfos.videoPattern)" />
            <input name="accept" type="hidden" />
          </form>
          <label :for="'userfile'+uploadFiles[3].id" class="labelFile fLeft">
            <span></span>
            <em>上传视频</em>
          </label>
          <div class="fLeft fileInfo">
            <div class="selected-file">{{uploadFiles[3].oSelectedFile}}</div>
            <div class="progress">{{uploadFiles[3].progressFile}}</div>
            <div class="uploaded-result">{{uploadFiles[3].urlFile}}</div>
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
      isShow:true,
      num:1,
      imgType:'jpg/jpeg/png/gif',
      isStepShow:true,
      userToken:'',//登录token
      upload_token:'',//七牛云token
      
      knowledgesId:'',
      knowledgesContentId:'',
      knowledgeContents:{//知识点内容
        contents:[]
      },
      knowledgeInfos:{//知识点关联
        knowledge0:[
          {
            id:1,
            knowledges:[],
            selId:''
          },
          {
            id:2,
            knowledges:[],
            selId:''
          },
          {
            id:3,
            knowledges:[],
            selId:''
          },
          {
            id:4,
            knowledges:[],
            selId:''
          }
        ],
        knowledge1:[
          {
            id:1,
            knowledges:[],
            selId:''
          },
          {
            id:2,
            knowledges:[],
            selId:''
          },
          {
            id:3,
            knowledges:[],
            selId:''
          },
          {
            id:4,
            knowledges:[],
            selId:''
          }
        ]
      },
      knowledgeLevel:{
        level0:[//知识点等级
          {
            id:0,
            name:"A"
          },
          {
            id:1,
            name:"B"
          },
          {
            id:2,
            name:"C"
          },
        ],
        level1:[//知识点等级
          {
            id:0,
            name:"A"
          },
          {
            id:1,
            name:"B"
          },
          {
            id:2,
            name:"C"
          },
        ]
      },//获取知识点内容
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
      formItem: {
          radio1:'', //知识等级ABC
          radio2:'',//是否分步
          radio3:'', //知识等级ABC弹窗
          answerFormat2:'',//选择题答案格式
          modal:false
      },
      inputLists:[//选择题答案
        {
          id:0,
          name:'A',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:1,
          name:'B',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:2,
          name:'C',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:3,
          name:'D',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        }
      ],
      uploadFiles:[
        {//上传题目
          id:4,
          name:'A',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:5,
          name:'A',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:6,
          name:'A',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        },
        {
          id:7,
          name:'A',
          input:'',
          selectedFile:'',
          oSelectedFile:'',
          urlFile:'',
          progressFile:''
        }
      ],
      analysisInfos:{
        classfy: "",
        grade: "",
        subjectId: "",
        substep: false,
        id: "",
        ziti: [
          {
            id: "",
            name: "",
            parentId: "",
            knowledgePointLevelId: "",
            standardScore: 0,
            richMedia: {
              mediaUri: "",
              text: "",
              type: "pdf"
            },
            pictureAttchmentUrl: ""
          }
        ],
        questionOption: [
          {
            number: 0,
            richMedia: {
              mediaUri: "",
              text: "",
              type: "pdf"
            }
          }
        ],
        richMedia: {
          mediaUri: "",
          text: "",
          type: "pdf"
        },        
        videoPattern: "mp4",
        videoUrl: ""
      }
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    this.userToken = userInfo.token; 
    console.log(this.userToken);
    this.$http.get('http://139.196.164.112:9988/v1/qiniu/uptoken?token='+ this.userToken)
        .then((response) => {
          var result = response.data;
          this.upload_token = result.token;
        }).catch(function (response) {
          console.log(response)
        })
  },
  methods:{
    getKnowledge: function(){//获取一级
      var that = this;
      for( var i = 0; i<that.knowledgeInfos.knowledge0.length; i++ ){
        that.knowledgeInfos.knowledge0[i].selId = '';
        that.knowledgeInfos.knowledge0[i].knowledges = [];
      }
      that.$http.get('http://139.196.164.112:9988/v1/knowledgePoints?token='+ that.userToken +'&grade='+that.analysisInfos.grade+'&subject='+that.analysisInfos.subjectId)
          .then((response) => {
            //console.log(response.data)
            that.knowledgeInfos.knowledge0[0].knowledges = response.data;
          }).catch(function (response) {
            console.log(response)
          })
    },
    getKnowledgeLevel: function(data){//获取等级知识
      var that = this;
      that.knowledgesId = that.analysisInfos.ziti[0].id = data.selId;
      if( data.id <=3){
        that.$http.get('http://139.196.164.112:9988/v1/knowledgePoints?token='+ that.userToken +'&grade='+that.analysisInfos.grade+'&subject='+that.analysisInfos.subjectId+'&containerId='+ data.selId)
          .then((response) => {
            //console.log(response.data)
            that.knowledgeInfos.knowledge0[data.id].knowledges = response.data
          }).catch(function (response) {
            console.log(response)
          })
      }
    },
    getKonwledgeLevel2: function(data){//获取知识点内容
      var that = this;
      that.$http.get('http://139.196.164.112:9988/v1/knowledgePointLevel?token='+ that.userToken +'&knowledgePointId='+that.knowledgesId+'&level='+data)
        .then((response) => {
          console.log(response.data)
          that.knowledgeContents.contents = response.data;
        }).catch(function (response) {
          console.log(response)
        })  
    },
    getKnowledgeContent: function(data){
      console.log(data)
      // this.analysisInfos.ziti.knowledgePointLevelId = this.knowledgesContentId;
    },
    getClassfy: function(data){
      if(data == "选择题"){
        this.isShow = false;
      }else{
        this.isShow = true;
      }
    },
    videoSubmit: function(){
      var that = this;
      that.$http.post('http://139.196.164.112:9988/v1/questions?token='+ that.userToken, that.analysisVideoInfos)
          .then((response) => {
            console.log(response.data)
          }).catch(function (response) {
            console.log(response)
          })
    },
    stepShow: function(data){
      console.log(data)
      // if(data == 1){
        
      //   this.formItem.radio4 = '';

      //   this.analysisVideoInfos.substep = true;
      //   this.isStepShow = false;
      //   this.knowledgesId = this.analysisVideoInfos.knowledgePoint.konwledgePointId = this.analysisVideoInfos.knowledgePoint.knowledgePointLevelId = '';
      //   this.formItem.modal = true;
      //   this.formItem.radio2 = '';
      // }else{
      //   this.isStepShow = true;
      //   this.formItem.modal = false;
      // }
    },
    fileOnChange0: function(data,index,type){//上传选择题答案
      var that = this;
      var fileId = "userfile"+data.id;
      var keyId = "keyFile"+data.id;
      var _str;
      that.inputLists[index].selectedFile = $("#"+fileId).val();
      that.inputLists[index].urlFile = '';
      _str = that.inputLists[index].selectedFile.split(".");
      if(type.indexOf(_str[_str.length -1]) != -1){
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
            var str,strurl;
            if (res.key) {
              strurl = 'http://otslefigw.bkt.clouddn.com/' + res.key;
              str = 'URL：' + strurl;
            }
            that.inputLists[index].urlFile = str;
            var answerItem = new Object();
            answerItem.content = strurl;
            answerItem.number = index;
            answerItem.type = that.formItem.answerFormat2;
            that.analysisVideoInfos.optionQuestionAanswer.push(answerItem);
          },
          error: function(res) {  
            console.log("失败:" +  JSON.stringify(res));
            that.inputLists[index].urlFile ='上传失败：' + res.responseText;
          }
        });
      }else{
        that.$message.error("上传文件格式为：" + type);
      }
      return false;
    },
    fileOnChange1: function(data,index,type){//其他上传文件
      var that = this;
      var _str;
      var fileId = "userfile"+data.id;
      var keyId = "keyFile"+data.id;
      that.uploadFiles[index].oSelectedFile = '';
      that.uploadFiles[index].progressFile = '';
      that.uploadFiles[index].urlFile = '';
      that.uploadFiles[index].selectedFile = $("#"+fileId).val();
      _str = that.uploadFiles[index].selectedFile.split(".");
      if(type.indexOf(_str[_str.length -1]) != -1){
        if (that.uploadFiles[index].selectedFile) {
          var ramdomName = Math.random().toString(36).substr(2) + that.uploadFiles[index].selectedFile.match(/\.?[^.\/]+$/);
          $("#"+keyId).val(ramdomName);
          that.uploadFiles[index].oSelectedFile = '文件：' + that.uploadFiles[index].selectedFile;
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
                if (e.lengthComputable) {
                  var percent = e.loaded/e.total*100;
                  that.uploadFiles[index].progressFile = '上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%";
                }
              }, false);
            }
            return myXhr;
          },
          success: function(res) {
            console.log("成功：" + JSON.stringify(res));
            var str,strurl;
            if (res.key) {
              strurl = 'http://otslefigw.bkt.clouddn.com/' + res.key;
              str = 'URL：' + strurl;
            }
            console.log(str)
            that.uploadFiles[index].urlFile = str;
            if(index == 0){
              that.analysisVideoInfos.questionUrl = strurl;
            }else if( index == 1){
              that.analysisVideoInfos.answer = strurl;
            }else if( index == 2){
              that.analysisVideoInfos.pictureAttchmentUrl = strurl;
            }else if( index == 3){
              that.analysisVideoInfos.videoUrl = strurl;
            }
          },
          error: function(res) {  
            console.log("失败:" +  JSON.stringify(res));
            that.uploadFiles[index].urlFile ='上传失败：' + res.responseText;
          }
        });
      }else{
        that.$message.error("上传文件格式为：" + type);
      }
      return false;
    }
  }
}
</script>

<style>

.uploadFile{ float: left; margin:0 0 50px 100px; }
.fileInfo{ margin: 5px 0 0 30px; }
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
.w130 .ivu-input, .ivu-modal .ivu-select{ width:130px; }
.w200 .ivu-select{ width:200px; }
.typeTextarea .ivu-input-wrapper{ width: 270px; }
.borderDashed{ border: 1px dashed #f00 }
</style>