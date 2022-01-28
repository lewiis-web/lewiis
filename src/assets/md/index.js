// md文件批量引入
import article1 from "./article1.md";

// 创建md组件同时设置文章其他信息，单独导出使用
export const components = {
  article1: {
    id: 1,
    name: article1,
    type: ["javaScript"],
    describe: "前端面试题",
    date: "2021-11-22 10:00:00",
  },
};
// 注册全部md组件
export const mdArticle = function (Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key].name);
  });
};