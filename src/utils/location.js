// 这段代码写在js文件里
export function loadBMap(funcName) {
	const script = document.createElement("script");
	script.src =
		"http://api.map.baidu.com/api?v=2.0&ak=L9LfSG1hEhyME6ESvdhZOEmohVjkpOnp&callback=" +
		funcName;
	document.body.appendChild(script);
}
