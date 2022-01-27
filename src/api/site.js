import request from '@/utils/request'

// 获取首页中的四个社交平台信息
export function fetchSocial() {
  return request({
      url: '/social',
      method: 'get',
      params: {}
  });
}

// 获取网站的一些基本信息
export function fetchSiteInfo() {
  return request({
      url: '/site',
      method: 'get',
      params: {}
  })
}