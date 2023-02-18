import { defineStore } from "pinia";
import { $get, $post } from "../request";
export const useHelpStore = defineStore("help", {
  state: () => {
    return {
      typesList: [],
      contentList: [],
      detail: {},
    };
  },
  getters: {},
  actions: {
    HELPTYPES(params) {
      return new Promise((resolve, reject) => {
        $post("helpTypes", params)
          .then((res) => {
            if (res.code === 0){
                let array = res.data.list
                let index = 0;
                let newArray = [];
                while(index < array.length) {
                    newArray.push(array.slice(index, index += 3));
                }
                this.typesList = newArray
            }
            resolve(res.code);
          })
          .catch(() => reject());
      });
    },
    HELPCONTENT(params) {
      return new Promise((resolve, reject) => {
        $post("helpContent", params)
          .then((res) => {
            if (res.code === 0) this.contentList = res.data;
            resolve(res.data);
          })
          .catch(() => reject());
      });
    },
    HELPDETAIL(params) {
      return new Promise((resolve, reject) => {
        $post("helpDetail", params)
          .then((res) => {
            if (res.code === 0) this.detail = res.data;
            resolve(res.code);
          })
          .catch(() => reject());
      });
    },
  },
});
