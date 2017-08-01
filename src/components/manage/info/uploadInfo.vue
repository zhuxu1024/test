<template>
<div class="mInfo manageCon fRight">
    <infoNav :page="this.$route.params.page"></infoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form :model="formItem" :label-width="100">
         <Form-item label="选择省市区">
            <Select v-model="selectValueCity" @on-change="onChangeCity">
                <Option :value="addCity.id" :key="addCity.id">{{addCity.name}}</Option>
            </Select>
            <Select v-model="selectValue" @on-change="onChange">
                <Option v-for="item in schoolInfos" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </Form-item>
        <!-- <Form-item label="填写学校名称">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="选择年级">
            <Checkbox-group v-model="formItem.checkbox">
                <Checkbox label="6年级"></Checkbox>
                <Checkbox label="7年级"></Checkbox>
                <Checkbox label="8年级"></Checkbox>
            </Checkbox-group>
        </Form-item> -->
        <Form-item label="选择文件">
            <Upload 
                :on-success="Success" 
                :format="['csv']"
                :on-format-error="formatError"
action="http://139.196.164.112:9988/v1/students/upload?containerId=101001&token=c7f53fac-b74e-4770-99bc-2955edf70193">
                <Button type="ghost">选择上传文件.CSV</Button>
            </Upload>
            <div v-if="file !== null">待上传文件：{{ file }}</div>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="addStudentSubmit" :loading="loadingStatus">提交</Button>
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
        file: null,
        loadingStatus: false,
        
        addCity:{
            id:'101',
            name:'上海市',
            type:null
        },
        addStudentData:{
            containerId:'',
            file:''
        },
        selectValueCity:'',
        schoolInfos:[],
        selectValue:'',
        userToken:'',
        formItem: {
            input: '',
            select: '',
            radio: 'male',
            checkbox: [],
            switch: true,
            date: '',
            time: '',
            slider: [20, 50],
            textarea: ''
        }
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    // console.log(userInfo);
    this.userToken = userInfo.token; 
    console.log(this.userToken)
    // this.$http.get('http://139.196.164.112:9988/v1/locations?parentId=101')
    //   .then((response) => {
    //     console.log(response.data)
    //     this.schoolInfos = response.data;
    //   }).catch(function (response) {
    //     console.log(response)
    //   })
  },
  methods:{
    onChange: function(data){//点击下拉框取值on-change返回值默认是option中value;
        this.containerId = data;
        console.log(this.containerId)
    },
    onChangeCity: function(data){//获取地区
        console.log(data)
        this.$http.get('http://139.196.164.112:9988/v1/locations?parentId='+data)
          .then((response) => {
            console.log(response.data)
            this.schoolInfos = response.data;
          }).catch(function (response) {
            console.log(response)
          })
    },
    addStudentSubmit: function(){
        this.loadingStatus = true;
        // that.$http.post('http://139.196.164.112:9988/v1/students/upload?token='+that.userToken, that.addStudentData).then((response) => {
        //     console.log(response.data)//返回值;
        //   }).catch(function (response) {
        //     console.log(1)
        //     console.log(response)
        //   })
          
        setTimeout(() => {
            this.file = null;
            this.loadingStatus = false;
            this.$Message.success('上传成功')
        }, 1500);
    },
    formatError: function(file){
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传csv格式的文件。'
        });
    },
    handleUpload (file) {
        this.file = file.name;
        return false;
    },
    Success: function(response){
        console.log(response)
    }
  }
}
</script>

<style>

</style>