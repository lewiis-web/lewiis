import request from "@/utils/request";


// 添加留言
export function addMessage(data) {
  return request({
    url: "/message/add",
    method: "post",
    data,
  });
}

// 获取留言列表
export function fetchMessageList(data) {
  return request({
    url: "/bms/message/list",
    method: "post",
    data,
  });
}

// 删除留言
export function deleteMessage(params) {
  return request({
    url: "/bms/message/delete",
    method: "delete",
    params,
  });
}

// 审核留言
export function passMessage(data) {
  return request({
    url: "/bms/message/pass",
    method: "post",
    data,
  });
}
