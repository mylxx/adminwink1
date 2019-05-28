import msg from '../components/msg'
import { requestlogout, requestadminmenu } from './common/api.js';
export default {
    data() {
        return {
            sysName: '',
            collapsed: false,
            sysUserName: '',
            sysUserAvatar: '',
            editableTabsValue: '0',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            adminmenudata: [],
            entry: {
                path: "/home",
                router: [{
                    'title': '首页',
                    'method': '/home'
                }]
            }
        }
    },
    beforeCreate() {
        (this.$route.path == '/login' || this.$route.path == '/' || this.$route.path == '/home') ? '' : this.$router.push({ path: '/home' });
        
        window.onpopstate = (index) => {
            location.href = '/'
        }
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
    methods: {
        onSubmit() {

        },
        handleopen() {
            //console.log('handleopen');
        },
        handleclose() {
            //console.log('handleclose');
        },
        handCloseInfo() {

        },
        handleTabsremove(index) {
            if (index != '0') {
                this.entry.router.splice(index, 1);
                this.$router.push({ path: this.entry.router[index - 1].method });
                this.editableTabsValue = `${index - 1}`;
            }
        },
        entryRouter(item) {
            this.$router.push({ path: this.entry.router[item].method });//tabs切换
        },
        handselectclick: function (item, index) {
            var _this = this;
            var str = '';
            this.entry.router.map(function (v, k) {
                item.method == v.method ? str = k : '';
            })
            if (!str) {
                _this.entry.router.push(item);
                this.editableTabsValue = `${this.entry.router.length - 1}`;//tabs指定
            } else {
                this.editableTabsValue = `${str}`;
            }
            (index || index == 0) ? this.$router.push({ path: `/${item.method}` }) : '';
        },
        homeClose(item, data) {
            return data.slice(0, item);
        },
        //退出登录
        logout: function () {
            var _this = this;
            this.logining = true;
            this.$confirm('确认退出吗?', '提示').then(() => {
                let model = '';
                requestlogout(model).then(res => {
                    this.logining = false;
                    if (res.status == '1') {
                        _this.$router.push('/');
                    } else {
                        this.newCommon.message({
                            status: res.status,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                });

            }).catch(() => {

            });


        },
        //折叠导航栏
        collapse: function () {
            this.collapsed = !this.collapsed;
        },
        showMenu(i, status) {
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
        },
        getUserAdminData() {
            var _this = this;
            requestadminmenu().then(res => {
                if (res.status == '1') {
                    let menuList = [], adminMenu = {};
                    for (let key in res.data.adminmenu) {
                        menuList.push(res.data.adminmenu[key]);
                    }
                    this.newCommon.sortMenuNav(menuList);
                    menuList.forEach(function (item, i) {
                        adminMenu[i] = item;
                    });
                    _this.adminmenudata = adminMenu;
                   
                   
                } else {
                    this.newCommon.message({
                        status: res.status,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(() => {

            })


        },
        entrynodes(nodes) {
            return nodes ? true : false;
        },
        loadingToute(item, index) {
            // let str='';
            // this.entry.router.map(function(v,k){
            //     (item.path == v.method || item.path.indexOf(v.method)>0)?str = k:'';
            // })
            // str === ""?'':this.editableTabsValue = `${str}`;

        },
    },
    mounted() {
        this.sysUserName = this.newCommon.getCookie('username');
        this.sysName = this.newCommon.getCookie('adminGroup');
        // this.getUserAdminData();
    },
    watch: {
        "$route": "loadingToute"
    },
    components: {
        msg
    }
}
window.onload = function () {
    $(".tabs-close .el-icon-close").first().hide();
}

