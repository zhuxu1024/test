<template>
<div class="mInfo manageCon fRight">
    <infoNav :page="this.$route.params.page"></infoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form :model="formItem" :label-width="100">
        <Form-item label="选择省市区">
            <Select v-model="formItem.selectArea" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </Form-item>
        <Form-item label="选择学校名称">
            <Select v-model="formItem.selectSchool" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
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
            <Button type="primary">查询</Button>
        </Form-item>
    </Form>
    <div class="layout">
    
        <Row class="layoutTitle">
            <i-col span="12"><div class="layout-content-main borderRight">学生名单</div></i-col>
            <i-col span="12"><div class="layout-content-main">学生详情</div></i-col>
        </Row>
        <Row>
            <i-col span="6">
                <Table highlight-row :columns="columns3" :data="data1"></Table>
            </i-col>
            <i-col span="18">
                <div class="layout-content-main">
                    <Form :model="formItem" :label-width="100">
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
            </i-col>
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
      formItem: {
        input: '',
        selectArea: '',
        selectSchool: '',
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
	    model_8: '',
        columns3: [
                    {
                        title: '学号',
                        key: 'number'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    }
                ],
                data1: [
                    {
                        number: '0501',
                        name: '张三',
                        sex: '男'
                    },
                    {
                        number: '0501',
                        name: '张三',
                        sex: '男'
                    },
                    {
                        number: '0501',
                        name: '张三',
                        sex: '男'
                    },
                    {
                        number: '0501',
                        name: '张三',
                        sex: '男'
                    },
                ]
    }
  }
}
</script>

<style>
    .layout{border: 1px solid #d7dde4; background: #fff;}
    .layoutTitle{text-align: center; border-bottom:1px solid #d7dde4; background: #f5f7f9;}
    .borderRight{border-right:1px solid #d7dde4;}
    .layout-content-main{padding: 10px;}
    .layout .ivu-table-wrapper{border:none;}
    .layout .ivu-table th{ background:#fff; }
    .ivu-table:before{ height: 0; }
</style>