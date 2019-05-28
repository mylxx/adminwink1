import Vue from 'vue'

Vue.filter('formatTime', function (unixTimestamp,type) {
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
  })

  