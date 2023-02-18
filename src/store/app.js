import { defineStore } from "pinia";
import { $get, $post } from "../request";
// import { useSocket } from "./socket";
import { getToken } from "../utils/permission";
// const locales = import.meta.globEager("./modules/*.js");
/**
 * 过滤地址 url
 */
// const formatPath = (path) => {
//     return path.replace("./modules/", "").replace(".js", "");
// };
/**
 * 匹配modules
 */
// const modules = {};
// for (let item in locales) {
//     modules[formatPath(item)] = locales[item].default;
// }
export const useAppStore = defineStore("app", {
  state: () => ({
    config: [],
    dictionary: [],
  }),
  getters: {},
  actions: {
    GET_CONFIG() {
      return new Promise((resolve, reject) => {
        $post("init")
          .then((res) => {
            if (res.code === 0) {
              this.config = res.data;
              // if (getToken()) useSocket().CONNECT_SOCKET(res.data);
            }
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    GET_DICTIONARY() {
      return new Promise((resolve, reject) => {
        $post("getDictionary")
          .then((res) => {
            if (res.code === 0) this.dictionary = res.data;
            resolve(res.code);
          })
          .catch(() => reject());
      });
    },
  },
});
