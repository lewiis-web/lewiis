/**
 * 
 * 存放一些其他的api
 * 
 */

import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/post/list',
        method: 'get',
        params: params
    })
}


export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
