<template>
  <section>
    <el-form ref="formData" :model="formData" label-width="80px" class="detail">
        <el-row>
            <el-col :span="24"><div class="margin-top-beg">个人信息</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="用户ID">
                   <label>{{formData.id}}</label>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="头像">
                   <img src="../../images/mango.png" style="width:80px;height:80px"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="用户名">
                   <label>{{formData.nickname}}</label>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号">
                   <label>{{formData.mobile}}</label>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="来源">
                   <label>{{formData.came_from}}</label>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="margin-top-beg">终端信息</div></el-col>
        </el-row>
       <el-row>
            <el-col :span="12">
                <el-form-item label="设备">
                   <label>{{formData.device_info}}</label>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="系统">
                   <label>{{formData.app_platform}}</label>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="版本">
                   <label>{{formData.app_version}}</label>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="margin-top-beg">注册信息</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="注册ip">
                   <label>{{formData.register_ip}}</label>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="注册时间">
                <label>	{{formData.created_at | formatTime("2")}}</label>
                </el-form-item>
            </el-col>
        </el-row>
     
      <el-row>
            <el-col :span="24" class="text-center">
                <el-button @click="close">关闭</el-button>
            </el-col>
        </el-row>
    </el-form>
  </section>
</template>

<script>
import { getUerDetail } from "@/js/common/api.js";
export default {
  name: "DetailDialog",
  props: ["userId"],
  data() {
    return {
        formData:{},
    };
  },
  methods: {
    //获取数据
    getUserDetail() {
      //  this.newCommon.loading(true);
      getUerDetail(this.userId).then(res => {
         //  this.newCommon.loading(false);
        if (res.status == "1") {
          this.formData = res.data;
        } else {
          this.newCommon.message({status:res.status,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    //关闭
    close(){
        this.$emit("close",true)
    }
  },
  mounted() {
    this.getUserDetail();
  }
};
</script>
<style scoped>

</style>
