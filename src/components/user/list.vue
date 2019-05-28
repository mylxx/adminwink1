<template>
  <section>
    <div class="well">
      <el-row>
        <el-col :span="2" class="reload">
          <el-button type="success" size="mini" @click="locationOnload('/user')">刷新</el-button>
        </el-col>
        <el-col :span="22">
          <div class="form-group">
            <el-input v-model="dataValue.id">
              <template slot="prepend">ID</template>
            </el-input>
          </div>
          <div class="form-group">
            <el-input v-model="dataValue.nickname">
              <template slot="prepend">用户名</template>
            </el-input>
          </div>
          <div class="form-group">
            <el-input v-model="dataValue.mobile">
              <template slot="prepend">手机号码</template>
            </el-input>
          </div>
          <div class="form-group">
            <el-select v-model="dataValue.app_platform" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsApp"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-select v-model="dataValue.came_from" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsRegistered"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-select v-model="dataValue.certification" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsCertification"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-select v-model="dataValue.regist_from" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsrRegisterWay"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="form-group">
             <el-date-picker
                v-model="dataValue.date"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
          </div>
          <div class="form-group">
            <el-button type="primary" size="small" @click="search()">搜索</el-button>
            <el-button type="danger"  @click="reset" size="small">清除</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData.data" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
        <el-table-column prop="nickname" label="用户名" width="150"></el-table-column>
        <el-table-column prop="came_from" label="来源" width="130">
        </el-table-column>
        <el-table-column prop="app_platform" label="手机系统" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.app_platform=='android'">{{scope.row.app_platform}}</el-tag>
              <el-tag v-else-if="scope.row.app_platform=='Web'" type='info'>{{scope.row.app_platform}}</el-tag>
              <el-tag v-else  type='warning'>{{scope.row.app_platform}}</el-tag>
           </template>
        </el-table-column>
        <el-table-column prop="verification" label="认证" width="120">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.verification == '1'">已认证</el-tag>
            <el-tag type="danger" v-if="scope.row.verification == '0'">未认证</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="last_login" label="注册方式">
        <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.regist_from == 'APP'">APP</el-tag>
            <el-tag type="warning" v-if="scope.row.regist_from == 'H5'">H5</el-tag>
            <el-tag type="danger" v-if="scope.row.regist_from == 'PC'">PC</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="last_ip" label="最后登录ip" width="120"></el-table-column> -->
        <el-table-column prop="last_login" label="最后登录时间">
          <template slot-scope="scope">{{scope.row.last_login | formatTime("2")}}</template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间">
          <template slot-scope="scope">{{scope.row.created_at | formatTime("2")}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="viewphone(scope.$index, scope.row)">查看手机号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination 
        v-if="tableData.currentpage"
        :page="tableData.currentpage"
        :shownextpage="tableData.shownextpage"
		    :len="tableData.data.length"
        :key=" (new Date()).valueOf()"
        @page-change="handleCurrentChange"
      ></pagination>
    </div>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="detailDialog" width="50%" center :modal-append-to-body="false" >
      <detail-dialog :userId="userId" @close="detailDialog=false" :key="userId"></detail-dialog>
    </el-dialog>
  </section>
</template>
<script src="@/js/user/list.js">
</script>
