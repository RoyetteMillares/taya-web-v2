import { defineStore } from "pinia";
import { $get, $post } from "../request";
export const useMessage = defineStore("message", {
  state: () => {
    return {
      noticeCountList: [],
      noticeList: [],
    };
  },
  getters: {
    noticeCount: (state) => {
      let num = 0;
      if (state.noticeCountList.length) {
        state.noticeCountList.forEach((item) => {
          num += item.count * 1;
        });
      }
      return num;
    },
  },
  actions: {
    // get notice count
    GET_NOTICE_COUNT() {
      return new Promise((resolve, reject) => {
        $post("getNoticeCount")
          .then((res) => {
            if (res.code === 0) {
              this.noticeCountList = res.data;
            }
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    //  message as read
    READ_MESSAGE(params) {
      return new Promise((resolve, reject) => {
        $post("updateMessageStatus", params)
          .then((res) => {
            if (res.code === 0) {
              this.noticeCountList = res.data;
            }
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    // delete all message
    DELETE_MESSAGE(params) {
      return new Promise((resolve, reject) => {
        $post("deleteMessageStatus", params)
          .then((res) => {
            if (res.code === 0) {
              this.noticeCountList = res.data;
            }
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    // get notice in home page
    GET_NOTICE(params) {
      return new Promise((resolve, reject) => {
        $post("getLampList", params)
          .then((res) => {
            if (res.code === 0) {
              this.noticeList = res.data;
            }
            resolve(res);
          })
          .catch(() => reject());
      });
    },
  },
});
