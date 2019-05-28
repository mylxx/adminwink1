
export default {
  data() {
    return {
      logining: false,
      BRAND:BRAND,
      ruleForm2: {
        account: '',
        checkPass: '',
        googleauth:''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        googleauth: [
          { required: false, message: '请输入谷歌令牌', trigger: 'blur' },
        ]
      },
      checked: true
    };
  },
  created(){
    // let model='';
    // requestlogout(model).then(res => {
    //     if (res.status == '1') {
    //         this.newCommon.clearCookie('username');
    //         this.newCommon.clearCookie('adminid');
    //         this.newCommon.clearCookie('adminGroup');
    //     } else {
    //         this.newCommon.message({status:res.status,
    //         message: res.data.msg,
    //         type: 'error'
    //         });
    //     }
    // });
  },
  methods: {
    handleSubmit2(ev) {
      this.logining = true;
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          var model = {
            "loginCode":this.ruleForm2.account,
            "password":this.ruleForm2.checkPass,
            "googlepassword":this.ruleForm2.googleauth
          }
          let rsaPassWord = this.$encrypt(model.password)
          let loginData = Object.assign({},model)
          loginData.password = rsaPassWord
          this.commonApi.requestLogin(loginData).then(res => {
            this.logining = false;
            // document.cookie='session_id='+res.data.session_id
            // if (res.status == '1') {
            //   // document.cookie='session_id='+res.data.session_id;
            //   // document.cookie='username='+res.data.username;
            //   // document.cookie='adminid='+res.data.adminid;
            //   // document.cookie='adminGroup='+res.data.role;
            //   // this.$router.push({path:'/home'});
            // } else {
            //   this.newCommon.message({status:res.status,
            //     message: res.data.msg,
            //     type: 'error'
            //   });
            // }
          });
        } else {
          return false;
        }
      });
    }
  }
}