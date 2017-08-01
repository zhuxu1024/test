// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App'
import routes from './router/index'
import $ from 'jquery';
import VueResource from 'vue-resource';
import VueFileUpload from 'vue-file-upload';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueResource);

Vue.config.productionTip = false

// Vue.use(VueRouter);

Vue.use(iView);
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


new Vue({
  el: '#dlBox',
  router,
  template: '<App/>',
  components: { App }
})