export default ((win) => {
  let obj = {};
  Date.prototype.format = function (fmt) {
    let o = {
      "M+": this.getMonth() + 1,               //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  };
  //深度克隆
  obj.deepClone = (obj) => {
    let str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (JSON) {
      str = JSON.stringify(obj); //系列化对象
      newobj = JSON.parse(str); //还原
    } else {
      for (let i in obj) {
        newobj[i] = typeof obj[i] === 'object' ?
          this.deepClone(obj[i]) : obj[i];
      }
    }
    return newobj;
  };
  //obj判断类型：返回传递给他的任意对象的类
  obj.isClass = (o) => {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  };
  return obj;
})(window);