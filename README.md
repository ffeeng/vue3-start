# plugin marker

> 本项目用于开发插件

## 简介

- 目录结构

├─build // 构建入口 \
├─dist  // 构建产物，执行`pnpm build`后生成 \
├─scripts // 项目脚本 \
├─src \
│  ├─assets // 公共资源 \
│  ├─components // 插件公共组件 \
│  ├─apps // 插件目录 \
│  │  └─hello // hello插件 \
│  │  └─xxx   // xxx插件 \
│  └─utils    // 工具函数 \
└─test   // 单测脚本

## 用法

* `dev` - 启动开发模式
* `build` - 构建生产环境
* `release` - 生成changelog，并升级版本号，标记tag
* `test` - Run all tests
* `test:watch` - watch模式下，Run all tests
* `test:coverage` - 生成单测覆盖率报告

### 开发模式
> vite打包生成dist，本地启动web静态资源服务器，内网穿透后映射到web端口后，即可通过公网域名访问插件entry.js
> 后将资源地址，配置到测试应用插件中
> hello插件地址示例：http://localhost:13003/hello/Plugin_Hello_entry.js

* 根目录新建.env.local
```
# frp use subdomain；请自定义修改，保证域名不重复就行
SUBDOMAIN=plg
```

### 生产环境
> [KAE 应用地址]
> 构建后，自动上传至cdn
> hello插件的，访问地址：

### Roadmap
- [x] 支持多插件打包
- [x] 支持映射公网地址
- [x] 支持dev动态编译调试
- [x] 支持css injection打包
- [ ] 配置测试应用



