<template>
    <el-scrollbar style="width:100%;height:100%;">
        <div class="new-enroll-main">
            <el-link class="new-enroll-nav" :underline="false" @click="backpage"><i class="el-icon-arrow-left"></i> 返回上一页 </el-link>
            <div class="new-enroll-title" v-if="handleType=='add'">
                新建报名活动
            </div>
            <div class="new-enroll-title" v-else>
                 编辑报名活动
                 <el-tag
                    :type="tagType=ruleForm.state==1||ruleForm.state==4?'info':(ruleForm.state==2?'primary':(ruleForm.state==3?'success':''))"
                    effect="dark">
                    {{ ruleForm.state==1?"未发布":(ruleForm.state==4?'已结束':(ruleForm.state==2?'未开始':(ruleForm.state==3?'进行中':''))) }}
                </el-tag>
                <!-- <el-button type="primary" icon="el-icon-document-copy" class="button-class" size="medium" @click="copyAndAdd">复制并新增活动</el-button> -->
            </div>
           
            <div class="new-enroll-container">
                <div class="new-enroll-container-title">报名信息</div> 
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" label-position="left" :status-icon="true">
                    <el-form-item label="报名标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="报名时间" required>
                        <el-col :span="11">
                        <el-form-item prop="startTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="startTimeOptions"></el-date-picker>
                        </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">至</el-col>
                        <el-col :span="11">
                        <el-form-item prop="endTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="endTimeOptions"></el-date-picker>
                        </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
            <div class="new-enroll-container">
                <div class="new-enroll-container-title">报名详细说明</div> 
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
                    <el-form-item label="详细说明" prop="details">
                        <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="请输入内容"
                        resize="none"
                        v-model="ruleForm.details">
                        </el-input>
                    </el-form-item>
                </el-form>
                
            </div>
            <div class="new-enroll-container" v-for="(item,index) in ruleForm.form" :key="index">
                <div class="new-enroll-container-title form-title">
                    <div>
                        <span>{{item.name}}</span>
                        <el-tooltip content="编辑表格" placement="top" effect="light">
                                <el-link :underline="false" icon="el-icon-edit-outline" type="primary" style="font-size:25px" @click="editForm(index)"></el-link>
                        </el-tooltip>
                     </div>
                        
                        <el-tooltip content="删除表格" placement="top" effect="light" v-if="item.formType=='table'">
                            <el-link :underline="false" icon="el-icon-remove" type="danger" style="font-size:30px" @click="removeForm(index)"></el-link>
                        </el-tooltip>
                    
                </div>
                <div class="new-enroll-container-remarks">{{item.details}}</div>
                <div class="title-class">已选信息({{item.child.length}})</div>
                <div class="new-enroll-container-item">
                    <div style="width:calc(100% - 440px);max-height: 568px;" >
                        <el-scrollbar style="width:100%;height:100%;">
                            <draggable v-model="item.child" :options="{animation:200,handle:'.dragClass'}">
                                <div v-for="(item,i) in item.child" :key="i" class="baseform-item">
                                    <span class="baseform-item-name baseform-item-o">{{item.name}}</span>
                                    <el-checkbox class="baseform-item-o" :true-label='1' :false-label='0' v-model="item.required" :disabled="item.dataKey==='name'||item.dataKey==='phone'">必填</el-checkbox>
                                    <el-link :underline="false" icon="el-icon-edit" class="baseform-item-o" @click="updateFormOption(index,i)" :disabled="item.dataKey==='name'||item.dataKey==='phone'"></el-link>
                                    <el-link :underline="false" icon="el-icon-document-copy" class="baseform-item-o"></el-link>
                                    <el-link :underline="false" icon="el-icon-delete" class="baseform-item-o" @click="removeFormOption(index,i)" :disabled="item.dataKey==='name'||item.dataKey==='phone'"></el-link>
                                    <el-link :underline="false" icon="el-icon-rank" class="baseform-item-o dragClass"></el-link>
                                </div>
                            </draggable>
                        </el-scrollbar>
                    </div>
                    <div class="new-enroll-container-button" v-if="item.type=='base'">
                        <div class="title-class" >自定义字段</div>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'input')">单行文本</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'textarea')">多行文本</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'number')">数字</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'date')">日期</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'time')">时间</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'img')">图片</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'radio')">单选</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'checkbox')">多选</el-button>
                            <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'select')">下拉框</el-button>
                    </div>
                    <div class="new-enroll-container-button" v-else-if="item.type=='table'">
                        <div class="title-class" >自定义字段</div>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'input')">单行文本</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'textarea')">多行文本</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'number')">数字</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'date')">日期</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'time')">时间</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'img')">图片</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'radio')">单选</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'checkbox')">多选</el-button>
                            <el-button type="success" icon="el-icon-search" class="button-class" size="medium" @click="addFormOption(index,'select')">下拉框</el-button>
                        </div>
                </div>
            </div>
            <el-button  type="primary" icon="el-icon-add" class="button-class" size="medium" @click="addForm">添加表格</el-button>
            <div class="new-enroll-submit">
                <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" :disabled="handleType=='update'&&(ruleForm.state==3||ruleForm.state==4)" @click="submitForm(1)">保存</el-button>
                <el-button type="primary" icon="el-icon-search" class="button-class" size="medium" :disabled="!(handleType=='update'&&ruleForm.state==2)" @click="cancelSubmit">撤销发布</el-button>
                <el-button type="success" icon="el-icon-search" class="button-class" size="medium" :disabled="handleType=='update'&&(ruleForm.state==3||ruleForm.state==4)" @click="submitForm(2)">保存并发布</el-button>
            </div>
            
        </div>
        <enroll-form ref="enrollform" :tableTitle='tableTitle' :formRule="formRule" @insertData="insertData" @updateData="updateData"></enroll-form>
        <enroll-option ref="enrolloption" @insertOption='insertOption' @updateOption='updateOption'></enroll-option>
    </el-scrollbar>
</template>
<script>
import enrollForm from '@/components/enroll-form'
import enrollOption from '@/components/enroll-option'
import draggable from 'vuedraggable'
import { createEnrollment,getSignup } from "@/api/api"
let start="",end=""
export default {
    components:{
        enrollForm,
        enrollOption,
        draggable
    },
    data(){
        return{
            handleType:"",
            tagType:"",
            ruleForm: {
                title: '',
                startTime: '',
                endTime: '',
                details: '',
                state:1,
                form:[
                    {
                        name:"基础信息",
                        details:'',
                        type:"base",
                        child:[//表格填写选项
                            {dataKey:'name',name :'姓名',type :'input',minimumCharacters:'1',maximumCharacters:'100',required:1,childs:[]},
                            {dataKey:'phone',name :'联系方式',type :'number',minimumCharacters:'1',maximumCharacters:'100',required:1,childs:[]}
                        ]
                    }
                ],
               
            },
            rules: {
                title: [
                    { required: true, message: '请输入报名标题', trigger: 'blur' }
                ],
                startTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ]
            },
            formRule:{
                formTitle: [
                    { required: true, message: '请输入报名标题', trigger: 'blur' }
                ],
            },
            tableTitle:[
                { title : "表格名称", name : "name", type : "input" },
                { title : "描述", name : "details", type : "textarea" }
            ]
        }
    },
    methods:{
        //回到上一页
        backpage(){
            this.$router.go(-1);
        },
        //新增填写报名信息表选项
        addFormOption(i,type){
            this.$refs['enrolloption'].form.index=i
            this.$refs['enrolloption'].form.submitType="insert"
            this.$refs['enrolloption'].form.type=type
            this.$refs['enrolloption'].handleShow()
        },
        //更新填写报名信息表选项
        updateFormOption(index,i){
            console.log(this.ruleForm)
            let para =JSON.parse(JSON.stringify(this.ruleForm.form[index].child[i])) 
            if(!para.childs)
            para.childs=[]
            this.$refs['enrolloption'].form=para
            this.$refs['enrolloption'].form.submitType="update"
            this.$refs['enrolloption'].form.index=index
            this.$refs['enrolloption'].form.itemIndex=i
            this.$refs['enrolloption'].handleShow()
        },
        //删除填写报名信息表选项
        removeFormOption(index,i){
            this.ruleForm.form[index].child.splice(i,1)
        },
        //打开新增填写报名信息表弹窗
        addForm(){
            let para ={
                name:"",
                details:'',
                type:"table",
                child:[],
                submitType:"insert"
            }
            this.$refs['enrollform'].form=para
            this.$refs['enrollform'].handleShow() 
        },
        //打开编辑填写报名信息表弹窗
        editForm(i){
            let para =JSON.parse(JSON.stringify(this.ruleForm.form[i])) 
            para.submitType="update"
            this.$refs['enrollform'].form=para
             this.$refs['enrollform'].form.index=i
            this.$refs['enrollform'].handleShow()
        },
        //删除报名信息表
        removeForm(i){
            this.ruleForm.form.splice(i,1);
        },
        //新增填写报名信息表
        insertData(para){
            this.ruleForm.form.push(para)
        },
        //更新填写报名信息表
        updateData(para){
            this.$set(this.ruleForm.form, para.index, para)
        },
        //新增填写报名信息表选项
        insertOption(para){
            this.ruleForm.form[para.index].child.push(para)
        },
        //更新填写报名信息表选项
        updateOption(para){
            this.$set(this.ruleForm.form[para.index].child, para.itemIndex, para)
        }, 
        copyAndAdd(){
            // this.$router.push(
            //     {
            //         path:"/copyenroll",
            //         query:{
            //             type:"add",
            //             data:this.ruleForm
            //         }
            //     }
            // )
        },
        //保存报名信息
        submitForm(state){
            this.$refs.ruleForm1.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗?', '提示', {
                        type: 'success'
                    }).then(() => {
                        let para = Object.assign({}, this.ruleForm);
                        if(state==1){
                            para.state=state
                        }
                        else{
                            let nowDate = new Date();
                            let startTime = new Date(para.startTime)
                            if(startTime.getTime() > nowDate.getTime()){
                                para.state=2
                            }else{
                                para.state=3 
                            }
                        }
                        para.submitType=this.handleType
                        let bool = para.form.some(item=>{
                            return item.child.length==0
                        })
                        if(!bool){
                                for(let i=0;i<para.form.length;i++){
                                    para.form[i].sort=i
                                    for(let j=0;j<para.form[i].child.length;j++){
                                        para.form[i].child[j].sort=j
                                        if(para.form[i].child[j].childs){
                                            for(let k=0;k<para.form[i].child[j].childs.length;k++){
                                                para.form[i].child[j].childs[k].sort=k
                                            }
                                        }
                                    }
                                }
                                createEnrollment(para).then(res=>{
                                
                                }).catch(err=>{

                                })
                        }else{
                            this.$notify({
                                title: '警告',
                                message: '表格中至少需要一个填写信息项，请确认',
                                type: 'warning'
                            });
                        }
                        
                    })  
                }else{
                    this.$notify({
                        title: '警告',
                        message: '请确认信息填写完整正确',
                        type: 'warning'
                    });
                }
            })
        },
        //取消发布
        cancelSubmit(){
             this.$confirm('确认撤销发布吗?', '提示', {
                type: 'warning'
             }).then(() => {
                 this.ruleForm.state=1
             }).catch(() => {     
             });
        },
        //获取报名信息
        getEnrollData(id){
            getSignup({id:id}).then(res=>{
                if(res.code==0){
                    res.data.signup.form = res.data.data
                    this.ruleForm = res.data.signup
                }
            })
        }
    },
    created(){
        let type = this.$route.query.type
        if(type=="update"){
            let enrollId = this.$route.query.id
            this.getEnrollData(enrollId)
        }else{
            if(this.$route.query.data){
                this.ruleForm=this.$route.query.data
            }
        }
        this.handleType = type

    },
    computed:{
    startTimeOptions(){
      // 开始时间
      return{
        disabledDate:(time)=>{
          //今天之前的时间不能作为起始时间
          //结束时间之后的时间不能作为开始时间
          let disabledDate;
          let nowDate = new Date();
          nowDate.setDate(nowDate.getDate()-1);
          if(this.ruleForm.endTime!=""){
              disabledDate = new Date(this.ruleForm.endTime);
              disabledDate.setDate(disabledDate.getDate());
              return time.getTime() < nowDate.getTime()||time.getTime()>disabledDate.getTime();
          }else{
              return time.getTime() < nowDate.getTime()
          }
        }
      }
    },
    endTimeOptions(){
      // 结束时间
      return{
        disabledDate:(time)=>{
          //今天之前的时间不能作为结束时间
          //起始时间之前的时间不能作为结束时间
          let disabledDate
          if(this.ruleForm.startTime!="")
            disabledDate = new Date(this.ruleForm.startTime);
          else
            disabledDate = new Date();
          disabledDate.setDate(disabledDate.getDate()-1);
          return time.getTime() < disabledDate.getTime();
        }
      }    
    },
  }

}
</script>
<style lang="scss" scoped>
    .new-enroll-main {
        width: 60%;
        min-width: 868px;
        max-width: 1080px;
        margin: 0 auto;
        .new-enroll-nav{
            height: 50px;
            line-height: 50px;
        }
        .new-enroll-title{
            padding: 2%;
            margin-bottom: 2%;
            background: #fff;
            font-size: 21px;
            font-weight: 700;
            .el-tag{
                margin-left: 50px;
            }
            .el-button{
                float: right;
            }
        }
        .new-enroll-container{
            padding: 2%;
            margin-bottom: 2%;
            background: #fff;
            &-title{
                margin-bottom: 20px;
                padding: 2px 0;
                border-left: 4px solid #409EFF;
                text-indent: 20px;
                font-size: 18px;
                font-weight: 700;
            }
            .form-title{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            &-remarks{
               margin-bottom: 20px;
               padding: 2px 0;
               font-size: 14px;
               color: #909399; 
               font-weight: 500;
            }
            &-item{
                display: flex;
                justify-content: space-between;
                min-width: 348px;
                .baseform-item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    margin-right: 10px;
                    &-name{
                        width: 50%;
                        border: 1px solid #dddfe6;
                        padding: 8px 15px;
                        
                    }
                    &-o{
                        margin-right: 10px;
                    }
                }
            }
            &-button{
                width: 420px;
                height: 250px;
                padding: 20px 0;
                border: 1px dotted #dbdbe1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                .button-class{
                    margin: 10px;
                    height: 40px;
                    width: 117px;
                }
            }
            .line{
                text-align: center;
            }
            .title-class{
                font-weight: 700;
                    margin:0 0 10px 10px;
            }
        }
        .new-enroll-submit{
            padding-bottom: 2%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
    }
    .new-enroll-footer{
            height: 80px;
            background: #fff;
        }
</style>