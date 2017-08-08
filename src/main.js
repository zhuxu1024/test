// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App'
import routes from './router/index'
import $ from 'jquery';
import VueResource from 'vue-resource';
import VueFileUpload from 'vue-file-upload';
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueResource);

Vue.config.productionTip = false

// Vue.use(VueRouter);

Vue.use(iView);
Vue.use(VueFileUpload);
Vue.use(Element);
const router = new VueRouter({
	routes
})

 // // 全局导航钩子
 // router.beforeEach((to, from, next) => {
 // 	const userName = localStorage.getItem('userName')
 // 	if (to.meta.requiresAuth) {
 // 		if(userName) {   
 // 			next();
 // 		}
 // 		else { 
 // 			next({
 // 				path: '/user/login',
 //                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
 //            })
 // 		}
 // 	}
 // 	else {
 // 		next();
 // 	}
 // })

// $(function(){
//   console.log(1)
//   var $key = $('#key');  // file name    eg: the file is image.jpg,but $key='a.jpg', you will upload the file named 'a.jpg'
//   var $userfile = $('#userfile');  // the file you selected
// console.log($userfile)
// console.log($key)
//   // upload info
//   var $selectedFile = $('.selected-file');
//   var $progress = $(".progress");
//   var $uploadedResult = $('.uploaded-result');

//   $("#userfile").change(function() {  // you can ues 'onchange' here to uplpad automatically after select a file
//     $uploadedResult.html('');
//     var selectedFile = $userfile.val();
//     if (selectedFile) {
//       // randomly generate the final file name
//       var ramdomName = Math.random().toString(36).substr(2) + $userfile.val().match(/\.?[^.\/]+$/);
//       $key.val(ramdomName);
//       $selectedFile.html('文件：' + selectedFile);
//     } else {
//       return false;
//     }
//     var f = new FormData(document.getElementById("testform"));
//     $.ajax({
//       url: 'http://upload.qiniu.com/',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
//       type: 'POST',
//       data: f,
//       processData: false,
//       contentType: false,
//       xhr: function(){
//         const myXhr = $.ajaxSettings.xhr();  
//         if(myXhr.upload){
//           myXhr.upload.addEventListener('progress',function(e) {
//             // console.log(e);
//             if (e.lengthComputable) {
//               var percent = e.loaded/e.total*100;
//               $progress.html('上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%");
//             }
//           }, false);
//         }
//         return myXhr;
//       },
//       success: function(res) {
//         console.log("成功：" + JSON.stringify(res));
//         var str;
//         if (res.key) {
//           str = 'http://otslefigw.bkt.clouddn.com/' + res.key;
//         }
//         $uploadedResult.html(str);
//       },
//       error: function(res) {  
//         console.log("失败:" +  JSON.stringify(res));
//         $uploadedResult.html('上传失败：' + res.responseText);
//       }
//     });
//     return false;
//   });
// });
new Vue({
  el: '#dlBox',
  router,
  template: '<App/>',
  components: { App }
})