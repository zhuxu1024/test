<template>
  <div class="home">
   <!-- <router-link to="/user/login">登录</router-link><br>
   <router-link to="/user/reg">注册</router-link><br>
   <router-link :to="{name:'AddGrade',params: {index: 1,page: 0}}">后台管理</router-link>
   <router-view></router-view>  -->
    <div class="home_page">
    	<div class="home_header">
            <div class="home_nav wd_1200">
                <div class="home_logo"><img src="../static/img/home_logo.png" alt="教宜优"></div>
                <ul>
                    <li><a href="#home_wraper_two">产品优势</a></li>
                    <li class="ml_110"><a href="#home_wraper_four">关于我们</a></li>
                    <router-link to="/user/reg">
                        <li class="ml_110">
                            <a href="">账号注册</a>
                        </li>
                    </router-link>
                    <router-link to="/user/login">
                        <li class="ml_110">
                            <a class="current">用户登录</a>
                        </li>
                    </router-link>
                </ul>
            </div>
    	</div>
    	<div class="home_wraper">
    		<div class="home_wraper_one">
    			<div class="banner">
                    <Carousel autoplay v-model="value2">
                        <Carousel-item>
                            <div class="demo-carousel">
                              <img src="../static/img/banner1.png" width="100%">
                            </div>
                        </Carousel-item>
                        <Carousel-item>
                            <div class="demo-carousel"><img src="../static/img/banner2.png" width="100%"></div>
                        </Carousel-item>
                        <Carousel-item>
                            <div class="demo-carousel"><img src="../static/img/banner3.png" width="100%"></div>
                        </Carousel-item>
                    </Carousel>
                </div>
    		</div>
    		<div class="home_wraper_two" id="home_wraper_two">
    			<div class="learing wd_1200">
    				<h3>自适应学习</h3>
    				<div class="learing_list mr_165">
    					<img src="../static/img/learning_icon1.png">
    					<h4 class="learning_tit_one">命题组卷</h4>
    					<p>基于测量诊断技术的命题，定制型自动组卷，学科专家带领的专业团队，紧扣教纲、考纲。</p>
    				</div>
    				<div class="learing_list mr_165">
    					<img src="../static/img/learning_icon2.png">
    					<h4 class="learning_tit_two">诊断报告</h4>
    					<p>年级班级个人诊断报告，科学呈现问题，提供最佳解决方案。</p>
    				</div>
    				<div class="learing_list mr_165">
    					<img src="../static/img/learning_icon3.png">
    					<h4 class="learning_tit_three">视频讲解</h4>
    					<p>针对考题和知识点解读分析，理清解题的思路，规范解题流程。</p>
    				</div>
    				<div class="learing_list">
    					<img src="../static/img/learning_icon4.png">
    					<h4 class="learning_tit_four">对应练习</h4>
    					<p>系统算法根据分析报告情况智能生成针对性的练习卷，针对训练有效提高。</p>
    				</div>
    			</div>
    		</div>
    		<div class="home_wraper_three">
    			<div class="expert_team wd_1200">
    				<h3 class="color_fff">专家组成员</h3>
    				<div class="member_one mr_20">
    					<img src="../static/img/member_zhang.png"  alt="">
    					<div class="member_des">
    						<h4>张华华<span>首席测量专家</span></h4>
    						<p>博士，美国伊利诺伊大学香槟分校教育测量系兼心理系和统计系终身教授。<br/>美国教育研究学会终身院士中国教育部长江学者讲座教授前国际教育测量协会主席</p>
    					</div>
    				</div>
    				<div class="member_one mr_20">
    					<img src="../static/img/member_zhangyin.png"  alt="">
    					<div class="member_des">
    						<h4>张殷<span>项目创始人</span></h4>
    						<p>博士，美国印第安纳大学生物统计系终身教授，博导，教育主任。<br/>上海交通大学数学学院客座讲席教授</p>
    					</div>
    				</div>
    				<div class="member_one">
    					<img src="../static/img/member_zheng.png"  alt="">
    					<div class="member_des">
    						<h4>郑蝉金<span>命题负责人</span></h4>
    						<p>伊利诺伊大学香槟分校心理与教育测量统计专业博士、统计学硕士。</p>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div class="home_wraper_four" id="home_wraper_four">
    			<div class="site_intro wd_1200">
    				<h3>教宜优简介</h3>
			     	<p>教宜优智能化学习诊断和评价系统运用基于测量思想的命题技术和智能化组卷技术，通过对学习过程性测试的诊断和分析为学校、老师和学生提供个性化评价报告。</p>
					<p>初中阶段是孩子承上启下，树立良好学习习惯和学习方法的关键时期。目前高校扩招、扩容及多样化招生政策使得高中学生面临的高考压力减轻。而初中升高中仍然以统考为主，同时国家实行压低普通高中录取比例、提升中专中职录取比例的政策让中考成为孩子成长之路上的最大瓶颈。学校、老师、家长为孩子有一个好的前途无不殚精竭虑，耗费无数心血。但题海补课战术往往让孩子筋疲力尽而效果不佳。</p>
     				<p> 教宜优正是看到这个根本“痛点”，集合了教育测量界和初中学科专家，采用世界最先进的测量型考试和同步诊断技术，经过数年艰辛研发，创造了一套闭环的课堂到考试到家长到学生自适应学习模式，破除题海战术。</p>
    
    			</div>
    		</div>
    	</div>
    	<div class="home_footer">
    		<div class="foot wd_1200">
    			<img src="../static/img/foot_logo.png" alt="logo"><br>
    			<span>客服热线：400-6066-600</span><br>
    			<span>2017 教宜优. All Rights Reserved.东琳教育科技有限公司 沪ICP备25059688号</span>
    		</div>
            <Back-top></Back-top>
    	</div>
    </div>
  </div>

</template>
<script>
import banner from '@/components/banner/banner';
export default {
   name: 'Home',
   components: {
    banner
  }
}
</script>

<style>
body{background: #fff;}
.wd_1200{
	width: 1200px;
	margin:0 auto;
}
.color_fff{
	color: #fff
}
.mr_20{
	margin-right: 15px;
}
.mr_165{
	margin-right: 165px;
}
.ml_110{
    margin-left: 110px; 
}
.home_header{
	height: 104px;
	background-color: rgb(255, 255, 255);
	box-shadow: 10px 0px 20px 0px rgba(137, 169, 137, 0.1);
	width: 100%
}
.home_logo{
    height: 50px;
    width: auto;
    float: left;
    margin:27px 0;
}
.current{
    background-color:#b2c920;
    color: #fff!important;
}
.home_nav ul {
    float: right;
    margin:32px 0;
}
.home_nav ul li{
    float: left;
    font-size: 16px;
}
.home_nav ul li a{
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: block;
    border-radius: 20px;
}
.home_nav ul li:hover a{
    
    color: #b2c920;
}
.home_wraper_one{
	width: 100%;
    min-width: 1200px;
	overflow: hidden;
	background: #ff9631;
}
.home_wraper_two{
	width: 100%;
	height: 450px;
}
.home_wraper_three{
	width: 100%;
	height: 450px;
	/* background: -webkit-linear-gradient(left top,#ffc568,#f34747);
	 background: -o-linear-gradient(left top,#ffc568,#f34747);
	 background: -moz-linear-gradient(left top,#ffc568,#f34747);
	 background: linear-gradient(left top,#ffc568,#f34747);  */ 
	 background: url(../static/img/member_bg.png);
}
.home_wraper_four{
	width: 100%;
	height: 450px;
}
.home_footer{
	width: 100%;
	height: 200px;
	background: #1a1c1d;
}
.site_intro{
	font-size: 18px;
	line-height: 40px;
	color: #43484f;
}
.learing h3,
.expert_team h3,
.site_intro h3{
	font-size: 28px;
	line-height: 110px;
	text-align: center;
	letter-spacing: 4px;
}
.site_intro p{
  text-indent:36px;
  color: #5c6066;
 }
 .home_footer{
 	text-align: center;
 	overflow: hidden;
 }
 .home_footer .foot span{
 	color:#899094;
 	line-height: 32px;
 	font-size: 14px;
 }
 .home_footer .foot img{
 	margin-bottom: 10px;
 }
 .home_footer .foot{
 	margin-top: 50px;
 	overflow: hidden;
 }
 .expert_team .member_one{
 	width: 390px;
 	height: 260px;
 	background: #fff;
 	border-radius: 20px;
 	overflow: hidden;
 	float: left;
 	box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
 	transition:all 2s;
	-webkit-transition:all 0.5s;
 }
.expert_team .member_one:hover{
  	box-shadow: 0px 20px 60px 0px rgba(0, 0, 0, 0.3);
  	transform:translate(0px,-3px);
	-ms-transform:translate(0px,-3px); /* IE 9 */
	-webkit-transform:translate(0px,-3px); /* Safari and Chrome */
  }
 .expert_team .member_one img{
 	width: 170px;
 	background: yellow;
 	height: 100%;
 	float: left;
 }
 .expert_team .member_one .member_des{
 	width: 220px;
 	height: 100%;
 	box-sizing: border-box;
 	padding: 30px 20px;
 	float: left;
 }
 .member_des h4{
	font-size: 20px;
	color: #222;
 }
 .member_des h4 span{
 	font-size: 14px;
 	margin-left: 10px;
 }
 .member_des p{
 	font-size: 13px;
 	line-height: 24px;
 	color: #5c6066;
 	margin-top:10px;
 }
 .learing{
	color: #43484f;
 }
 .learing .learing_list{
 	width: 176px;
 	float: left;
 	text-align: center;
 	overflow: hidden;
 }
 .learning_icon1 img{
 	width: 120px;
 	height: 120px;
 }
 .learing .learing_list h4{
 	font-size: 20px;
 	font-weight: bold;
 	line-height: 70px;
 	letter-spacing: 3px;
 }
 .learning_tit_one{
 	color:#45c345;
 }
 .learning_tit_two{
 	color:#fe3f3b;
 }
 .learning_tit_three{
 	color:#0075d9;
 }
 .learning_tit_four{
 	color:#8737f2;
 }
 .learing .learing_list p{
 	line-height: 24px;
 	font-size: 14px;
 	color: #5c6066;
 	text-align: left;
 	letter-spacing: 1px;
 }
 /* banner */
     .banner .ivu-carousel-dots li button{
            background: #fff;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            margin:0 4px;
    }
    .banner .ivu-carousel-dots li.ivu-carousel-active>button{
        width: 26px;
    }
    .banner .ivu-carousel-dots{
        bottom: 20px;
    }
</style>
