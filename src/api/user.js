import request from "@/utils/request";

// 登录
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

// 获取用户列表
export function fetchUserList(data) {
  return request({
    url: "/user/list",
    method: "post",
    data,
  });
}

// 删除用户
export function deleteUser(params) {
  return request({
      url: '/user/delete',
      method: 'delete',
      params
  })
}
