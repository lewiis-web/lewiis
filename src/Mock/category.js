const Mock = require('mockjs');
export default [
    {
        url: '/category', 
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: '前端',
                        href: '/category/font'
                    },
                    {
                        id: 2,
                        title: '后端',
                        href: '/category/back',
                    },
                    {
                        id: 3,
                        title: '数据库',
                        href: '/category/sql'
                    },
                    {
                        id: 4,
                        title: '随笔',
                        href: '/category/essays'
                    } 
                ]
            }
        }
    }
]