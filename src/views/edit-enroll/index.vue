<template>
    <el-scrollbar style="width:100%;height:calc(100% - 17px);" :vertical="true">
        <enroll-main></enroll-main>
    </el-scrollbar>
</template>
<script>
import enrollMain from '@/components/enroll-main'
export default {
    components:{
        enrollMain
    }
}
</script>