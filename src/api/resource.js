import request from '@/utils/request'

// 资源列表
export function fetchResource(data) {
  return request({
      url: '/resource',
      method: 'post',
      data
  })
}

// 资源列表（分页）
export function fetchResourceList(data) {
  return request({
      url: '/bms/fetchResourcesList',
      method: 'post',
      data
  })
}

// 添加资源
export function addResource(data) {
  return request({
      url: '/bms/resource/add',
      method: 'post',
      data
  })
}