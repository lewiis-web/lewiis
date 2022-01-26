// const Mock = require('mockjs');
const List = [
  {
    id: 0,
    siteName: "Lewiis的个人博客",
    path: "https://lewiis.gitee.io",
    desc: "一个正在努力的web前端工作者"
  },
  {
    id: 1,
    siteName: "fzy's blog",
    path: "https://www.fengziy.cn/",
    desc: "一个It技术的探索者"
  },
  {
    id: 2,
    siteName: "张先森的个人博客",
    path: "http://www.zhangqinblog.com/",
    desc: "是一名前端开发工程师，是万千程序猿中的一只",
  },
  {
    id: 3,
    siteName: "杨青青的个人博客",
    path: "http://mood.qingqingblog.com/",
    desc: "一个爱好前端设计的80后女站长",
  },
  {
    id: 4,
    siteName: "文渊博客",
    path: "https://wenyuanblog.com/",
    desc: "不忘初心，方得始终",
  },
  {
    id: 5,
    siteName: "黄茂昌的个人博客",
    path: "https://www.hmchang.com/",
    desc: "怀旧有点逗比且内向的佛系少年，在校生，计算机科学与技术专业。",
  },
  {
    id: 6,
    siteName: "田珊珊个人博客",
    path: "http://www.tianshan277.com/",
    desc: "知识工人，女程序员",
  },
];
// const count = 5

// for (let i = 0; i < count; i++) {
//     List.push(Mock.mock({
//         id: '@increment',
//         siteName: "@cname",
//         path: "@url",
//         desc: "@ctitle(5,20)"
//     }))
// }

export default [
    {
        url: '/friend',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: List
            }
        }
    },
    List
]
