import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      behavior: "smooth",
      el: "#full-page",
      top: -10,
    };
  },
});

//Add DYNAMIC PAGE TITLE 
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})

export default router;
