/**
 * 个人中心模块 相关 layout
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
import MineLayout from "@/components/mine-layout/index.vue";
import i18n from "@/locales";
const t = i18n.global.t;

export default [
  {
    path: "/mine",
    component: MineLayout,
    name: "mine",
    redirect: { name: "profile" },
    meta: {
      title: 'Profile',
      isAuth: true,
    },
    children: [
      {
        path: "adjust",
        component: () => import("@/views/mine/adjust/index.vue"),
        name: "adjust",
        meta: {
          title: t("mine.adjust.AccountHistory"),
        },
      },
      {
        path: "betRecord",
        component: () => import("@/views/mine/betRecord/index.vue"),
        name: "betRecord",
        meta: {
          title: t("extra.betRecord"),
        },
      },

      {
        path: "wallet",
        component: () => import("@/views/mine/wallet/index.vue"),
        name: "wallet",
        meta: {
          title: t("wallet.myWallet.wallet"),
        },
      },
      {
        path: "Clubhouse",
        component: () => import("@/views/vip/index.vue"),
        name: "Clubhouse",
        meta: {
          title: t("about.clubhouse"),
        },
      },
      {
        path: "information",
        component: () => import("@/views/mine/information/index.vue"),
        name: "information",
        meta: {
          title: t("mine.information.Information"),
        },
      },
      {
        path: "recharge",
        component: () => import("@/views/mine/recharge/index.vue"),
        name: "recharge",
        meta: {
          title: [
            t("wallet.myWallet.wallet"),
            t("wallet.recharge.RechargeUSDT"),
          ],
        },
      },

      {
        path: "withdrawReal",
        component: () => import("@/views/mine/withdraw/withdrawReal/index.vue"),
        name: "withdrawReal",
        meta: {
          title: [t("wallet.myWallet.wallet"), t("routerTitle.Withdraw")],
        },
      },
      {
        path: "detail",
        component: () => import("@/views/mine/information/detail/index.vue"),
        name: "detail",
        meta: {
          title: [t("mine.information.Information"), t("routerTitle.Detail")],
        },
      },
      {
        path: "",
        component: () => import("@/views/mine/profile/index.vue"),
        name: "profile",
        meta: {
          title: t("new.myAccount"),
        },
      },
    ],
  },
];
