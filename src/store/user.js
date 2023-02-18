import { defineStore } from "pinia";
import { $post, $get } from "../request";
import { clearToken } from "../utils/permission";
import { setToken } from "../utils/permission";
import { useWallet } from "./wallet";
import { customPopup } from "../components/custom-popup";
import { useSocket } from "./socket";
import i18n from "@/locales";
import { computed } from "vue";

const { t } = i18n.global;

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      isLogin: false,
      info: {},
      withdrawConfig: {},
      isPlay: false,
      vipInfo: {}, // vip信息
      vipList: [],
    };
  },
  getters: {
    // get player vip icon
    USER_VIP_ICON(state) {
      const iconInfo = computed(() => {
        const info = state.info;
        const vipList = state.vipList;
        return vipList?.find((item) => item.id === info?.levelId);
      })?.value;
      return iconInfo;
    },
  },
  actions: {
    // login
    LOGIN(params) {
      return new Promise((resolve, reject) => {
        $post("login", params)
          .then((res) => {
            if (res.code === 0) {
              setToken(res.data.apiToken);
              this.SAVE_PROFILE(res.data);
              this.GET_USER_VIP_INFO();
              this.GET_VIP_INFO();
              useWallet().GET_USER_BALANCE(); // 登陆成功请求钱包
              useSocket().CONNECT_SOCKET(); // 连接socket
            }
            resolve(res.code);
          })
          .catch(() => {
            reject();
          });
      });
    },
    // player register
    REGISTER(params) {
      return new Promise((resolve, reject) => {
        $post("register", params)
          .then((res) => {
            if (res.code === 0) {
              setToken(res.data.apiToken);
              this.SAVE_PROFILE(res.data);
              this.GET_USER_VIP_INFO();
              this.GET_VIP_INFO();
              useWallet().GET_USER_BALANCE(); // 请求钱包
              useSocket().CONNECT_SOCKET(); // 连接socket
            }
            resolve(res.code);
          })
          .catch(() => {
            reject();
          });
      });
    },
    // get player information
    GET_USER_PROFILE() {
      // useWallet().GET_USER_BALANCE(); // 请求钱包
      return new Promise((resolve) => {
        $post("profile").then((res) => {
          if (res.code === 0) {
            this.SAVE_PROFILE(res.data);
            useWallet().GET_USER_BALANCE(); // 请求钱包
          }
          resolve(res.code);
        });
      });
    },
    // player logout
    LOGOUT() {
      return new Promise((resolve, reject) => {
        $post("logout")
          .then((res) => {
            if (res.code === 0) {
              useSocket().CLOSE_SOCKET();
              clearToken();
              this.info = {};
            }
            resolve(res.code);
          })
          .catch(() => {
            reject();
          });
      });
    },

    CHANGE_LOGIN(type) {
      this.isLogin = type;
    },
    // check the player if need the code of google
    CHECK_NEED_GOOGLE(params) {
      return new Promise((resolve, reject) => {
        $post("checkOpenGoogleCode", params).then((res) => {
          if (res.code === 0) {
            resolve(res);
          } else resolve(res);
        });
      });
    },
    // save player information without call api
    SAVE_PROFILE(data) {
      this.isLogin = true;
      this.info = data;
    },
    // send the verification code of email
    SEND_CODE(params) {
      return new Promise((resolve, reject) => {
        resolve(0);
        // $post("checkOpenGoogleCode", params).then((res) => {
        //   if (res.code === "0") {
        //     resolve(res.data);
        //   } else resolve(1);
        // });
      });
    },
    // 获取用户vip信息
    GET_USER_VIP_INFO() {
      return new Promise((resolve, reject) => {
        $post("memberShipDetails")
          .then((res) => {
            if (res.code === 0) this.vipInfo = res.data;
            resolve(res.code);
          })
          .catch(() => reject());
      });
    },
    GET_VIP_INFO() {
      return new Promise((resolve, reject) => {
        $post("memberShipLevelDetails")
          .then((res) => {
            if (res.code === 0) this.vipList = res.data;
            resolve(res.code);
          })
          .catch(() => reject());
      });
    },
    // 发送邮箱验证码
    GET_EMAIL_CODE(params) {
      return new Promise((resolve, reject) => {
        $post("sendSesCode", params)
          .then((res) => {
            if (res.code === 0) {
              customPopup(t("tooltips.text01"), "", { isSuccess: true });
            }
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    // 发送短信验证码
    GET_PHONE_CODE(params) {
      return new Promise((resolve, reject) => {
        $post("sendSnsCode", params)
          .then((res) => {
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    // 发送手机验证码
    GET_MOBILE_CODE(params) {
      return new Promise((resolve, reject) => {
        $post("sendSmsCode", params)
          .then((res) => {
            if (res.code === 0) {
              customPopup(t("tooltips.text01"), "", { isSuccess: true });
            }
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    FORGET_PASSWORD(params) {
      return new Promise((resolve, reject) => {
        $post("forgotPassword", { ...params }, true)
          .then((res) => {
            if (res.code === 0)
              customPopup(t("tooltips.text02"), "", { isSuccess: true });
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    RESET_PASSWORD(params) {
      return new Promise((resolve, reject) => {
        $post("resetPassword", { ...params })
          .then((res) => {
            if (res.code === 0)
              customPopup(t("tooltips.text02"), "", { isSuccess: true });
            resolve(res);
          })
          .catch(() => reject());
      });
    },
    GET_SPORT_TOKEN() {
      return new Promise((resolve, reject) => {
        $post("getSportToken")
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 检查是否存在充值
    CHECK_DEPOSIT(params) {
      return new Promise((resolve, reject) => {
        $post("checkDeposit", params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 活动在申请
    APPLY_PROMOTION(params) {
      return new Promise((resolve, reject) => {
        $post("promotionsApplyAgain", params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    adjustCoin(info) {
      this.info = { ...this.info, ...info };
    },
  },
});
