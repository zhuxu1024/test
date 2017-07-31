import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/user/login'
import Reg from '@/components/user/reg'
import StudentIndex from '@/components/student/index'
import StudentDetail from '@/components/student/detail'
import Manage from '@/components/manage/index'
import AddGrade from '@/components/manage/grade/addSchool'
import LookGrade from '@/components/manage/grade/lookSchool'
import UploadInfo from '@/components/manage/info/uploadInfo'
import LookInfo from '@/components/manage/info/lookInfo'
import AddTest from '@/components/manage/test/addTest'
import LookTest from '@/components/manage/test/lookTest'
import AnalysisVideoTest from '@/components/manage/testAnalysis/analysisVideo'
import KnowledgeVideoTest from '@/components/manage/testAnalysis/knowledgeVideo'
import VueVideoPlayer from 'vue-video-player'

Vue.use(Router)
Vue.use(VueVideoPlayer)
export default [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/student/index/:num?',
      name: 'StudentIndex',
      //meta: { requiresAuth: true },
      component: StudentIndex
    },
    {
      path: '/student/detail/:id?/:subjectid?',
      name: 'StudentDetail',
      component: StudentDetail
    },
    {
      path: '/manage/index',
      name: 'Manage',
      component: Manage,
      children: [
        {
          path: '/grade/addSchool/:index?/:page?',
          name: 'AddGrade',
          component: AddGrade
        },
        {
          path: '/grade/lookSchool/:index?/:page?',
          name: 'LookGrade',
          component: LookGrade
        },
        {
          path: '/info/uploadInfo/:index?/:page?',
          name: 'UploadInfo',
          component: UploadInfo
        },
        {
          path: '/info/lookInfo/:index?/:page?',
          name: 'LookInfo',
          component: LookInfo
        },
        {
          path: '/test/addTest/:index?/:page?',
          name: 'AddTest',
          component: AddTest
        },
        {
          path: '/test/lookTest/:index?/:page?',
          name: 'LookTest',
          component: LookTest
        },
        {
          path: '/testAnalysis/analysisVideo/:index?/:page?',
          name: 'AnalysisVideoTest',
          component: AnalysisVideoTest
        },
        {
          path: '/testAnalysis/knowledgeVideo/:index?/:page?',
          name: 'KnowledgeVideoTest',
          component: KnowledgeVideoTest
        }
      ]
    }
  ]
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/user/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/user/reg',
//       name: 'Reg',
//       component: Reg
//     },
//     {
//       path: '/student/index',
//       name: 'Index',
//       //meta: { requiresAuth: true },
//       component: Index
//     }
//   ]
// })
