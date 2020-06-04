<template>
	<div>
		<el-dialog title="修改密码" :visible.sync="dialogPassVisible" center :append-to-body='true' :before-close="handleClose" :lock-scroll="false" :close-on-click-modal="false" width="500px">
			<div class="passList">
				<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="120px">
					<el-form-item  label="身份证号" prop="idCard">
					<el-input type="text" v-model="ruleForm2.idCard" auto-complete="off" placeholder="身份证号"></el-input>
					</el-form-item>
					<el-form-item  label="输入新密码" prop="newPassword">
					<el-input type="password" v-model="ruleForm2.newPassword" auto-complete="off" placeholder="密码" show-password></el-input>
					</el-form-item>
					<el-form-item  label="再次输入密码" prop="again">
					<el-input type="password" v-model="ruleForm2.again" auto-complete="off" placeholder="密码" show-password></el-input>
					</el-form-item>
					
					<el-button type="primary" style="width:100%;" @click.native.prevent="onSubmit" >确定</el-button>
					
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {changePass,vaildIdCard} from '@/api/api.js'
import {IdentityCodeValid} from '@/utils/index.js'

export default {
	data(){
		var validatePass = (rule, value, callback) => {
			if (value === '') {
			callback(new Error('请输入新密码'));
			} else {
				if (this.ruleForm2.again !== '') {
					if (value !== this.ruleForm2.again) {
						callback(new Error('两次输入密码不一致!'));
					}else{
						callback();
					} 
				}else{
					callback();
				}
			
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
			callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm2.newPassword) {
			callback(new Error('两次输入密码不一致!'));
			} else {
			callback();
			}
		};
		var validateIdCard =(rule, value, callback) => {
			if(value ===''){
				callback(new Error('请输入身份证'));
			}else{
				let bool = IdentityCodeValid(value)
				if(!bool){
					callback(new Error('身份证格式错误'));
				}else{
					vaildIdCard({idCard:value}).then(res=>{
						if(res.code==0){
							callback();
						}else{
						  callback(new Error(res.msg));
						}
					})
				}
				
			}
		}
		return{
			dialogPassVisible:false,
			ruleForm2:{
				newPassword:'',
				again:'',
				idCard:''
			},
			rules2: {
				idCard : [
					{ required: true,validator: validateIdCard, trigger: 'blur' }
				],
				newPassword: [
					{ required: true,validator: validatePass, trigger: 'change' },
					{ required: true,validator: validatePass, trigger: 'blur' }
				],
				again: [
					{ required: true,validator: validatePass2, trigger: 'change' },
					{ required: true,validator: validatePass2, trigger: 'blur' }
				]
			},
		}
	},
	methods:{
		onSubmit(){
			 this.$refs.ruleForm2.validate((valid) => {
					if (valid) {
						let para = Object.assign({}, this.ruleForm2);
						changePass(para).then((res)=>{
							console.log(res)
							if(res.code == 0){
								this.$message({
									message: '密码修改成功',
									type: 'success'
								});
								this.ruleForm2={
									newPassword:'',
									again:'',
									idCard:''
								},
								this.dialogPassVisible = false
							}else{
								this.$message.error('密码修改失败');
							}
						}).catch((res)=>{
							this.$message.error('密码修改失败');
						})
					}
			 })
			
		},
		handleClose(){
			this.ruleForm2={
				newPassword:'',
				again:'',
				idCard:''
			},
			this.dialogPassVisible = false
		},
		setShow(){
			this.dialogPassVisible = true
		}
	}
}
</script>

<style>
</style>
