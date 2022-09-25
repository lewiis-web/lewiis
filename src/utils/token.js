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
	clearAllCookies: () => {
		//清空cookie
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (var i = keys.length; i--;) {
				document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0)
			.toUTCString(); //清除当前域名下的,例如：m.kevis.com
				document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0)
					.toUTCString(); //清除当前域名下的，例如 .m.kevis.com
				document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0)
			.toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
			}
		}
	}
};
