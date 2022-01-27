import request from '@/utils/request'

export function fetchFocus() {
  return request({
      url: '/focus/list',
      method: 'get'
  })
}