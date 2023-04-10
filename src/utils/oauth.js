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
		HUAWEI_CLIENT_ID: `108042279`,
		// REDIRECT_URI: `http://lewiis.top/`,
		REDIRECT_URI: `http://localhost:8890/`,
		SECRET_KEY: `f2185ea86cf8ba3d16cd237c949a9d6a688a7da621ad292dac940b043496ecd5`,
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
