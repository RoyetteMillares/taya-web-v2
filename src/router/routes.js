/**
 * meta参数说明
 * meta:{
 *     isAuth: true 页面是否需要登录进入
 *     isCache :true 是否需要缓存
 *     title : 面包屑展示
 *     showSearch: 是否显示顶部搜索框
 * }
 */
import frameIn from "./frameIn";
import frameInInfo from "./frameInInfo";
// 框架外的路由组成
const frameOut = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/index.vue"),
    meta: {
      title: "Register",
    },
  },
];
// 异常路由合集
const errorPage = [
  {
    path: "/:catchAll(.*)",
    // path: '/:pathMatch(.*)*',
    name: "error",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404 Error Page",
    },
  },
];

export default [...frameOut, ...frameIn, ...frameInInfo, ...errorPage];
