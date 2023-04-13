import { nanoid } from "nanoid";

export const oauth = {
	gitee: {
		GITEE_CLIENT_ID: `64d0cb8fe89c1db81192711eec555924d4598b2d7a86a813bbeff71572b84a21`,
		REDIRECT_URI: `http://lewiis.top/`,
	},
	gitee_test: {
		GITEE_CLIENT_ID: `16b744f6521390adfe7653334b1f2227d40e047191a01852575454cf59444d19`,
		REDIRECT_URI: `http://localhost:8890/`,
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
	weibo: {
		CLIENT_ID: `1348332593`,
		REDIRECT_URI: `http://lewiis.top`,
	},
};

// 是否登录
export const calculateIsLogin = () => {
	const cui = sessionStorage.getItem("sqlUserInfo");
	const sqlUserInfo = cui ? JSON.parse(cui) : {};
	return Object.keys(sqlUserInfo).length > 0;
};

// 授权登录用户信息
export const getCurrentOauthUserInfo = () => {
	const cui = sessionStorage.getItem("sqlUserInfo");
	return cui ? JSON.parse(cui) : {};
};
