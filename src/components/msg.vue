<template>
    <section>
        <el-col :span="24">
            <h1 style="text-align: center;">记事本</h1>
        </el-col>
        <textarea v-model="msgTextarea" class="msg-textarea"></textarea>
        <el-col :span="24"  class="msg-button">
            <el-button type="primary" @click.native.prevent="adminMsg" :loading="logining">确定</el-button>
        </el-col>
    </section>   
</template>
<script>
import {adminboard,setcontent} from '@/js/common/api.js';
export default {
    data(){
        return{
            logining:false,
            msgTextarea:''
        }
    },
    methods:{
        getAdminBoard(){
             //  this.newCommon.loading(true);
            adminboard().then(res =>{
                 //  this.newCommon.loading(false);
                if (res.status == '1') {
                    this.msgTextarea = res.data.content1;
                } else {
                    this.newCommon.message({status:res.status,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(()=>{
                
            })
        },
        adminMsg(){
            let data={
                content1:this.msgTextarea
            }
            this.logining=true
            setcontent(data).then(res=>{
                this.logining = false;
                if (res.status == '1') {
                    this.newCommon.message({status:res.status,
                        message: res.data.msg,
                        type: 'success'
                    });
                } else {
                    this.newCommon.message({status:res.status,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        }
    },
    mounted(){
        this.getAdminBoard()
    }
}
</script>

