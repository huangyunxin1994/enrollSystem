<template>
    <el-scrollbar style="width:100%;height:calc(100% - 17px);" :vertical="true">
        <div class="enroll-details-main">
            <el-link class="enroll-details-nav" :underline="false" @click="backpage"><i class="el-icon-arrow-left"></i> 返回上一页 </el-link>
            
            <div class="enroll-details-container" ref="container">
                <div class="enroll-details-container-img">
                    <el-button type="primary" size="medium" @click="getPdf()">导出</el-button>
                    <!-- <el-avatar shape="square" :size="100" :src="squareUrl"></el-avatar> -->
                </div> 
                <el-scrollbar style="width:100%;height:calc(100% - 36px);" :vertical="true">
                <div class="enroll-details-container-msg" id="pdfDom">
                    <h1 style="text-align:center">报名个人信息表</h1>
                    <div class="base-msg">
                            <div v-for="(item,index) in mainMsg.child" :key="index">
                                <div v-if="item.type!=='textarea'&&item.type!=='img'" class="base-msg-item ">
                                    <p class="base-msg-item-label">{{item.name}}</p>
                                    <p class="base-msg-item-text small" v-if="item.type!=='textarea'&&item.type!=='img'&&(!item.maximumCharacters||item.maximumCharacters<=20)">{{mainMsg.submitData[0][item.dataKey]}}</p>
                                    <p class="base-msg-item-text medium" v-else-if="item.type!=='textarea'&&(item.maximumCharacters>20&&item.maximumCharacters<=50)">{{mainMsg.submitData[0][item.dataKey]}}</p>
                                </div>
                                <div v-else class="base-msg-item-l ">
                                    <p class="base-msg-item-label">{{item.name}}</p>
                                    <pre v-if="item.type!=='img'" class="large">{{mainMsg.submitData[0][item.dataKey]}}</pre>
                                    <!-- <el-input
                                    
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="mainMsg.submitData[0][item.dataKey]" resize="none" autosize>
                                    </el-input> -->
                                    <p class="img" v-else>
                                        <img width="100%" :src="'data:image/png;base64,'+mainMsg.submitData[0][item.dataKey]"/>
                                    </p>
                                </div>
                                
                            </div>
                    </div>
                    <div class="other-msg">
                        <div v-for="(item,index) in otherMsg" :key="index">
                            <div class="other-msg-title">{{item.name}}</div>
                            <el-table :data="item.submitData" border style="width: 96%">
                                <el-table-column v-for="(ite,index) in item.child" :key="index" :prop="ite.dataKey" :label="ite.name" :min-width="ite.width">
                                    <template slot-scope="scope">
                                        <p  v-html="scope.row[ite.dataKey]"></p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="other-msg-title">回复信息</div>
                        <pre class="other-msg-message"></pre>
                    </div>

                </div>
                </el-scrollbar>
            </div>      
        </div>
    </el-scrollbar>
</template>

<script>
import { randomStr,getByteLen } from "@/utils/index.js"
import { getSignup,getPersonDetial } from "@/api/api"
export default {
    data(){
        return {
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            mainMsg:{},
            otherMsg:[],
            htmlTitle: '报名个人信息'
        }
    },
    methods:{
        //回到上一页
        backpage(){
            this.$router.go(-1);
        },
        getWidth(str){
            console.log(str)
            let length = getByteLen(str)
            console.log(length)
        },
        getEnrollPersonData(id){
            getPersonDetial({id:id}).then(res=>{
                if(res.code==0){
                    let para = res.data.data;
                    let personMsg = JSON.parse(para.registrationInformation).form;
                   getSignup({id:para.sid}).then(res=>{
                       if(res.code==0){
                           let titleData = res.data.data 
                           for(let i=0;i<titleData.length;i++){
                               personMsg[i].child=titleData[i].child
                           }
                           personMsg[0].submitData.forEach(item=>{
                                    for(let key in item){
                                        if(Array.isArray(item[key]) ){
                                            let str=""
                                            for(let i=0;i<item[key].length;i++){
                                                if(str==""){
                                                    str+=item[key][i]
                                                }else{
                                                    str+=","+item[key][i]
                                                }
                                            }
                                            item[key]=str
                                        }
                                    }
                           })
                            this.mainMsg = personMsg[0]
                            let smallArr=[],mediumArr=[],largeArr=[],imgArr=[]
                            this.mainMsg.child.forEach(i=>{
                                console.log(i.type)
                               if(i.type!=='textarea'&&i.type!=='img'){
                                   if(!i.maximumCharacters||i.maximumCharacters<=30){
                                       smallArr.push(i)
                                   }else{
                                       mediumArr.push(i)
                                   }
                               }else if(i.type==='img'){
                                   imgArr.push(i)
                               }else{
                                   largeArr.push(i)
                               }
                            })
                            console.log(smallArr )
                            this.mainMsg.child=smallArr.concat(mediumArr).concat(largeArr).concat(imgArr)
                            console.log(this.mainMsg.child )
                            personMsg.splice(0,1)
                            // console.log(personMsg)
                            this.otherMsg=personMsg
                       }
                   })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
    },
    mounted(){
       let id =  this.$route.query.id
       this.getEnrollPersonData(id)
        
    },
    watch: {
        /**
         * 监控表格的数据data，自动设置表格宽度
         * @Array valArr
         */
        otherMsg(valArr) {
            valArr.forEach((item)=> {
                item.child.forEach(i=>{
                    //const arr = item.sumbitData.map(x => x[i.prop])  // 获取每一列的所有数据
                    let temp=[];
                    item.submitData.forEach(x => {
                        let str=""
                        if(Array.isArray(x[i.dataKey])){
                            x[i.dataKey].forEach(m=>{
                                if(str=="")
                                    str+=m
                                else
                                   str+=","+m
                            })
                            x[i.dataKey]=str
                        }else{
                            str=x[i.dataKey]
                        }
                         str+=i.name
                         temp.push(getByteLen(str)*10) //获得列的最大长度
                         
                    })
                    i.width=Math.max(...temp)
                })
                
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .enroll-details-main {
        height: 100%;
        width: 1150px;
        margin: 0 auto;
        .enroll-details-nav{
            height: 50px;
            line-height: 50px;
        }
        .enroll-details-container{
            width: 100%;
            height: calc(100% - 80px);
            padding: 2% 0;
            margin-bottom: 2%;
            background: #fff;
            &-img{
               padding-left: 2%; 
            }
            &-msg{
                width: calc(100% - 0px);
                 .base-msg{
                     width: calc(100% - 40px);
                     padding: 20px;
                     display: flex;
                     justify-content: flex-start;
                     align-items: center;
                     flex-wrap: wrap;
                     &-item-l{
                        margin: 10px;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        .img{
                             width: 150px; 
                             height: 150px;
                        }
                        .large{
                            
                        width: 960px; 
                        display: block;
                        box-sizing: border-box;
                        font-family: inherit;
                        white-space: pre-wrap;
                        white-space: -moz-pre-wrap;
                        white-space: -o-pre-wrap;
                        word-wrap: break-word;
                        padding: 10px;
                        margin: 0;
                        font-size: 16px;
                        line-height: inherit;
                        color: inherit;
                        word-break: break-all;
                        background-color: transparent;
                        border: 1px solid rgb(228, 228, 228);
                         border-radius: 0; 
                        }
                     }
                     &-item{
                        margin: 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        &-label{
                            width: 100px;
                            font-size: 16px;
                            text-align: right;
                            padding: 0 10px;
                            box-sizing: border-box;
                        }
                        &-text{
                            min-width: 150px;
                            height: 40px;
                            padding: 10px;
                            font-size: 16px;
                            border: 1px solid rgb(228, 228, 228);
                            box-sizing: border-box;
                            
                        }
                        .small{
                           width: 150px; 
                        }
                        .medium{
                            width: 420px; 
                        }
                     }
                     
                     
                 }
                 .other-msg{
                     width: 100%;
                     padding: 30px;
                     
                     &-title{
                         font-size: 24px;
                         font-weight: 700;
                         margin: 50px 0 20px 0;
                     }
                     &-message{
                          padding: 10px;
                            font-size: 14px;
                            border: 1px solid rgb(228, 228, 228);
                            box-sizing: border-box;
                         width: calc(100% - 60px);
                         min-height: 100px;
                     }
                 }
            }
        }
    }
</style>