import request from '@/utils/request'

export function fetchCategory() {
  return request({
      url: '/category',
      method: 'get',
      params: {}
  })
}