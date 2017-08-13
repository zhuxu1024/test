<template>
<div class="mInfo manageCon fRight">
    <infoNav :page="this.$route.params.page"></infoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form v-model="addStudentData" :label-width="100">
         <Form-item label="选择省市区" prop="containnerId">
            <Select style="margin-right: 10px;" v-for="LinkageInfo in LinkageInfos" :value="LinkageInfo.id" :key="LinkageInfo.id" v-model="LinkageInfo.selValue" @on-change="onChangeCity(LinkageInfo)" :placeholder="'请'+LinkageInfo.title">
                <Option v-for="arrayList in LinkageInfo.arrayLists" :value="arrayList.id" :key="arrayList.id">{{arrayList.name}}</Option>
            </Select>
        </Form-item>
        <el-upload
          class="upload-demo ml100"
          ref="upload"
          name='file'
          :data="addStudentData"
          :action="'http://139.196.164.112:9988/v1/students/upload?token='+userToken"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePreview"
          :on-success="Success" 
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取上传文件</el-button>
        </el-upload><!-- 192.168.1.199 -->
        <Form-item>
            <Button type="primary" @click="submitUpload">提交</Button>
        </Form-item>
    </Form>
  </div>
</div>
</template>

<script>
import infoNav from './infoNav';
export default {
  name: 'mInfo',
  components: {
    infoNav
  },
  data () {
    return {
        addStudentData:{
            containerId:''
        },
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
            }
        ],
        userToken:'',
        fileName:''
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    this.userToken = userInfo.token; 
    //console.log(this.userToken)
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
                //console.log(response)
            })
        }
        if( i == that.LinkageInfos.length){
          that.addStudentData.containerId = data.selValue;
        }
        //console.log(that.addStudentData.containerId)
    },
    beforeAvatarUpload: function(file) {
      //console.log(file)
      this.fileName = file.name;
      //console.log(this.fileName)
      if (file.type != 'application/vnd.ms-excel') {
        this.$message.error('上传文件只能是 CSV 格式!');
        return false;
      }
    },
    submitUpload: function() {
      //console.log(this.fileName)
      //console.log(this.addStudentData.containerId)
      if( this.addStudentData.containerId != ''){
        this.$refs.upload.submit();
        //console.log(this.addStudentData)
      }else{
        this.$message.error('请填写完整表单信息!');
      }  
    },
    handlePreview: function(file){
      console.log(1)
      console.log(file.response)
    },
    Success: function(response){

      console.log(response)
        if(response.failedEntryCount == 0){
          this.$notify.info({
            title: '上传成功！',
            message: '上传成功'+response.successEntryCount+'条，'+response.detailLog,
            duration: 0
          });
        }else{
          this.$notify.info({
            title: '上传详细信息',
            message: '上传成功'+response.successEntryCount+'条，上传失败'+response.failedEntryCount+'条，详细信息'+response.detailLog,
            duration: 0
          });
        }
    }
  }
}
</script>

<style>
.ivu-btn-primary, .el-button--primary{ width: 100px; height: 30px;}
.el-button--primary{ background: #c4c4c4; border: none; }
.ml100{ min-height: 100px; margin-left: 100px; }
</style>