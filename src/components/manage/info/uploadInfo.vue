<template>
<div class="mInfo manageCon fRight">
    <infoNav :page="this.$route.params.page"></infoNav><!-- 导航 -->
    <div class="tabCon cfix">
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
                <Checkbox label="7年级"></Checkbox>
                <Checkbox label="8年级"></Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item label="选择文件">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost">选择上传文件.CSV</Button>
            </Upload>
        </Form-item>
        <Form-item>
            <Button type="primary">提交</Button>
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
  }
}
</script>

<style>

</style>