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

export default router;
