# Lewiis的个人博客
## 介绍
>基于基于[fengziy.cn](https://fengziy.cn)二次开发；使用vue前端框架搭建；您高抬贵手，[Gitee仓库](https://gitee.com/lewiis/lewiis)star★一下哟!
## 完成功能
博客将持续更新，敬请关注···
- [x] 搜索
- [x] 分类/分类文章
- [x] 主页
- [x] 文章列表
- [x] 文章详情（展示后台的word文件）
- [x] 友情链接
- [x] 关于页/留言
- [x] 站点运行时间
- [x] 回到顶部
- [x] 文章列表分页
- [x] 路由动画
- [x] 点击心形特效
- [x] 独家资源列表

## 安装依赖
```
npm install
or
yarn
```

## 启动服务
```
npm run dev
or
yarn run dev
```

## 编译打包
```
npm run build
or
yarn run build
```

## 灵感来源

- [fengziy的个人博客](https://www.fengziy.cn/)
- [黄茂昌个人博客](https://www.hmchang.com/)
- [田珊珊个人博客](http://www.tianshan277.com/)

## git配置项

[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	#gitee
	url = https://gitee.com/lewiis/lewiis.git
	#github
	url = https://github.com/lewiis-web/lewiis.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
