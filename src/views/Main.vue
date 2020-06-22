<template>
<el-scrollbar style="width:100%;height:calc(100% - 17px);">
	<section  class="main-container">
		
			<div  class="main-container-item" @click="newEnroll">
				<div class="main-container-item-top new-enroll">
					<p class="new-enroll-title">新建报名</p>
					<p class="new-enroll-tip">自定义报名信息</p>
					<i class="iconfont">&#xe636;</i>
				</div>
				<div class="main-container-item-bottom">
					新建报名
				</div>
			</div>
			<div  class="main-container-item" @click="enrollManage">
				<div class="main-container-item-top enroll-manage">
					<p class="enroll-manage-title">报名管理与审核</p>
					<p class="enroll-manage-tip">
						报名活动管理<br/>报名人员审核
					</p>
					<i class="iconfont">&#xe642;</i>
				</div>
				<div class="main-container-item-bottom">
					报名管理与审核
				</div>
			</div>
		
	</section>
</el-scrollbar>
</template>

<script>
	import "@/assets/iconfonts/iconfont.css"
	export default {
		data(){
			return{

			}
		},
		methods:{
			newEnroll(){
				this.$router.push(
					{
						path:"/newenroll",
						query:{
							type:"add"
						}
					}
				)
			},
			enrollManage(){
				this.$router.push({path:"/enrollmanage"})
			}
		}
	}
</script>
<style >
.el-scrollbar__view{
	width: 100%;
	height: 100%;
}
</style>
<style scoped lang="scss">
@media  (min-width: 1px) {
	.el-icon-s-tools,.iconfont{
		font-size: 10vw;
	}
	.new-enroll-title{
		font-size: 5.4vw;
	}
	.new-enroll-tip{
		font-size: 2.4vw;
	}
	.enroll-manage-title{
		font-size: 5.4vw;
	}
	.enroll-manage-tip{
		font-size: 2.4vw;
	}
	.main-container-item-bottom{
		font-size: 2.4vw;
		font-weight: 600;
	}
}
@media  (min-width: 414px) {
	.el-icon-s-tools,.iconfont{
		font-size: 7vw;
	}
	.new-enroll-title{
		font-size: 3.2vw;
	}
	.new-enroll-tip{
		font-size: 2.2vw;
	}
	.enroll-manage-title{
		font-size: 3.2vw;
	}
	.enroll-manage-tip{
		font-size: 2.2vw;
	}
	.main-container-item-bottom{
		font-size: 2.2vw;
		font-weight: 600;
	}
}
@media  (min-width: 769px) {
	.el-icon-s-tools,.iconfont{
		font-size: 6.5vw;
	}
	.new-enroll-title{
		font-size: 3vw;
	}
	.new-enroll-tip{
		font-size: 2vw;
	}
	.enroll-manage-title{
		font-size: 3vw;
	}
	.enroll-manage-tip{
		font-size: 2vw;
	}
	.main-container-item-bottom{
		font-size: 2vw;
		font-weight: 600;
	}
}
@media (min-width: 1024px){
body{font-size: 18px}
.el-icon-s-tools,.iconfont{
		font-size: 6vw;
	}
	.new-enroll-title{
		font-size: 2.8vw;
	}
	.new-enroll-tip{
		font-size: 1.8vw;
	}
	.enroll-manage-title{
		font-size: 2.8vw;
	}
	.enroll-manage-tip{
		font-size: 1.8vw;
	}
	.main-container-item-bottom{
		font-size: 1.8vw;
		font-weight: 600;
	}
} /*>=1024的设备*/

@media (min-width: 1100px) {
body{font-size: 20px}
.el-icon-s-tools,.iconfont{
		font-size: 5.5vw;
	}
	.new-enroll-title{
		font-size: 2.6vw;
	}
	.new-enroll-tip{
		font-size: 1.6vw;
	}
	.enroll-manage-title{
		font-size: 2.6vw;
	}
	.enroll-manage-tip{
		font-size: 1.6vw;
	}
	.main-container-item-bottom{
		font-size: 1.6vw;
		font-weight: 600;
	}
} /*>=1024的设备*/
@media (min-width: 1280px) {
body{font-size: 22px;}
.el-icon-s-tools,.iconfont{
		font-size: 5vw;
	}
	.new-enroll-title{
		font-size: 2.4vw;
	}
	.new-enroll-tip{
		font-size: 1.4vw;
	}
	.enroll-manage-title{
		font-size: 2.4vw;
	}
	.enroll-manage-tip{
		font-size: 1.4vw;
	}
	.main-container-item-bottom{
		font-size: 1.4vw;
		font-weight: 600;
	}
} 

@media (min-width: 1366px) {

body{font-size: 24px;}
.el-icon-s-tools,.iconfont{
		font-size: 4.5vw;
	}
	.new-enroll-title{
		font-size: 2.2vw;
	}
	.new-enroll-tip{
		font-size: 1.2vw;
	}
	.enroll-manage-title{
		font-size: 2.2vw;
	}
	.enroll-manage-tip{
		font-size: 1.2vw;
	}
	.main-container-item-bottom{
		font-size: 1.2vw;
		font-weight: 600;
	}
}  

@media (min-width: 1440px) {
.el-icon-s-tools,.iconfont{
		font-size: 4vw;
	}
	.new-enroll-title{
		font-size: 2vw;
	}
	.new-enroll-tip{
		font-size: 1vw;
	}
	.enroll-manage-title{
		font-size: 2vw;
	}
	.enroll-manage-tip{
		font-size: 1vw;
	}
	.main-container-item-bottom{
		font-size: 1vw;
		font-weight: 600;
	}

} 

@media (min-width: 1680px) {
body{font-size: 28px;}
.el-icon-s-tools,.iconfont{
		font-size: 5vw;
	}
	.new-enroll-title{
		font-size: 1.6vw;
	}
	.new-enroll-tip{
		font-size: 1vw;
	}
	.enroll-manage-title{
		font-size: 1.6vw;
	}
	.enroll-manage-tip{
		font-size: 1vw;
	}
	.main-container-item-bottom{
		font-size: 1vw;
		font-weight: 600;
	}
} 
@media (min-width: 1920px) {
	body{font-size: 33px;}
.el-icon-s-tools,.iconfont{
		font-size: 4vw;
	}
	.new-enroll-title{
		font-size: 1.5vw;
	}
	.new-enroll-tip{
		font-size: 1vw;
	}
	.enroll-manage-title{
		font-size: 1.5vw;
	}
	.enroll-manage-tip{
		font-size: 1vw;
	}
	.main-container-item-bottom{
		font-size: 1vw;
		font-weight: 600;
	}
} 

.main-container{
	width: 100%;
	height: 100%;
	display: flex;

	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	&-item{
		width: 35vh;
		height: 35vh;
		min-width: 300px;
		min-height: 300px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		-webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		-moz-box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		margin: 1vw;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		overflow: hidden;
		&-top{
			height: 80%;
			color: #fff;
			padding: 5% 10%;
		}
		&-bottom{
			width: 100%;
			height: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgb(102, 102, 102);
		}
		.new-enroll{
			position: relative;
			background: -webkit-linear-gradient(90deg, rgba(0, 255, 255, 1) 0%, rgba(2, 167, 240, 1) 100%);
			background: -moz-linear-gradient(0deg, rgba(0, 255, 255, 1) 0%, rgba(2, 167, 240, 1) 100%);
			background: linear-gradient(0deg, rgba(0, 255, 255, 1) 0%, rgba(2, 167, 240, 1) 100%);
			&-title{
			  font-weight: 600;
			}
			.iconfont{
			position: absolute;
			right: 2%;
			bottom: 2%;
			}
		}
		.enroll-manage{
			position: relative;
			background: -webkit-linear-gradient(0deg, rgba(194, 128, 255, 1) 0%, rgba(2, 167, 240, 1) 100%);
			background: -moz-linear-gradient(90deg, rgba(194, 128, 255, 1) 0%, rgba(2, 167, 240, 1) 100%);
			background: linear-gradient(90deg, rgba(194, 128, 255, 1) 0%, rgba(2, 167, 240, 1) 100%);
			&-title{
			  font-weight: 600;
			}
			.iconfont{
			position: absolute;
			right: 2%;
			bottom: 2%;
			}
		}
		
		
	}
	&-item:hover{
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
	}
}
</style>