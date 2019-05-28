import Vue from 'vue'

let loading;
function common(){
    
}

//存储cookie
common.prototype.setCookie=(cname, cvalue, exdays)=>{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
common.prototype.getCookie = (cname) =>{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清理cookie
common.prototype.clearCookie=(name)=>{
    common.prototype.setCookie(name, "", -1);
}

//数组排序
common.prototype.sortArr = (arr,key)=>{
    arr.sort((a,b)=>{
        return a[key]-b[key]
    });
    return arr
}

//loading
let loaded;
common.prototype.startLoading=(index,dom)=>{
        loaded = Vue.prototype.$loading({
            lock: true,
            text: 'Loading',
            fullscreen:true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target:".content-wrapper"
        });
   
};
common.prototype.endLoading=(index,dom)=>{
    loaded.close();
};

//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
common.prototype.showFullScreenLoading=()=>{
    if (needLoadingRequestCount === 0) {
        common.prototype.startLoading();
    }
    needLoadingRequestCount++;
};
common.prototype.tryHideFullScreenLoading=()=> {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        common.prototype.endLoading();
    }
};
//递归
common.prototype.sonsTree=(obj,arr)=>{
        var children = new Array();
        for (var i = 0; i < arr.length; i++) {
            if(!arr[i].doCheck){
                arr[i]['disabled']=true
            }
            if (arr[i].parent == obj.menuid) {
                common.prototype.sonsTree(arr[i], arr);
                arr[i].ptitle=obj.title;
                children.push(arr[i]);
            }
        }
        if (children.length > 0) {
            obj.children = children;
        }
        return obj;
}
common.prototype.treeUtils=(adminmenu)=>{
    let ptree = [];
    for (var i = 0; i < adminmenu.length; i++) {
        if (adminmenu[i].parent == '0') {
            let o = common.prototype.sonsTree(adminmenu[i], adminmenu);
            ptree.push(o);
        }
    }
    console.info(ptree);
    return ptree;
}

//判断跳转
common.prototype.message = (index)=>{
    let obj={
        'type':'',
        'message':'',
        'iconClass':'',
        'showClose':true,
        'duration':4000,
        'dangerouslyUseHTMLString':true,
        onClose:function(msg){
            switch(index.status){
                case "10000006":
                    location.href='/';
            }
        }
    }
    let objrr =$.extend({}, obj, index);
    Vue.prototype.$notify(objrr);
}

// 导航菜单排序
common.prototype.sortMenuNav = (arr) => {
    let sortField = `sort_order`;
    let compareDigital = function (field) {
        return function (i, j) {
            return Number(i[field]) - Number(j[field])
        };
    }
    arr.sort(compareDigital(sortField));

    arr.forEach(function (item, i) {
        if (item.nodes && item.nodes.length > 0) {
            item.nodes.sort(compareDigital(sortField));
            common.prototype.sortMenuNav(item.nodes);
        }
    });
}
// 时间戳转时间
common.prototype.formatTime = (unixTimestamp,type) => {
    var dt = new Date(unixTimestamp * 1000);
    if (!Number(unixTimestamp) || Number(unixTimestamp) <= 0) {
        return '—';
    }
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    if (hours < 10)
        hours = '0' + hours;
    if (minutes < 10)
        minutes = '0' + minutes;
    if (seconds < 10)
        seconds = '0' + seconds;
    switch (type) {
        case 1:
            return hours + ":" + minutes + ":" + seconds;   //小时:分钟:秒  格式
        case 2:
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;    //年-月-日 小时:分钟:秒 格式
        case 3:
            return year + "-" + month + "-" + day;  //年-月-日 格式
        case 4:
            return  hours + ":" + minutes + ":" + seconds;
        case 5:
            return  hours + ":" + minutes;
        default:
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;    //年-月-日 小时:分钟:秒 格式
    }
}

var newCommon = new common();
export {
    newCommon
}