<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <div class="login-handle">
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-link :underline="false" type="primary" class="remember" @click="changePass">忘记密码?</el-link>
    </div>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
    <change-passworld ref="changePass"></change-passworld>
	<verify-idcard ref="verifyId" ></verify-idcard>
  </el-form>
  
</template>

<script>
  import { requestLogin } from '../api/api';
  import changePassworld from '../components/changePass/index.vue'
  import verifyIdcard from '../components/verify-IDCard/index.vue'
  //import NProgress from 'nprogress'
  export default {
    components:{
      changePassworld,
	  verifyIdcard
    },
    data() {
      return {
        
        logining: false,
        ruleForm2: {
          // account: 'administrator',
		  account: '',
          // checkPass: 'password'
		  checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
        },
        checked: true
      };
    },
    methods: {
      changePass(){
        this.$refs.changePass.setShow(this.ruleForm2.account)
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { account: this.ruleForm2.account, password: this.ruleForm2.checkPass ,type:2};//普通用户传2
            requestLogin(loginParams).then(data => {
              this.logining = false;
              if(data.code == 0){
				  let { msg, code, user } = data.data;
				  let type = data.data.type
				  let boolId = user.hasOwnProperty("idCard"); 
				  if(boolId == false){//判断身份证号是否存在，如果存在就直接登录，如果不存在，需要绑定身份证号
						this.$refs.verifyId.setShow(user.id)
				  }else{
					  sessionStorage.setItem('user', JSON.stringify(user));
					  sessionStorage.setItem('type', JSON.stringify(type));
					  this.$router.push({ path: '/' });
					  this.$message({
						message: "登录成功",
						type: 'success'
					  });
				  }
			  }else{
				  this.$message({
				    message: data.msg,
				    type: 'error'
				  });
			  }
            });
        } else {
            return false;
          }
        });
        if(_this.checked == true){
          // console.log("checked == true");
          _this.setCookie(_this.ruleForm2.account,_this.ruleForm2.checkPass,7)
        }else{
          // console.log("清空Cookie");
          _this.clearCookie();
        }
      },
	  //设置cookie
	  setCookie(c_name, c_pwd, exdays){
		var exdate = new Date(); //获取时间
	    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
	    //字符串拼接cookie
	    window.document.cookie =
			"userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
		window.document.cookie =
			"userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
	  },
	  //读取cookie
	  getCookie(){
		if(document.cookie.length > 0){
			var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
			// console.log(arr)
			for (var i = 0; i < arr.length; i++) {
			  var arr2 = arr[i].split("="); //再次切割
			  //判断查找相对应的值
			  if (arr2[0] == "userName") {
				this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
			  } else if (arr2[0] == "userPwd") {
				this.ruleForm2.checkPass = arr2[1];
			  }
			}
		}
	  },
	  clearCookie: function() {
		this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
	  },
    },
	mounted() {
		this.getCookie()
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