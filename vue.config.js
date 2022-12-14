module.exports = {
  devServer: {
    port: 8888,
    // hot: true,
    open: true,
  },
  lintOnSave: false,
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
  },
};
