import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/post/list',
        method: 'get',
        params: params
    })
}

export function fetchArticle(params) {
    return request({
        url: '/post/article',
        method: 'get',
        params: params
    })
}