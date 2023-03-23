module.exports = {
	devServer: {
		port: 8888,
		hot: true,
		open: true,
	},
	lintOnSave: true,
	configureWebpack: {
		module: {
			rules: [
				// 配置读取 *.md 文件的规则
				{
					test: /\.md$/,
					use: [
						{ loader: "html-loader" },
						{ loader: "markdown-loader", options: {} },
					],
				},
			],
		},
		externals: {
			BMap: "BMap", // 百度地图配置
		},
	},
};
