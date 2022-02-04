import request from "@/utils/request";

export function addMessage(data) {
  return request({
    url: "/message/add",
    method: "post",
    data,
  });
}
