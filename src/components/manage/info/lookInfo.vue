<template>
<div class="mInfo manageCon fRight">
    <infoNav :page="this.$route.params.page"></infoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form :model="formItem" :label-width="100">
        <Form-item label="选择班级">
                <Select style="margin-right: 10px;" v-for="LinkageInfo in LinkageInfos" :value="LinkageInfo.id" :key="LinkageInfo.id" v-model="LinkageInfo.selValue" @on-change="onChangeCity(LinkageInfo)" :placeholder="'请'+LinkageInfo.title">
                    <Option v-for="arrayList in LinkageInfo.arrayLists" :value="arrayList.id" :key="arrayList.id">{{arrayList.name}}</Option>
                </Select>
            </Form-item>
        <Form-item>
            <Button type="primary" @click="getStudentList">查询</Button>
        </Form-item>
    </Form>
    <div class="layout">
        <Row>
            <i-col span="24">
                <Table highlight-row :columns="columns3" :data="students"></Table>
            </i-col>
            <!-- <i-col span="16">
                <div class="layout-content-main">
                    <Form :label-width="100">
                        <Form-item label="学生">
                            0501 张三 男
                        </Form-item>
                        <Form-item label="姓名">
                            <Input v-model="formItem.input" placeholder="请输入"></Input>
                        </Form-item>
                        <Form-item label="选择年级">
                            <Checkbox-group v-model="formItem.checkbox">
                                <Select v-model="model_6" style="width:100px; margin-right:15px;"><Option v-for="item in num_6" :value="item" :key="item">{{ item }}</Option></Select>
                                <Select v-model="model_7" style="width:100px; margin-right:15px;"><Option v-for="item in num_7" :value="item" :key="item">{{ item }}</Option></Select>
                                <Select v-model="model_8" style="width:100px; margin-right:15px;"><Option v-for="item in num_8" :value="item" :key="item">{{ item }}</Option></Select>
                            </Checkbox-group>
                        </Form-item>
                        <Form-item>
                            <Button type="primary">修改提交</Button>
                        </Form-item>
                    </Form>
                </div>
            </i-col> -->
        </Row>
    </div>
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
        containnerId:'',
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
          },
          {
            arrayLists:[],
            id:4,
            title:'选择班级',
            selValue:''
          }
        ],
        formItem: {
            checkbox:[],
            input:''
    	},
        num_6: [1,2,3,4,5,6,7,8,9,10],
        num_7: [1,2,3,4,5,6,7,8,9,10],
        num_8: [1,2,3,4,5,6,7,8,9,10],
        model_6: '',
        model_7: '',
        model_8: '',
        columns3: [
            {
                title: '学号',
                key: 'no'
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '性别',
                key: 'gender'
            }
        ],
        students: []
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
        if( i == that.LinkageInfos.length){
          that.containnerId = data.selValue;
          console.log(that.containnerId)
        }
    },
    getStudentList: function(){
        var that = this;
        that.$http.get('http://139.196.164.112:9988/v1/students/queryStudent?token='+this.userToken+'&classId='+that.containnerId)
              .then((response) => {
                console.log(response.data)
                var result = response.data;
                for(var i=0; i<result.length; i++){
                    if(result[i].gender == 0){
                        result[i].gender = '男'
                    }else{
                        result[i].gender = '女'
                    }
                }
                that.students = result;
              }).catch(function (response) {
                console.log(response)
            })
    }
  }
}
</script>

<style>
.layout{ width: 688px; margin-left: 100px; }   
</style>