import { nanoid } from "nanoid";

export const oauth = {
	gitee: {
		GITEE_CLIENT_ID: `64d0cb8fe89c1db81192711eec555924d4598b2d7a86a813bbeff71572b84a21`,
		REDIRECT_URI: `http://lewiis.top/`,
	},
	github: {
		GITHUB_CLIENT_ID: `6f69dc8edcbaf3780541`,
		REDIRECT_URI: `http://lewiis.top/`,
		SCOPE: "user",
		ALLOW_SIGNUP: true,
		STATE: nanoid(),
	},
	huawei: {
		CLIENT_ID: `108042279`,
		REDIRECT_URI: `http://lewiis.top/`,
	},
	baidu: {
		ID: `32254957`,
		REDIRECT_URI: `http://lewiis.top/`,
		API_KEY: `jsAgEehIBMYxcTaa1rc6m56q`,
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
