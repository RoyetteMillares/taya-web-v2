/**
 * 首页模块 相关 layout
 */
/**
 * meta参数说明
 * meta:{
 *     isAuth: true 页面是否需要登录进入
 *     isCache :true 是否需要缓存
 *     title : 面包屑展示 数组的形式 如果是包含上级 (不包含Home) [parent,current] parent 父级name current 自身路由name
 *     showSearch: 是否显示顶部搜索框
 * }
 */

import Layout from "@/components/layout/index.vue";
import i18n from "@/locales";
const { t } = i18n.global

// 框架内路由 (针对首页部分)
export default [
  {
    path: "/",
    component: Layout,
    redirect: { name: "index" },
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          showSearch: false,
        },
      },
      // {
      //   path: "inPlay",
      //   name: "inPlay",
      //   component: () => import("@/views/sports/inPlay/index.vue"),
      //   meta: {
      //     showSearch: false,
      //   },
      // },
      // {
      //   path: "upcoming",
      //   name: "upcoming",
      //   component: () => import("@/views/sports/upcoming/index.vue"),
      //   meta: {
      //     showSearch: false,
      //   },
      // },
      // {
      //   path: "myBet",
      //   name: "myBet",
      //   component: () => import("@/views/sports/myBet/index.vue"),
      //   meta: {
      //     showSearch: false,
      //     isAuth: true,
      //   },
      // },
      {
        path: "liveChat",
        name: "liveChat",
        component: () => import("@/views/help/liveChat/index.vue"),
      },
      {
        path: "helpCenter",
        name: "helpCenter",
        component: () => import("@/views/help/helpCenter/index.vue"),
        meta: {
          title: t("menu.Help"),
        },
      },
      {
        path: "helpDetail",
        component: () => import("@/views/help/helpDetail/index.vue"),
        name: "helpDetail",
        meta: {
          title: [t("menu.Help"), t("help.GettingStarted")],
        },
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/help/about/index.vue"),
      },
      {
        path: "commissionRules",
        name: "commissionRules",
        component: () => import("@/views/commissionRules/index.vue"),
      },
      {
        path: "blog",
        name: "blog",
        component: () => import("@/views/blog/blog.vue"),
        meta: {
          title: t("menu.Blog"),
          showSearch: true,
        },
      },
      {
        path: "blog-detail",
        name: "blogDetails",
        component: () => import("@/views/blog/detail.vue"),
        meta: {
          title: [t("blog.BlogNews"), t("blog.BlogDetail")],
        },
      },
      {
        path: "searchData",
        name: "searchData",
        component: () => import("@/views/blog/searchData.vue"),
        meta: {
          title: [t("blog.BlogNews"), t("blog.BlogDetail")],
          showSearch: true,
        },
      },
      {
        path: "promote",
        name: "promote",
        component: () => import("@/views/promote/promote.vue"),
        meta: {
          title: t("menu.Promotions"),
        },
      },
      {
        path: "promote-detail",
        name: "promoteDetail",
        component: () => import("@/views/promote/detail.vue"),
        meta: {
          title: [t("menu.Promotions"), t("routerTitle.PromotionsDetail")],
        },
      },
      {
        path: "affiliate",
        name: "affiliate",
        component: () => import("@/views/affiliate/index.vue"),
        meta: {
          title: t("menu.Affiliate"),
          isAuth: false,
        },
      },
      {
        path: "vip",
        name: "vip",
        component: () => import("@/views/vip/index.vue"),
        meta: {
          title: t("menu.Club"),
        },
      },
      {
        path: "casino",
        name: "casino",
        component: () => import("@/views/casino/index.vue"),
        meta: {
          title: t("menu.Casino"),
          showSearch: true,
        },
      },
      {
        path: "live",
        name: "live",
        component: () => import("@/views/live/index.vue"),
        meta: {
          title: t("menu.Live"),
          showSearch: true,
        },
      },
      {
        path: "slots",
        name: "slots",
        component: () => import("@/views/slots/index.vue"),
        meta: {
          title: t("menu.Slots"),
          showSearch: true,
        },
      },
      {
        path: "turbo",
        name: "turbo",
        component: () => import("@/views/turbo/index.vue"),
        meta: {
          title: t("casino.TurboGames"),
          showSearch: true,
        },
      },
      {
        path: "cockfight",
        name: "cockfight",
        component: () => import("@/views/cockfight/index.vue"),
        meta: {
          showSearch: true,
        },
      },
      {
        path: "sports",
        name: "sports",
        component: () => import("@/views/sports/index.vue"),
        meta: {
          showSearch: true,
        },
      },
      {
        path: "fishing",
        name: "fishing",
        component: () => import("@/views/fishing/index.vue"),
        meta: {
          showSearch: true,
        },
      },
      {
        path: "gameRoom",
        name: "gameRoom",
        component: () => import("@/views/gameRoom/index.vue"),
        meta: {
          title: t("routerTitle.Gameroom"),
          isAuth: true,
        },
      },
    ],
  },
];
