<template>
	<div class="loginSwap">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		  <h3 class="title">报名系统管理端</h3>
		  <el-form-item prop="account">
		    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
		  </el-form-item>
		  <el-form-item prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
		  </el-form-item>
		  <!-- <div class="login-handle">
		  <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		  <el-link :underline="false" type="primary" class="remember" @click="changePass">忘记密码?</el-link>
		  </div> -->
		  <el-form-item style="width:100%;">
		    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
		    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
		  </el-form-item>
		  <!-- <change-passworld ref="changePass"></change-passworld> -->
		</el-form>
	</div>	
</template>

<script>
	import { requestLogin } from '../api/api';
	  import {Debounce} from '@/utils/index.js'
	export default {
		data(){
			return{
				logining:false,
				ruleForm2:{
					account:'huachen2020',
					checkPass:'password'
				},
				rules2:{
					account:[
						{
							required:true,
							message:'请输入账号',
							trigger:'blur'
						}
					],
					checkPass:[
						{
							required:true,
							message:'请输入密码',
							trigger:'blur'
						}
					],
				},
				checked:true
			}
		},
		methods:{
			// changePass(){
			//   // this.$refs.changePass.setShow()
			//   console.log("修改密码")
			// },
			handleSubmit:Debounce(function(){
				let _this = this;
				this.$refs.ruleForm2.validate((valid)=>{
					if(valid){
						//_this.$router.replace('/table');
						this.logining = true;
						//NProgress.start();
						var loginParams = { account: this.ruleForm2.account, password: this.ruleForm2.checkPass , type:1};//管理员登录传1
						requestLogin(loginParams).then(data => {
							// console.log(data)
						  this.logining = false;
						  //NProgress.done();
						  let { code, msg} = data
						  if (code != 0) {
						    this.$message({
						      message: msg,
						      type: 'error'
						    });
						  } else {
							let { user } = data.data;
						  	let type = data.data.type
						    sessionStorage.setItem('user', JSON.stringify(user));
							sessionStorage.setItem('type', JSON.stringify(type));
						    this.$router.push({ path: '/userAdmin' });
							this.$message({
							  message: "登录成功",
							  type: 'success'
							});
						  }
						});
					}
				})
			},300)
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
	  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	  -webkit-border-radius: 5px;
	  border-radius: 5px;
	  -moz-border-radius: 5px;
	  background-clip: padding-box;
	  margin: 180px auto;
	  width: 350px;
	  padding: 35px 35px 15px 35px;
	  background: #fff;
	  border: 1px solid #eaeaea;
	  box-shadow: 0 0 25px #cac6c6;
	  .title {
	    margin: 0px auto 40px auto;
	    text-align: center;
	    color: #505458;
	  }
	  .login-handle{
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    .remember {
	    margin: 0px 0px 35px 0px;
	  }
	  }
	  
	}
</style>
