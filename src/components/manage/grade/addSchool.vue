<template>
<div class="mGrade manageCon fRight">
    <gradeNav :page="this.$route.params.page"></gradeNav><!-- 导航 -->
    <div class="mAddSchool tabCon cfix">
     <Form :label-width="100">
        <Form-item label="选择省市区">
            <Select style="margin-right: 10px;" v-for="LinkageInfo in LinkageInfos" :value="LinkageInfo.id" :key="LinkageInfo.id" v-model="LinkageInfo.selValue" @on-change="onChangeCity(LinkageInfo)" :placeholder="'请'+LinkageInfo.title">
                <Option v-for="arrayList in LinkageInfo.arrayLists" :value="arrayList.id" :key="arrayList.id">{{arrayList.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="填写学校名称">
            <Input v-model="addSchoolData.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="选择年级">
            <Checkbox-group v-for="item in formItem" :key="item.id" class="fLeft" @on-change="getClass(item)">
                <Checkbox :label="item.id+'年级'" v-model="item.single"></Checkbox>
                <Select v-model="item.model" style="width:100px; margin-right:15px;">
                    <Option v-for="classItem in item.classList" :value="classItem" :key="classItem">{{ classItem }}</Option>
                </Select>
            </Checkbox-group>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="addSchoolSubmit">提交</Button>
        </Form-item>
    </Form>
  </div>
</div>
</template>

<script>
import gradeNav from './gradeNav';
export default {
  name: 'mGrade',
  components: {
    gradeNav
  },
  data () {
    return {
        addSchoolData:{
            areaId: "",
            classConfig: [],
            name: ""
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
        formItem: [
            {
                id:6,
                classList:[],
                model:'',
                single:false
            },
            {
                id:7,
                classList:[],
                model:'',
                single:false
            },
            {
                id:8,
                classList:[],
                model:'',
                single:false
            }
        ]
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
          that.addSchoolData.areaId = data.selValue;
        }
        console.log(that.addSchoolData.areaId)
    },
    getClass: function(data){
        if(data.single){
            for(var i = 1; i<=10; i++){
                data.classList.push(i);
            } 
        }else{
            data.classList = [];
        }               
    },
    addSchoolSubmit: function(){
        var that = this;
        var _msg = '';
        var _is_select = false;
        that.formItem.forEach( function(element, index) {
            if( (element.single && element.model == '') || (!element.single && !_is_select) ){
                that.addSchoolData.classConfig = [];
                _msg = '请选择班级!';
                return false;
            }else if( element.single && element.model != '' ){
                _msg = '';
                _is_select = true;
                var item = new Object();
                item.gradeName = element.id+'年级';
                item.classCount = element.model;
                that.addSchoolData.classConfig.push(item);
            }
        });

        if( that.addSchoolData.areaId == '' ){
            that.$message.error('请选择省市区!');
        }else if( that.addSchoolData.name == ''){
            that.$message.error('请填写学校名称!');
        }else if( _msg ){ 
            that.$message.error(_msg);
        }else{
            console.log(that.addSchoolData)
            that.$http.post('http://139.196.164.112:9988/v1/school/init?token='+this.userToken, that.addSchoolData).then((response) => {
                that.$message.success('提交成功！');
                that.addSchoolData.name = '';
                for( var i = 0; i<that.formItem.length; i++){
                    that.formItem[i].single = false;
                    that.formItem[i].classList = [];
                    that.formItem[i].model = '';
                }
                for( var i =0; i<that.LinkageInfos.length; i++){
                    that.LinkageInfos[i].selValue = '';
                }
              }).catch(function (response) {
                that.$message.error(response.data.message);
              })
        }
    }
  }
}
</script>

<style>

</style>