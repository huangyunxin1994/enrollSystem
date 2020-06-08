<template>
	<div>
		<el-dialog title="用户编辑" :visible.sync="dialogPassVisible" center :append-to-body='true' :before-close="handleClose" :lock-scroll="false" :close-on-click-modal="false" width="685px">
			<div class="passList">
				<!-- <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="120px">
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
					
				</el-form> -->
				<el-form  :model="ruleForm2" ref="ruleForm2" label-position="left" label-width="140px">
					<el-form-item label="账号">
					    <el-input v-model="ruleForm2.account" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item label="密码">
					    <el-input v-model="ruleForm2.password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="是否启用">
					    <el-radio-group v-model="ruleForm2.isEnable">
					      <el-radio :label='1'>是</el-radio>
					      <el-radio :label='2'>否</el-radio>
					    </el-radio-group>
					  </el-form-item>
					<el-form-item label="单位名称">
					    <el-input v-model="ruleForm2.username" placeholder="请输入单位名称"></el-input>
					</el-form-item>
					<el-form-item label="所属区域">
					    <el-input v-model="ruleForm2.areas" placeholder="请输入所属区域"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" v-if="state == 1" class="btn" @click="addSubmit" size="medium">创建</el-button>
					    <el-button type="primary" class="btn" v-else @click="changeSubmit">修改</el-button>
					  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {addUser,updateUser} from '@/api/api.js'
import {IdentityCodeValid , parseTime} from '@/utils/index.js'

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
				account:'',
				areas:'',
				createTime:'',
				id:'',
				idCard:'',
				isEnable:'',
				isManage:'',
				password:'',
				username:''
			},
			state:0,
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
		setShow(val){
			this.dialogPassVisible = true
			if(val == 1){
				this.state = val
			}else{
				this.state = val
				// console.log(val)
				this.ruleForm2.account = val.account
				this.ruleForm2.areas = val.areas
				this.ruleForm2.createTime = val.createTime
				this.ruleForm2.id = val.id
				this.ruleForm2.idCard = val.idCard
				this.ruleForm2.isEnable = val.isEnable
				this.ruleForm2.isManage = val.isManage
				this.ruleForm2.password = val.password
				this.ruleForm2.username = val.username
			}
		},
		//添加用户
		addSubmit(){
			// console.log('添加用户')
			// console.log(this.ruleForm2)
			let time = parseTime(new Date(),'{y}-{m}-{d}')
			// console.log(time)
			let param = {
				account:this.ruleForm2.account,
				password:this.ruleForm2.password,
				isEnable:this.ruleForm2.isEnable,
				username:this.ruleForm2.username,
				areas:this.ruleForm2.areas,
				createTime:time,
				isManage:2
			}
			// console.log(param)
			addUser(param).then((res)=>{
				console.log(res)
				if(res.code == 0){
					this.$message({
					  message: '添加成功',
					  type: 'success'
					});
					this.$emit("updateMess",1)
				}else{
					this.$message.error('添加失败');
				}
			}).catch((res)=>{
				this.$message.error('添加失败');
			})
			this.dialogPassVisible = false
		},
		//修改用户
		changeSubmit(){
			// console.log("修改用户")
			// console.log(this.ruleForm2)
			let param = {
				account:this.ruleForm2.account,
				areas:this.ruleForm2.areas,
				createTime:this.ruleForm2.createTime,
				id:this.ruleForm2.id,
				idCard:this.ruleForm2.idCard,
				isEnable:this.ruleForm2.isEnable,
				isManage:this.ruleForm2.isManage,
				password:this.ruleForm2.password,
				username:this.ruleForm2.username
			}
			// console.log(param)
			updateUser(param).then((res)=>{
				console.log(res)
				if(res.code == 0){
					this.$message({
					  message: '修改成功',
					  type: 'success'
					});
					this.$emit("updateMess",1)
				}else{
					this.$message.error('修改失败');
				}
			}).catch((res)=>{
				this.$message.error('修改失败');
			})
			this.dialogPassVisible = false
		}
	}
}
</script>

<style scoped lang="scss">
	.btn{
		width: 200px;
	}
</style>
