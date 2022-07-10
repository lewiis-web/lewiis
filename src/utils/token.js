export const _cookie = {
  setCookie: (name, value) => {
    // var Days = 30;
    var exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
  },
  getCookie: (name) => {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      // console.log(unescape(arr[2]))
      // return unescape(decodeURIComponent(arr[2]));
      return decodeURIComponent(arr[2]);
    } else return null;
  },
  removeCookie: (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + null + ";expires=" + exp.toGMTString();
  },
};
