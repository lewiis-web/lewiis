export const oauth = {
	gitee: {
		GITEE_CLIENT_ID: `64d0cb8fe89c1db81192711eec555924d4598b2d7a86a813bbeff71572b84a21`,
		REDIRECT_URI: `http://lewiis.top/`,
	},
};

// 是否登录
export const calculateIsLogin = () => {
	const cui = sessionStorage.getItem("currentUserInfo");
	const currentUserInfo = cui ? JSON.parse(cui) : {};
	return Object.keys(currentUserInfo).length > 0;
};

// 授权登录用户信息
export const getCurrentOauthUserInfo = () => {
	const cui = sessionStorage.getItem("currentUserInfo");
	return cui ? JSON.parse(cui) : {};
};
