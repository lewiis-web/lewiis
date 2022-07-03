import request from "@/utils/request";

// 资源列表
export function fetchResource(data) {
  return request({
    url: "/resource",
    method: "post",
    data,
  });
}

// 资源列表（分页）
export function fetchResourceList(data) {
  return request({
    url: "/bms/fetchResourcesList",
    method: "post",
    data,
  });
}

// 添加资源
export function addResource(data) {
  return request({
    url: "/bms/resource/add",
    method: "post",
    data,
  });
}

// 删除资源
export function deleteResource(params) {
  return request({
    url: "/bms/resource/delete",
    method: "delete",
    params: params,
  });
}

// 更新资源
export function updateResource(data) {
  return request({
    url: "/bms/resource/update",
    method: "post",
    data,
  });
}
