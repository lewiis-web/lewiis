const Mock = require('mockjs');
export default [
    {
        url: '/focus/list',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: '前端',
                        img: 'https://z3.ax1x.com/2021/11/23/o9tw4K.png'
                    },
                    {
                        id: 2,
                        title: '后端',
                        img: 'https://z3.ax1x.com/2021/11/23/o9NJG8.png'
                    },
                    {
                        id: 3,
                        title: '数据库',
                        img: 'https://z3.ax1x.com/2021/11/23/o9NjeA.jpg'
                    }
                ]
            }
        }
    }
]