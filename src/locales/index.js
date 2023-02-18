import { createI18n } from "vue-i18n";
import zh from "./zh"; // 中文语言包
import en from "./en"; // 英文语言包
import es from "./es"; // 西班牙语言包
import pt from "./pt"; // 葡萄牙语言包
// import zhCn from "element-plus/lib/locale/lang/zh-cn";
// import enUS from "element-plus/lib/locale/lang/en";
// console.log(import.meta.env.VITE_APP_LOCAL)
const VITE_APP_LOCAL = import.meta.env.VITE_APP_LOCAL;
// 实例化I18n
const i18n = createI18n({
  locale: sessionStorage.lang || VITE_APP_LOCAL || "en", // 初始化配置语言
  legacy: false,
  messages: {
    zh,
    en,
    es,
    pt
  },
  warnHtmlMessage: false
});

export default i18n;
