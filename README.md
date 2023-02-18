# Vue 3 + TypeScript + Vite + Pinia

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.
# 包网项目

## 开发规范
- vue组件中相关方法和业务逻辑都需要添加注释 详细注释方法请看下面注释说明
- 为了后期整合方便防止组件之间代码冲突，每个模块相关代码要写在相关模块目录下面。详细请看下面文件结构
- 使用rem + flex布局 已经添加postcss-pxtorem可在less文件中直接写px，自动编译成rem
- json的key需要使用英文或者数字。
- yarn
## 项目结构
```shell
├── public/                           // 根目录静态资源目录除favicon.ico等浏览器需要访问根目录的静态资源
└── src/
      ├── assets/                     // 静态资源目录
      ├── components/                 // 公共组件目录
      ├── router/                     // 路由配置目录
      ├── store/                      // 状态管理目录
      ├── style/                      // 通用 CSS 目录
      ├── utils/                      // 工具函数目录
      └── views/                      // 页面组件目录
      └── server/                     // 请求相关 已配置axios
      └── directive                   // 自定义指令
      └── hooks                       // hooks 配置文件
      └── directive                   // 自定义指令
      └── plugin                      // 插件配置
    └── App.vue                       // 主入口禁止修改
    └── main.ts                       // 禁止注册全局组件
  
├── index.html
├── vite.config.js                 // Vite 配置文件
├── postcss.config.js              // pastcss 配置文件
├── webstorm.config.ts             // webstorm 配置文件 解决@无法识别问题
├── .editorconfig                  // EditorConfig 配置文件
├── .prettierrc                    // Prettier 配置文件
├── .env                         //  env 环境变量配置文件
```
