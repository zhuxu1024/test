<template>
<div class="mGrade manageCon fRight">
    <gradeNav :page="this.$route.params.page"></gradeNav><!-- 导航 -->
    <div class="mAddSchool tabCon cfix">
     <Form :label-width="100">
        <Form-item label="选择省市区">
            <Select v-model="selectValue" @on-change="onChange">
                <Option v-for="item in schoolInfos" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </Form-item>
        <Form-item label="填写学校名称">
            <Input v-model="addSchoolData.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="选择年级">
            <Checkbox-group v-for="item in formItem" :key="item.id" class="fLeft">
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
        schoolInfos:[],
        selectValue:'',
        userToken:'',
        formItem: [
            {
                id:6,
                classList:[1,2,3,4,5,6,7,8,9,10],
                model:'',
                single:false
            },
            {
                id:7,
                classList:[1,2,3,4,5,6,7,8,9,10],
                model:'',
                single:false
            },
            {
                id:8,
                classList:[1,2,3,4,5,6,7,8,9,10],
                model:'',
                single:false
            }
        ]        
    }
  },
  mounted(){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));//存入缓存的string转换成json
    // console.log(userInfo);
    this.userToken = userInfo.token; 
    console.log(this.userToken)
    this.$http.get('http://139.196.164.112:9988/v1/locations?parentId=101')
      .then((response) => {
        console.log(response.data)
        this.schoolInfos = response.data;
      }).catch(function (response) {
        console.log(response)
      })
  },
  methods:{
     onChange: function(data){//点击下拉框取值on-change返回值默认是option中value;
        this.addSchoolData.areaId = data;
    },
    addSchoolSubmit: function(){
        var that = this;
        that.formItem.forEach( function(element, index) {
            if( element.single ){
                var item = new Object();
                item.gradeName = element.id+'年级';
                item.classCount = element.model;
                that.addSchoolData.classConfig.push(item);
            }
        });
        console.log(that.addSchoolData)
        that.$http.post('http://139.196.164.112:9988/v1/school/init?token='+this.userToken, that.addSchoolData).then((response) => {
            console.log(response.data)//返回值;
            var result = response.data;
          }).catch(function (response) {
            console.log(response)
          })
    }
  }
}
</script>

<style>

</style>