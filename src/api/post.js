import request from "@/utils/request";

// 获取文章列表
export function fetchList(params) {
  return request({
    url: "/post/list",
    method: "get",
    params: params,
  });
}

// 获取某篇文章
export function fetchArticle(params) {
  return request({
    url: "/post/article",
    method: "get",
    params: params,
  });
}

// 文章热度+1
export function addViewsCount(data) {
  return request({
    url: "/article/viewscount/add",
    method: "post",
    data,
  });
}
