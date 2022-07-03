import request from "@/utils/request";

export function addMessage(data) {
  return request({
    url: "/message/add",
    method: "post",
    data,
  });
}

export function fetchMessageList(data) {
  return request({
    url: "/bms/message/list",
    method: "post",
    data,
  });
}
