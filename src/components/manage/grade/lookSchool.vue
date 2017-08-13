<template>
<div class="mGrade manageCon fRight">
    <gradeNav :page="this.$route.params.page"></gradeNav><!-- 导航 -->
    <div class="mLookSchool tabCon">
        <Form :label-width="100">
        	<Form-item label="选择学校">
                <Select style="margin-right: 10px;" v-for="LinkageInfo in LinkageInfos" :value="LinkageInfo.id" :key="LinkageInfo.id" v-model="LinkageInfo.selValue" @on-change="onChangeCity(LinkageInfo)" :placeholder="'请'+LinkageInfo.title">
                    <Option v-for="arrayList in LinkageInfo.arrayLists" :value="arrayList.id" :key="arrayList.id">{{arrayList.name}}</Option>
                </Select>
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
        containnerId:'',
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
        ]
    }
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
        }
    } 
  }
}
</script>

<style>
.mLookSchool ul.fLeft, .studentInfoRight{ height: 580px; }
.mLookSchool .ivu-menu-vertical.ivu-menu-light:after{ background: none; }
.mLookSchool .ivu-menu-light{ background: #eee; border:1px solid #e5e5e5; margin-right: 20px; }
</style>