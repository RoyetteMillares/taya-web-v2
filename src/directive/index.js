import clickOut from "./model/clickout";
import realImg from "./model/realImg";
import splicing from "./model/splicing";
import ground from "./model/ground";
export default {
  install: (app) => {
    app.directive("clickOut", clickOut);
    app.directive("realImg", realImg);
    app.directive("splicing", splicing);
    app.directive("ground", ground);
  },
};
