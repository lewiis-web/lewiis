import request from "@/utils/request";

// 获取首页中的四个社交平台信息
export function fetchSocial() {
  return request({
    url: "/social",
    method: "get",
    params: {},
  });
}

// 获取网站的一些基本信息
export function fetchSiteInfo() {
  return request({
    url: "/site",
    method: "get",
    params: {},
  });
}

// 获取后台四个数据卡片
export function fetchBmsHomeInfo() {
  return request({
    url: "/bms/home/info",
    method: "get",
    params: {},
  });
}

// 获取后台首页博客扇形图数据（博客浏览量前9名+其他）
export function fetchPieList() {
  return request({
    url: "/bms/article/pie/list",
    method: "get",
    params: {},
  });
}
