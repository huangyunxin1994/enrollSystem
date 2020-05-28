<template>
    <el-scrollbar style="width:100%;height:100%;">
        <div class="enroll-check-main">
            <el-link class="enroll-check-nav" :underline="false" @click="backpage"><i class="el-icon-arrow-left"></i> 返回上一页 </el-link>
            <div class="enroll-check-container" ref="container">
                <div class="enroll-check-container-title">
                    <span>{{enrollData.title}}</span>
                    <div>
                        <el-button type="primary" icon="el-icon-printer" size="medium"  @click="exportToExcel()">导出</el-button>
                        <el-button type="primary" icon="el-icon-full-screen" size="medium"  @click="handleCheck(scope.$index, scope.row)">查看小程序二维码</el-button>
                    </div>
                </div> 
                <div class="enroll-check-container-handle" >
                    <div class="enroll-check-container-handle-left">
                        <el-input v-model="inputValue" placeholder="请输入内容"  style="width:30%"></el-input>
                        <div  style="margin-left:20px;">
                            <label for="" class="enroll-check-container-handle-label">审核状态</label>
                            <el-select v-model="titlePara.reviewState" filterable placeholder="请选择" style="width:50%"  @change="changeResult">
                                <el-option
                                v-for="item in optionsC"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div >
                        <label for="" class="enroll-check-container-handle-label">是否确认已读</label>
                        <el-select v-model="titlePara.readNot" filterable placeholder="请选择"  style="width:50%" @change="changeResult">
                            <el-option
                            v-for="item in optionsW"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </div>
                    </div>
                    <div >
                        <el-button type="primary" size="mini" @click="chooseField">设置显示字段</el-button>
                    </div>
                </div>
                <div class="enroll-check-container-handle" >
                    <div class="enroll-check-container-handle-left">
                        <div class="enroll-check-container-handle-left-date-picker">
                        <label for="" class="enroll-check-container-handle-label" style="width:120px" >报名时间段</label>
                        
                            <el-date-picker type="date" placeholder="选择日期" v-model="startTime" style="width:50%" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="startTimeOptions"></el-date-picker>                   
                            <span  style="margin:20px;">至</span>
                            <el-date-picker type="date" placeholder="选择日期" v-model="endTime"  style="width:50%" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="endTimeOptions"></el-date-picker>
                            
                        </div>
                        <div >
                        <el-button type="primary" size="mini" @click="chooseTerm">更多筛选项</el-button>
                        <el-button type="primary" size="mini" @click="selectAllData" :disabled="tableData.length===tableAllData.length">查看全部</el-button>
                    </div>
                    </div>
                    
                    <div >
                        <el-button type="primary" size="medium" >通过</el-button>
                        <el-button type="danger" size="medium" >拒绝</el-button>
                    </div>
                </div>
                <el-table :data="tables.slice((page-1)*pageSize,page*pageSize)" border stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" @row-click="selectDetails" height="calc(98% - 200px)" ref="table">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="60" label="序号">
                    </el-table-column>
                    <el-table-column v-for="(item,index) in showTableTitle" :fixed="item.fixed" :key="index" :prop="item.name" :label="item.title" :width="item.width" :min-width="item.minwidth"  :sortable="item.type!='button'&&item.type!='handle'?true:false">
                        <template slot-scope="scope">
                            <p :formatter="formatSex" v-html="arrFormatter(scope.row[item.name],item.name)"></p>
                        </template>
                    </el-table-column>
                    
                </el-table>
               <div class="enroll-check-container-tools">
                   <span class="enroll-check-container-tools-span">共 {{tables.length}} 条数据，每页 {{pageSize}} 条</span> 
                   <el-pagination background layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="pageSize" :total="tables.length" >
                    </el-pagination>
               </div>
                <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
                
                
            </div>      
        </div>
        <more-term :tableTitle="tableTitle" :titlePara="titlePara" ref="moreTerm" @selectByTerm="selectByTerm" @clearChoose="clearChoose"></more-term>
        <show-field :tableTitle="tableTitle" :showTableTitle="showTableTitle" ref="showField" @showField="showField"></show-field>
    </el-scrollbar>
</template>
<script>
import { getOrganData } from '@/api/api'
import { getSignup,getSignupPerson,getPersonDetial } from "@/api/api"
import { getByteLen } from "@/utils/index.js"
import moreTerm from '@/components/more-term'
import showField from '@/components/show-field'
export default {
    components:{
        moreTerm,
        showField
    },
    data(){
        return{
            isIndeterminate:false,//对el-checkbox控制不完整的全选状态
            checkAll:false,//对el-checkbox控制全选状态
            startTime:"",
            endTime:"",
            enrollData:{},
            sels:[],
            listLoading:false,
            inputValue:"",
            page:1,
            pageSize:10,
            id:"",
            tableTitle:[],
            showTableTitle:[],
            titlePara:{},
            tableData:[],
            tableAllData: [{
                id:0,
                name: '张三',
                phone:1,
                wgKUGWOjM2EO: "男",
                RoBPRgxmInkp:"篮球",
                reviewState:1,
                readNot:""
            }, {
                id:0,
                name: '李四',
                phone:2,
                wgKUGWOjM2EO: "男",
                 RoBPRgxmInkp:"足球",
                reviewState:2,
                readNot:"2"
            },{
                id:0,
                name: '王五',
                phone:3,
                wgKUGWOjM2EO: "男",
                RoBPRgxmInkp:"跑步",
                reviewState:3,
                readNot:"1"
            }, {
               id:0,
                name: '赵六',
                phone:4,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            },
            {
                id:0,
                name: '张三',
                phone:5,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            }, {
                id:0,
                name: '李四',
                phone:6,
                wgKUGWOjM2EO: "男",
                reviewState:2,
                readNot:"2"
            },{
                id:0,
                name: '王五',
                phone:7,
                wgKUGWOjM2EO: "男",
                reviewState:3,
                readNot:"1"
            }, {
               id:0,
                name: '赵六',
                phone:8,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            },{
                id:0,
                name: '张三',
                phone:9,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            }, {
                id:0,
                name: '李四',
                phone:10,
                wgKUGWOjM2EO: "男",
                reviewState:2,
                readNot:"2"
            },{
                id:0,
                name: '王五',
                phone:11,
                wgKUGWOjM2EO: "男",
                reviewState:3,
                readNot:"1"
            }, {
               id:0,
                name: '赵六',
                phone:12,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            },{
                id:0,
                name: '张三',
                phone:13,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            }, {
                id:0,
                name: '李四',
                phone:14,
                wgKUGWOjM2EO: "男",
                reviewState:2,
                readNot:"2"
            },{
                id:0,
                name: '王五',
                phone:15,
                wgKUGWOjM2EO: "男",
                reviewState:3,
                readNot:"1"
            }, {
               id:0,
                name: '赵六',
                phone:16,
                wgKUGWOjM2EO: "男",
                reviewState:1,
                readNot:""
            }],
            clientHeight:'',
            optionsC:[
                {
                value: '',
                label: '全部'
                },
                {
                value: '1',
                label: '未审核'
                }, {
                value: '2',
                label: '已通过'
                }, {
                value: '3',
                label: '未通过'
                }
            ],
            optionsW:[
                {
                value: '',
                label: '全部'
                },
                {
                value: '1',
                label: '未读'
                }, {
                value: '2',
                label: '已读'
                }
            ],
            valueC:"",
            valueW:""
        }
    },
    methods:{
        //回到上一页
        backpage(){
            this.$router.go(-1);
        },
        selsChange: function (sels) {
				this.sels = sels;
        },
        //性别显示转换
        formatSex: function (row, column) {
                  console.log(column.property)
                  if(column.property=="sex")
                  return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '';
                  else
                  return row[column.property]
        },
        arrFormatter (value,name) {
            if(name=='readNot')
             return value == 1 ? '<span style="color:#F56C6C;font-weight:bold">未读</span>' : value == 2 ? '<span style="color:#67C23A;font-weight:bold">已读</span>' :'';
            else if(name=='reviewState')
             return value == 1 ? '<span style="color:#F56C6C;font-weight:bold">未审核</span>' :( value == 2 ? '<span style="color:#67C23A;font-weight:bold">已通过</span>' : ( value == 3 ? '<span style="color:#909399;font-weight:bold">未通过</span>' : ''));
            else if(name=='state')
             return value == 1 ? '<span style="color:#909399;font-weight:bold">未发布</span>' :( value == 2 ? '<span style="color:#409EFF;font-weight:bold">未开始</span>' : ( value == 3 ? '<span style="color:#67C23A;font-weight:bold">进行中</span>' : ( value == 4 ? '<span style="color:#909399;font-weight:bold">已结束</span>' : '')));
            else
             return value;

        },
        handleCurrentChange(val){
           this.page = val;
        },
        async getEnrollPersonData(id){
            let tableTitle=[]
            let titlePara={}
            await getSignup({id:id}).then(res=>{
                if(res.code==0){
                    res.data.signup.form = res.data.data
                    this.enrollData = res.data.signup
                    let para = res.data.data.filter(item=>{
                        return item.type=='base'
                    })
                    
                    for(let i=0;i<para[0].child.length;i++){
                        let temp = para[0].child[i]
                        if(temp.type!="img"){
                            let paras ={}
                            paras.title=temp.name;
                            paras.name=temp.dataKey;
                            paras.type=temp.type
                            if(temp.childs)
                            paras.childs=temp.childs
                            paras.width=120
                            tableTitle.push(paras)
                            if(temp.type==="checkbox")
                            titlePara[temp.dataKey]=[]
                            else
                            titlePara[temp.dataKey]=""
                        }
                    }
                    let paras = {title:"审核状态",name:"reviewState",type:"input",width:120}
                    let paras2 ={title:"是否已读",name:"readNot",type:"input",width:120} 
                    tableTitle.push(paras)  
                    tableTitle.push(paras2)
                    titlePara.reviewState=""
                    titlePara.readNot=""
                    this.tableTitle=tableTitle
                    this.showTableTitle=tableTitle
                    this.titlePara=titlePara
                    
                }
            })
            await getSignupPerson({id:id}).then(res=>{
                if(res.code==0){
                    let arr = []
                    for(let i=0;i<res.data.data.length;i++){
                        let formArr =  res.data.data[i]
                        let para = JSON.parse(formArr.registrationInformation).form[0].submitData[0]
                        para.personId = formArr.id
                        para.reviewState = formArr.reviewState
                        para.readNot = formArr.readNot
                        console.log(para)
                        arr.push(para)
                    }
                    this.tableAllData=arr
                    this.tableData=this.tableAllData
                }

            }).catch(err=>{

            })
            this.$nextTick(()=>{
                            this.$refs.table.doLayout()
                        })            
        },
        changeResult(val){
            console.log(this.titlePara)
            let keys = Object.keys(this.titlePara);
            let vals = Object.values(this.titlePara);
            this.tableData = this.tableAllData.filter(item=>{
                for(let i=0;i<keys.length;i++){
                   if( String(item[keys[i]]).indexOf(vals[i]) <= -1)
                    return ""
                }
                return item
            })
        },
        //选择筛选条件
        chooseTerm(){
            this.$refs.moreTerm.handleShow()
        },
        
        //清空选择
        clearChoose(){
             Object.keys(this.titlePara).forEach(key =>{
                 if(key!=="reviewState"&&key!=="readNot")
                     this.titlePara[key] = ""
                }  
             );
        },
        chooseField(){
            this.$refs.showField.handleShow()
        },
        //配置显示字段
        showField(arr){
            let str = JSON.stringify(arr)
            this.showTableTitle = this.tableTitle.filter(item=>{
                return str.indexOf(item.name)>-1
            })
            this.$nextTick(()=>{
                            this.$refs.table.doLayout()
                        }) 
        },
        //查看所有数据，清空条件
        selectAllData(){
            this.inputValue=""
            Object.keys(this.titlePara).forEach(key => this.titlePara[key] = "");
            this.tableData=this.tableAllData
        },
        //条件查询
        selectByTerm(){
            console.log(this.titlePara)
            let keys = Object.keys(this.titlePara);
            let vals = Object.values(this.titlePara);
            this.tableData = this.tableAllData.filter(item=>{
                for(let i=0;i<keys.length;i++){
                    if(Array.isArray(vals[i])){
                        let bool=false
                        for(let j=0;j<vals[i].length;j++){
                            console.log(vals[i][j])
                            if( String(item[keys[i]]).indexOf(vals[i][j]) > -1)
                            bool=true
                        }
                        if(!bool)
                            return ""
                    }
                    else if( String(item[keys[i]]).indexOf(vals[i]) <= -1)
                    return ""
                }
                return item
            })
        },
        //excel数据导出
        exportToExcel() {
            require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('@/export/Export2Excel');
            const tHeader = [] // 对应表格输出的中文title
            const filterVal = [] // 对应表格输出的数据
            this.tableTitle.forEach(val => {
            tHeader.push(val.title)
            filterVal.push(val.name)
            })
            const list = this.tableAllData;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, `${this.enrollData.title}-人员资料`);
            })
        },
        formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
        //点击某行跳转报名详情
        selectDetails(row, event, column){
            this.$router.push(
                {
                    path:"/enrolldetails",
                    query:{
                        id:row.personId
                    }
                }
            ) 
        
        }
    },
    mounted(){
        let id =  this.$route.query.id
       this.getEnrollPersonData(id)
      
        
    },
    computed:{
        tables:function(){
            var search=this.inputValue;
            if(search){
            return  this.tableData.filter(function(dataNews){
                return Object.keys(dataNews).some(function(key){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                })
            })
            }
            return this.tableData
        },
        startTimeOptions(){
            // 开始时间
            return{
                disabledDate:(time)=>{
                //今天之前的时间不能作为起始时间
                //结束时间之后的时间不能作为开始时间
                let disabledDate;
                let nowDate = new Date();
                nowDate.setDate(nowDate.getDate()-1);
                if(this.endTime!=""){
                    disabledDate = new Date(this.endTime);
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
                if(this.startTime!="")
                    disabledDate = new Date(this.startTime);
                else
                    disabledDate = new Date();
                disabledDate.setDate(disabledDate.getDate()-1);
                return time.getTime() < disabledDate.getTime();
                }
            }    
        },
    },
    
}
</script>
<style lang="scss" scoped>
    .enroll-check-main {
        width: 80%;
        height: 100%;
        min-width: 868px;
        margin: 0 auto;
        .enroll-check-nav{
            height: 50px;
            line-height: 50px;
        }
        .enroll-check-title{
            padding: 2%;
            margin-bottom: 2%;
            background: #fff;
            font-size: 21px;
            font-weight: 700;
        }
        .enroll-check-container{
            height: calc(94% - 80px);
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
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            &-handle{
                margin-bottom:2%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &-label{
                    font-size: 14px;
                    color: #606266;
                    font-weight: 700;
                }
                &-left{
                    width: 78%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center; 
                    &-date-picker{
                        width: 65%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center; 
                    } 
                }
            }
            &-tools{
                display: flex;
                justify-content: space-between;
                align-items: center;
                &-span{
                   font-size: 14px;
                    color: #606266;
                    font-weight: 700; 
                }
            }
        }
    }
    .enroll-check-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
            height: 80px;
            background: #fff;
        }
</style>