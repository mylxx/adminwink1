import axios from 'axios';
import Vue from 'vue';
let header = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/javascript, */*; q=0.01'
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
const service = axios.create({
    // timeout: 5000, // 请求超时时间
    headers: header,
    withCredentials: true,
    crossDomain: true,
})

//  请求拦截
service.interceptors.request.use(config => {
    Vue.prototype.newCommon.showFullScreenLoading();
    config.headers['session_id'] = getCookie('session_id') ? getCookie('session_id') : '';
    return config;
}, err => {
    Vue.prototype.newCommon.tryHideFullScreenLoading();
    Vue.prototype.newCommon.message({
        message: '请求超时'
    });
    return Promise.resolve(err);
})
//  响应拦截
service.interceptors.response.use(data => {
    Vue.prototype.newCommon.tryHideFullScreenLoading();
    if (data.status && data.status == 200 && data.data.code != '1') {
        if (!data.data.data) {
            Vue.prototype.newCommon.message({
                message: '网络错误',
                'status': ''
            })
            return data
        }
        if (data.data.status != "10000006") {
            Vue.prototype.newCommon.message({
                message: !data.data ? '刷新频率太快，请稍后再试' : data.data.data.msg,
                'status': data.data.status
            })
        }
        return data;
    }
    return data;
}, err => {
    if (err.response.status == 504 || err.response.status == 404) {
        Vue.prototype.newCommon.message({
            'message': '服务器被吃了⊙﹏⊙∥'
        })
        Vue.prototype.commonIndex.loading(false);
    } else if (err.response.status == 403) {
        Vue.prototype.newCommon.message({
            message: '权限不足,请联系管理员!'
        })
    } else {
        Vue.prototype.newCommon.message({
            message: '网络连接失败，请重试!'
        })
    }
    return Promise.resolve(err);
})
//解码
function getparams(params) {
    if (!params) {
        return
    } else {
        return 'model=' + escape(JSON.stringify(params));
    }
}
function CommonApi() { }
// 登录
CommonApi.prototype.requestLogin = (params) => {
    return service({
        url: './api/home/login',
        method: 'post',
        data: params
    })
}


const commonApi = new CommonApi()
export default commonApi

//留言板
export const adminboard = () => {
    return axios.get(`${baseUrl}/api/?c=adminboard&m=getBoardbyadminId`, { headers: header }).then(res => res.data);
};

export const setcontent = params => {
    //带中文传参
    return axios.post(`${baseUrl}/api/?c=adminboard&m=setcontent`, { model: params }, { headers: header }).then(res => res.data);
}

//退出
export const requestlogout = () => {
    return axios.get(`${baseUrl}/api/?c=adminuser&m=dologout`, { headers: header }).then(res => res.data);
};
//获取权限
export const requestadminmenu = () => {
    return axios.get(`${baseUrl}/api/?c=adminmenu&m=getnodemenulists`, { headers: header }).then(res => res.data);
};
//用户前端 
export const adminmenugetlists = () => {
    return axios.get(`${baseUrl}/api/?c=adminmenu&m=getlists`, { headers: header }).then(res => res.data);
};
export const adminmenuEnable = params => {
    return axios.post(`${baseUrl}/api/?c=adminmenu&m=setadminmenuenable`, getparams(params), { headers: header }).then(res => res.data);
}
export const adminmenuDelect = params => {
    return axios.post(`${baseUrl}/api/?c=adminmenu&m=deleteadminmenu`, getparams(params), { headers: header }).then(res => res.data);
}
export const adminmenusetdocheck = params => {
    return axios.post(`${baseUrl}/api/?c=adminmenu&m=setdocheck`, getparams(params), { headers: header }).then(res => res.data);
}
export const setadminmenuorder = params => {
    return axios.post(`${baseUrl}/api/?c=adminmenu&m=setadminmenuorder`, getparams(params), { headers: header }).then(res => res.data);
}

export const getliststoselect = params => {
    return axios.get(`${baseUrl}/api/?c=adminmenu&m=getliststoselect`, { headers: header }).then(res => res.data);
}
export const getadminmenubymenuid = params => {
    return axios.get(`${baseUrl}/api/?c=adminmenu&m=getadminmenubymenuid&menuid=${params}`, { headers: header }).then(res => res.data);
}

export const editadminmenu = params => {
    return axios.post(`${baseUrl}/api/?c=adminmenu&m=editadminmenu`, { model: params }, { headers: header }).then(res => res.data);
}

export const createadminmenu = params => {
    //带中文传参
    return axios.post(`${baseUrl}/api/?c=adminmenu&m=createadminmenu`, { model: params }, { headers: header }).then(res => res.data);
}

export const adminuserlists = params => {
    return axios.get(`${baseUrl}/api/?c=adminuser&m=getlists`, { headers: header }).then(res => res.data);
}
export const adminuserinitadminuserpw = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=initadminuserpw`, getparams(params), { headers: header }).then(res => res.data);
}
export const setadminuserlock = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=setadminuserlock`, getparams(params), { headers: header }).then(res => res.data);
}

export const deleteadminuser = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=deleteadminuser`, getparams(params), { headers: header }).then(res => res.data);
}

export const cleargoogleauth = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=cleargoogleauth`, getparams(params), { headers: header }).then(res => res.data);
}

export const groupgetliststoselect = () => {
    return axios.get(`${baseUrl}/api/?c=admingroup&m=getliststoselect`, { headers: header }).then(res => res.data);
}

export const createadminuser = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=createadminuser`, getparams(params), { headers: header }).then(res => res.data);
}

export const getadminuserbyadminid = params => {
    return axios.get(`${baseUrl}/api/?c=adminuser&m=getadminuserbyadminid&adminid=${params}`, { headers: header }).then(res => res.data);
}

export const editadminuser = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=editadminuser`, getparams(params), { headers: header }).then(res => res.data);
}

export const deleteadmingroup = params => {
    return axios.post(`${baseUrl}/api/?c=admingroup&m=deleteadmingroup`, getparams(params), { headers: header }).then(res => res.data);
}

export const admingroupenable = params => {
    return axios.post(`${baseUrl}/api/?c=admingroup&m=admingroupenable`, getparams(params), { headers: header }).then(res => res.data);
}

export const showadmingroud = params => {
    return axios.get(`${baseUrl}/api/?c=adminuser&m=showadminuser&admingroupid=${params}`, { headers: header }).then(res => res.data);
}

/** 配置管理 start */
export const getconfiginfolist = () => {
    return axios.get(`${baseUrl}/api/?c=adminconfig&m=lists`, { headers: header }).then(res => res.data);
};

export const createconfiginfo = params => {
    return axios.post(`${baseUrl}/api/?c=adminconfig&m=create`, { model: params }, { headers: header }).then(res => res.data);
}

export const editconfiginfo = params => {
    return axios.post(`${baseUrl}/api/?c=adminconfig&m=update`, { model: params }, { headers: header }).then(res => res.data);
}

export const deleteconfiginfo = params => {
    return axios.post(`${baseUrl}/api/?c=adminconfig&m=delete`, { model: params }, { headers: header }).then(res => res.data);
}

export const sortconfigorder = params => {
    return axios.post(`${baseUrl}/api/?c=adminconfig&m=setsortorder`, { model: params }, { headers: header }).then(res => res.data);
}
/** 配置管理 end */


//用户列表
export const getUserList = params => {
    return axios.post(`${baseUrl}/api/?c=user&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//用户来源
export const getCameData = params => {
    return axios.post(`${baseUrl}/api/?c=promotion_channel&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//用户详情
export const getUerDetail = params => {
    return axios.get(`${baseUrl}/api/?c=user&m=detail&id=${params}`, { headers: header }).then(res => res.data);
};

export const updatepassword = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=updatepassword`, getparams(params), { headers: header }).then(res => res.data);
}

export const createadmingroup = params => {
    return axios.post(`${baseUrl}/api/?c=admingroup&m=createadmingroup`, { model: params }, { headers: header }).then(res => res.data);
}

export const getadmingroupbyid = params => {
    return axios.get(`${baseUrl}/api/?c=admingroup&m=getadmingroupbyid&admingroupid=${params}`, { headers: header }).then(res => res.data);
}

export const editadmingroup = params => {
    return axios.post(`${baseUrl}/api/?c=admingroup&m=editadmingroup`, { model: params }, { headers: header }).then(res => res.data);
}

/** 绑定Google令牌 */
export const bindgoogleauthforadminuser = params => {
    return axios.post(`${baseUrl}/api/?c=adminuser&m=setgoogleauth`, { model: params }, { headers: header }).then(res => res.data);
}

export const getqrcodeforgoogleauth = () => {
    return axios.get(`${baseUrl}/api/?c=adminuser&m=getgoogleauth`, { headers: header }).then(res => res.data);
}
//获取渠道列表
export const getchannellist = params => {
    return axios.post(`${baseUrl}/api/?c=promotion_channel&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//新建渠道
export const creatchannel = params => {
    return axios.post(`${baseUrl}/api/?c=promotion_channel&m=create`, { model: params }, { headers: header }).then(res => res.data);
}
//删除渠道
export const deletechannel = params => {
    return axios.delete(`${baseUrl}/api/?c=promotion_channel&m=delete&id=${params}`, { headers: header }).then(res => res.data);
}
//获取渠道详情
export const getchanneldetail = params => {
    return axios.get(`${baseUrl}/api/?c=promotion_channel&m=detail&id=${params}`, { headers: header }).then(res => res.data);
}
//编辑渠道
export const updatechannel = (id, params) => {
    return axios.post(`${baseUrl}/api/?c=promotion_channel&m=update&id=${id}`, { model: params }, { headers: header }).then(res => res.data);
}
//查看手机号码
export const viewphonenumber = params => {
    return axios.get(`${baseUrl}/api/?c=user&m=mobile&id=${params}`, { headers: header }).then(res => res.data);
}
//短信发送记录
export const codesmsrecode = params => {
    return axios.post(`${baseUrl}/api/?c=sms_record&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//获取片头
export const gettrailer = params => {
    return axios.post(`${baseUrl}/api/?c=trailer&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//删除片头
export const deletetrailer = (params) => {
    return axios.post(`${baseUrl}/api//?c=trailer&m=delete&id=${params}`, { headers: header }).then(res => res.data);
}
//更改片头状态
export const upadtetrailer = (id, params) => {
    return axios.post(`${baseUrl}/api/?c=trailer&m=update&id=${id}`, { model: params }, { headers: header }).then(res => res.data);
}
//广告位列表
export const advertspacelists = (params) => {
    return axios.post(`${baseUrl}/api/?c=advert_space&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//新增广告位列表
export const createadvertspacelists = (params) => {
    return axios.post(`${baseUrl}/api/?c=advert_space&m=create`, { model: params }, { headers: header }).then(res => res.data);
}
//广告位列表详情
export const getadvertspacedetail = (params) => {
    return axios.get(`${baseUrl}/api/?c=advert_space&m=detail&id=${params}`, { headers: header }).then(res => res.data);
}
//编辑广告位
export const updateadverspacetdetail = (id, params) => {
    return axios.post(`${baseUrl}/api/?c=advert_space&m=update&id=${id}`, { model: params }, { headers: header }).then(res => res.data);
}
//删除广告位
export const deleteadvertspace = (id, params) => {
    return axios.post(`${baseUrl}/api/?c=advert_space&m=delete&id=${id}`, { model: params }, { headers: header }).then(res => res.data);
}
//广告列表
export const advertlists = (params) => {
    return axios.post(`${baseUrl}/api/?c=advert&m=lists`, { model: params }, { headers: header }).then(res => res.data);
}
//广告列表详情
export const getadvertdetail = (params) => {
    return axios.get(`${baseUrl}/api/?c=advert&m=detail&id=${params}`, { headers: header }).then(res => res.data);
}
//新增广告列表
export const createadvertlists = (params) => {
    return axios.post(`${baseUrl}/api/?c=advert&m=create`, { model: params }, { headers: header }).then(res => res.data);
}
//编辑广告
export const updateadvertdetail = (id, params) => {
    return axios.post(`${baseUrl}/api/?c=advert&m=update&id=${id}`, { model: params }, { headers: header }).then(res => res.data);
}
//删除广告位
export const deleteadvert = (id, params) => {
    return axios.post(`${baseUrl}/api/?c=advert&m=delete&id=${id}`, { model: params }, { headers: header }).then(res => res.data);
}
//上传
export const uploadadvert = (params) => {
    return axios.post(`${baseUrl}/api/?c=advert&m=image_upload`, params, { headers: header }).then(res => res.data);
}