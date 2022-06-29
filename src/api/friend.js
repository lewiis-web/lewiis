import request from '@/utils/request'

export function fetchFriend() {
  return request({
      url: '/friend',
      method: 'get',
      params: {}
  })
}

export function fetchFriendsList(data) {
  return request({
      url: '/bms/fetchFriendsList',
      method: 'post',
      data
  })
}

export function addFriendUrl(data) {
  return request({
      url: '/bms/addFriendUrl',
      method: 'post',
      data
  })
}