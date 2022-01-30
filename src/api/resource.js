import request from '@/utils/request'

export function fetchResource(data) {
  return request({
      url: '/resource',
      method: 'post',
      data
  })
}