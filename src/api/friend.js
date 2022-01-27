import request from '@/utils/request'

export function fetchFriend() {
  return request({
      url: '/friend',
      method: 'get',
      params: {}
  })
}