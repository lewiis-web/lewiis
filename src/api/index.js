/**
 * 
 * 存放一些其他的api
 * 
 */

import request from '@/utils/request'


export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
