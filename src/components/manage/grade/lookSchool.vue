<template>
<div class="mGrade manageCon fRight">
    <gradeNav :page="this.$route.params.page"></gradeNav><!-- 导航 -->
    <div class="mLookSchool cfix">
    <Menu :theme="theme2" active-name="1-1" :open-names="['1']" accordion class="fLeft">
        <Submenu name="1">
            <template slot="title">
                徐汇区
            </template>
            <Menu-item name="1-1">七宝二中</Menu-item>
            <Menu-item name="1-2">鹤北中学</Menu-item>
            <Menu-item name="1-3">七宝中学</Menu-item>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                宝山区
            </template>
            <Menu-item name="1-1">七宝二中</Menu-item>
            <Menu-item name="1-2">鹤北中学</Menu-item>
            <Menu-item name="1-3">七宝中学</Menu-item>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                长宁区
            </template>
            <Menu-item name="1-1">七宝二中</Menu-item>
            <Menu-item name="1-2">鹤北中学</Menu-item>
            <Menu-item name="1-3">七宝中学</Menu-item>
        </Submenu>
    </Menu>
    <Form class="fLeft studentInfoRight">
    	<Form-item label="选择年级">
            <Checkbox-group v-model="checkbox">
                <Checkbox label="6年级"></Checkbox>
                <Select v-model="model_6" style="width:100px; margin-right:15px;"><Option v-for="item in num_6" :value="item" :key="item">{{ item }}</Option></Select>
                <Checkbox label="7年级"></Checkbox>
                <Select v-model="model_7" style="width:100px; margin-right:15px;"><Option v-for="item in num_7" :value="item" :key="item">{{ item }}</Option></Select>
                <Checkbox label="8年级"></Checkbox>
                <Select v-model="model_8" style="width:100px; margin-right:15px;"><Option v-for="item in num_8" :value="item" :key="item">{{ item }}</Option></Select>
            </Checkbox-group>
        </Form-item>
        <Form-item>
            <Button type="primary">修改</Button>
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
      theme2: 'light',
      checkbox: [],
	  num_6: [1,2,3,4,5,6,7,8,9,10],
	  num_7: [1,2,3,4,5,6,7,8,9,10],
	  num_8: [1,2,3,4,5,6,7,8,9,10],
	  model_6: '',
	  model_7: '',
	  model_8: ''
    }
  }
}
</script>

<style>
.mLookSchool{ background: #fff; padding-top: 10px; height: 590px;}
.mLookSchool ul.fLeft, .studentInfoRight{ height: 580px; }
.mLookSchool .ivu-menu-vertical.ivu-menu-light:after{ background: none; }
.mLookSchool .ivu-menu-light{ background: #eee; border:1px solid #e5e5e5; margin-right: 20px; }
.studentInfoRight{ width: 670px; background: #eee; padding: 14px 0 0 24px;}
</style>