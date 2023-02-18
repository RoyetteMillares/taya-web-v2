import { createApp } from "vue";
import "@/style/main.scss";
import plugin from "@/plugins";
import store from "@/store";
import router from "@/router";
import App from "./App.vue";
import globDirective from "@/directive/index"; // 全局指令
import i18n from "./locales";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import {insertPublicKey} from "./utils/common";

insertPublicKey(import.meta.env.VITE_APP_PUBLIC_KEY);
export const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(i18n)
  .use(plugin)
  .use(globDirective)
  .mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
