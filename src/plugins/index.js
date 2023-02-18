/**
 * 全局组件 插件 指令 以及路有钩子
 */
import { app } from "../main";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import svgIcon from "@/components/svg-icon/index.vue";
import mainContainer from "@/components/main-container/index.vue";
import customDialog from "@/components/custom-dialog/index.vue";
import customPagination from "@/components/custom-pagination/index.vue";
import customSelect from "@/components/custom-select/index.vue";
import customDate from "@/components/custom-date/index.vue";
import NoData from "@/components/no-data/index.vue";
import d2Container from "@/components/d2-container/index.vue";
import "./permission";
export default {
  install() {
    app
      .component("svg-icon", svgIcon)
      .component("main-container", mainContainer)
      .component("custom-dialog", customDialog)
      .component("custom-pagination", customPagination)
      .component("custom-select", customSelect)
      .component("custom-date", customDate)
      .component("d2-container", d2Container)
      .component("no-data", NoData);

    // .components("no-data", noData);
  },
};
