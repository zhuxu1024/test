<template>
<div class="mGrade manageCon fRight">
    <testNav :page="this.$route.params.page"></testNav><!-- 导航 -->
    <div class="mAddSchool tabCon cfix">
     <Form :model="formItem" :label-width="100">
        <Form-item label="选择省市区">
            <Select v-model="formItem.select" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </Form-item>
        <Form-item label="填写学校名称">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="选择年级">
            <Checkbox-group v-model="formItem.checkbox">
                <Checkbox label="6年级"></Checkbox>
                <Select v-model="model_6" style="width:100px; margin-right:15px;"><Option v-for="item in num_6" :value="item" :key="item">{{ item }}</Option></Select>
                <Checkbox label="7年级"></Checkbox>
                <Select v-model="model_7" style="width:100px; margin-right:15px;"><Option v-for="item in num_7" :value="item" :key="item">{{ item }}</Option></Select>
                <Checkbox label="8年级"></Checkbox>
                <Select v-model="model_8" style="width:100px; margin-right:15px;"><Option v-for="item in num_8" :value="item" :key="item">{{ item }}</Option></Select>
            </Checkbox-group>
        </Form-item>
        <Form-item>
            <Button type="primary">提交</Button>
        </Form-item>
    </Form>
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
    	},
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

</style>