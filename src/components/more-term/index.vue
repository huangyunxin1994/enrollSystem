<template>
    <el-dialog title="更多筛选条件" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh" width="500px">     
       <div class="more-term-main-radio">
           <el-checkbox v-model="checked" :true-label="1" :false-label="2">在当前结果筛选</el-checkbox>
       </div>
       <div class="more-term-contain">
           <div class="more-term-text" >
               <span class="more-term-text-title">选择字段</span>
               <div class="more-term-contain-type">
                   <div class="more-term-radio" v-for="(item,index) in showTableTitle" :key="index">
                        <el-radio v-model="radio" :label="item.name" v-if="item.name!=='reviewState'&&item.name!=='readNot'" @change="changeRadio">{{item.title}}</el-radio>
                  </div>
               </div>
                
           </div>
           <div class="more-term-text">
               <span  class="more-term-text-title">筛选内容</span>
                <div  v-for="(item,index) in showTableTitle" :key="index">
                    <el-input v-model="titlePara[item.name]" v-if="item.type==='input'&&item.name===radio" placeholder="请输入内容"></el-input>
                    <el-input v-model="titlePara[item.name]" v-else-if="item.type==='number'&&item.name===radio" type="number" placeholder="请输入内容"></el-input>
                    <el-input v-model="titlePara[item.name]" v-else-if="item.type==='textarea'&&item.name===radio" placeholder="请输入内容"  type="textarea" :rows="2"></el-input>
                    <el-date-picker v-model="titlePara[item.name]" type="date" placeholder="选择日期" v-else-if="item.type==='date'&&item.name===radio" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                    <el-radio-group v-model="titlePara[item.name]" v-else-if="item.type==='radio'&&item.name===radio">
                        <el-radio :label="ite.name" v-for="(ite,index) in item.childs" :key="index">{{ite.name}}</el-radio>
                    </el-radio-group>
                    <el-checkbox-group 
                        v-model="titlePara[item.name]"
                        :min="1"
                        :max="2" v-else-if="item.type==='checkbox'&&item.name===radio">
                        <el-checkbox v-for="(ite,index) in item.childs" :label="ite.name" :key="index">{{ite.name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-select v-model="titlePara[item.name]" placeholder="请选择" v-else-if="item.type==='select'&&item.name===radio">
                        <el-option
                        v-for="(ite,index) in item.childs"
                        :key="index"
                        :label="ite.name"
                        :value="ite.name">
                        </el-option>
                    </el-select>
                </div>
           </div>
       </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleClose">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="loading">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { randomStr } from "@/utils/index.js"
export default {
    props:{
        showTableTitle:Array,
        titlePara:Object
    },
    data(){
        return {
            formVisible:false,
            loading: false,
            checked:1,
            radio:""
            
        }
    },
    methods:{
        //显示新增界面
			handleShow() {
                this.formVisible = true;	
            },
            //新增
			addSubmit() {    
               this.checked=1,
                this.radio=""
                this.formVisible=false       
               this.$emit("selectByTerm")
            },
            handleClose() {
                this.checked=1,
                this.radio=""
                this.formVisible=false
                this.loading=false
                this.$emit("clearChoose")
            },
            changeRadio(val){
                if(this.checked!==1){
                    this.$emit("clearChoose")
                }
            }
               
    }
}
</script>
<style lang="scss" scoped>

.more-term-main-radio{
    font-weight: 700;
    margin: 20px 0;
}
.more-term-contain{
    &-type{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    
}
.more-term-radio{
    margin: 10px 0;
    
    width: 100px;
    white-space:nowrap;
    overflow: hidden;
}
.more-term-text{
    margin: 10px 0;
    padding: 20px;
    min-height: 100px;
    border: 1px solid #dcdfe6;
    &-title{
        display: block;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px ;
    }
}
</style>