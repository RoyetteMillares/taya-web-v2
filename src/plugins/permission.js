/**
 * 路由处理 前置钩子
 */
import router from "../router";
import { getToken } from "../utils/permission";
import { scrollTop } from "../utils";
import { useAppStore } from "../store/app";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  useAppStore();
  // next()
  //登录校验
  if (to.meta.isAuth) {
    if (getToken()) return next();
    else {
      next("/login");
    }
  } else {
    return next();
  }
});
router.afterEach(() => {
  const el = document.getElementById("full-page");
  scrollTop(el, el.scrollTop, 0, 500);
  NProgress.done()
});
