<template>
<div class="mInfo manageCon fRight">
    <videoNav :page="this.$route.params.page"></videoNav><!-- 导航 -->
    <div class="tabCon cfix">
     <Form :model="formItem" :label-width="100">
        <Form-item label="选择年级">
            <Radio-group v-model="formItem.radio1">
                <Radio label="0">6年级</Radio>
                <Radio label="1">7年级</Radio>
                <Radio label="2">8年级</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择学科">
            <Radio-group v-model="formItem.radio2">
                <Radio label="0">数学</Radio>
                <Radio label="1">英语</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="选择知识点">
            <Select v-model="knowledgeInfo.selValue" v-for="knowledgeInfo in knowledgeInfos" :key="knowledgeInfo.id" style="width:130px; margin-right: 10px;">
              <Option v-for="knowledge in knowledgeInfo.konwledges" :value="knowledge.id" :key="knowledge.id">{{ knowledge.name }}</Option>
            </Select>
        </Form-item>        
        <Form-item label="选择知识点等级">
          <Checkbox-group v-model="fruit">
            <Checkbox label="A"></Checkbox>
            <Checkbox label="B"></Checkbox>
            <Checkbox label="C"></Checkbox>
          </Checkbox-group>
        </Form-item>
        <div class="cfix">
          <Upload action="//jsonplaceholder.typicode.com/posts/" class="uploadFile">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传知识点视频</Button>
          </Upload>
        </div>
        <Form-item>
            <Button type="primary">点击上传</Button>
        </Form-item>
    </Form>
  </div>
</div>
</template>

<script>
import videoNav from './videoNav';
export default {
  name: 'mInfo',
  components: {
    videoNav
  },
  data () {
    return {
      knowledgeInfos:[
        {
          id:'0',
          konwledges:[
            {
              id:'0',
              name:'aaa'
            },
            {
              id:'1',
              name:'bbb'
            }
          ],
          selValue:''
        },
        {
          id:'1',
          konwledges:[],
          selValue:''
        },
        {
          id:'2',
          konwledges:[],
          selValue:''
        },
        {
          id:'3',
          konwledges:[],
          selValue:''
        }
      ],
      formItem: {
          radio1: '',
          radio2: '',
          radio3: '',
          checkbox: [],         
      },
      fruit: []
    }
  }
}
</script>

<style>
.uploadFile{ float: left; margin:0 0 50px 100px; }
</style>