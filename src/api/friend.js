import request from "@/utils/request";

export function fetchFriend() {
  return request({
    url: "/friend",
    method: "get",
    params: {},
  });
}

// 获取友链列表
export function fetchFriendsList(data) {
  return request({
    url: "/bms/fetchFriendsList",
    method: "post",
    data,
  });
}

// 添加链接
export function addFriendUrl(data) {
  return request({
    url: "/bms/addFriendUrl",
    method: "post",
    data,
  });
}

// 删除链接
export function deleteFriendUrl(params) {
  return request({
    url: "/bms/deleteFriendUrl",
    method: "delete",
    params,
  });
}

// 更新链接
export function updateFriendUrl(data) {
  return request({
    url: "/bms/updateFriendUrl",
    method: "put",
    data,
  });
}
