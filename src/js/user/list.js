import { getUserList,getCameData,viewphonenumber
   } from '../common/api.js';
import { formatTime} from '../common/filters';
import DetailDialog from '@/components/user/detail'
// import Pagination from '@/components/layout/pagination'
export default {
    components: {
        DetailDialog
        // Pagination
      },
    data() {
        return {
            dataValue: {
                id: '',
                nickname: '',
                mobile: '',
                active: '',
                app_platform: '',
                came_from: '',
                sex: '',
                certification: '',
                date: '',
                banned: '',
                regist_from:''
            },
            optionsActive: [
                { value: '', label: '-活跃情况-' },
                { value: '1', label: '核心用户' },
                { value: '2', label: '活跃用户' },
                { value: '3', label: '新用户' },
                { value: '4', label: '潜在流失用户' },
                { value: '5', label: '流失用户' }
            ],
            optionsApp: [
                { value: '', label: '-系统平台-' },
                { value: 'ios', label: 'iOS' },
                { value: 'android', label: 'Android' },
                { value: 'windows', label: 'Windows' },
                { value: 'unknown', label: 'Unknown' }
            ],
            optionsRegistered: [
                {value: '', label: '-用户来源-'}
            ],
            optionsSex: [
                { value: '', label: '-性别-' },
                { value: '1', label: '男' },
                { value: '2', label: '女' },
            ],
            optionsCertification: [
                { value: '', label: '-手机认证-' },
                { value: '1', label: '已认证' },
                { value: '2', label: '未认证' },
            ],
            optionsrRegisterWay: [
                { value: '', label: '-注册方式-' },
                { value: 'H5', label: 'H5注册' },
                { value: 'APP', label: 'APP注册' },
                { value: 'PC', label: 'PC注册' },
            ],
            optionsBanned: [
                { value: '', label: '-禁言-' },
                { value: '1', label: '是' },
                { value: '2', label: '否' },
            ],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            tableData: [],
            userId:"",
            detailDialog:false,
            currentPage:1
        }
    },
    methods: {
        //点击详情
        handleDetail(index, row) {
            this.userId=row.id;
            this.detailDialog=true
        },
        //翻页
        handleCurrentChange(val) {
            this.currentPage=val
            this.getListData();
        },
        //查看手机号
        viewphone(index, row){
             //  this.newCommon.loading(true);
            viewphonenumber(row.id).then(res=>{
                 //  this.newCommon.loading(false);
                if(res.status=='1'){
                    this.$alert('<strong>'+ res.data.mobile+ '</strong>', '手机号码', {
                        dangerouslyUseHTMLString: true
                      });
                }else{
                    this.newCommon.message({status:res.status,
                        message: res.data.msg,
                        type: 'error' 
                    })
                }
            })
        },
        //获取列表
        getListData(page){
            let _this=this;
             //  this.newCommon.loading(true);
            let dataObj={
                page:page||_this.currentPage,
                id:_this.dataValue.id,
                nickname:_this.dataValue.nickname,
                mobile:_this.dataValue.mobile,
                app_platform:_this.dataValue.app_platform,
                came_from:_this.dataValue.came_from,
                verification:_this.dataValue.certification,
                time_begin:_this.dataValue.date[0],
                time_end:_this.dataValue.date[1],
                regist_from:_this.dataValue.regist_from
            }
            getUserList(dataObj).then(res=>{
                 //  this.newCommon.loading(false);
                if(res.status=='1'){
                    _this.tableData=res.data
                    if(res.data.data.length==0){
                        _this.newCommon.message({status:res.status,
                            message: "没有数据",
                            type: 'error' 
                        })
                    }
                }else{
                    _this.newCommon.message({status:res.status,
                        message: res.data.msg,
                        type: 'error' 
                    })
                }
            })
        },
        //重置
        reset(){
            this.dataValue.id= '';    
            this.dataValue.nickname= '';
            this.dataValue.mobile='';
            this.dataValue.active= '';
            this.dataValue.app_platform= '';
            this.dataValue.came_from= '';
            this.dataValue.certification='';
            this.dataValue.date='';
            this.dataValue.regist_from=''
        },
        //获取注册来源
        getCameDataList(){
            let _this=this;
            getCameData().then(res=>{
                if(res.status=='1'){
                    $.each(res.data.data,function(i,k){
                        let obj={};
                        obj.value=k.channel_code;
                        obj.label=k.channel_name;
                        _this.optionsRegistered.push(obj)
                    })
                    let unknow= {value: 'UNKNOWN', label: '未知' };
                    _this.optionsRegistered.push(unknow)
                }else{
                    this.newCommon.message({status:res.status,
                        message: res.data.msg,
                        type: 'error' 
                    });
                    let unknow= {value: 'UNKNOWN', label: '未知' };
                    _this.optionsRegistered.push(unknow)
                }
            })
        },
    },
    mounted() {
       this.getListData();
       this.getCameDataList();
       this.index.search = this;
    },
   
}
