import request from "@/utils/request";

// 获取文章列表
export function fetchList(data) {
  return request({
    url: "/post/list",
    method: "post",
    data,
  });
}

// 获取文章详情
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

// 文章列表（筛选 分页）
export function fetchArticleList(data) {
  return request({
    url: "/bms/fetchArticleList",
    method: "post",
    data,
  });
}
