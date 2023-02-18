// get player balance of wallet
import { $post } from "../request";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useWallet = defineStore("wallet", {
  state: () => {
    return {
      walletList: {}, // 钱包列表
      platsList: [], // 存款渠道列表
      platAddress: "test", // coin充值钱包地址
      channelList: [],
      cryptoList: [], // 地址添加 提现通道
      depositList: [], // 充值通道地址
      withdrawChannelList: [], // 提款地址添加列表
    };
  },
  getters: {
    // player wallet information
    MAIN_WALLET(state) {
      const info = useUserStore().info;
      return {
        reelCoin: info.coin,
        mainCurrency: state.walletList.mainCurrency,
      };
    },
  },
  actions: {
    GET_USER_BALANCE() {
      return new Promise((resolve, reject) => {
        resolve(0);
        $post("getCurrencyCoin").then((res) => {
          if (res.code === 0) {
            this.walletList = res.data;
            // resolve(res.data);
          }
          resolve(res.data);
        });
      });
    },
    GET_DEPOSIT_PLATS(params) {
      return new Promise((resolve, reject) => {
        $post("getDepositPlats", params).then((res) => {
          if (res.code === 0) {
            this.platsList = res.data;
            resolve(res.data);
          }
        });
      });
    },
    GET_WITHDRAW_PLATS(params) {
      return new Promise((resolve, reject) => {
        $post("getWithdrawalPlat", params).then((res) => {
          if (res.code === 0) {
            this.cryptoList = res.data;
            resolve(res.data);
          }
        });
      });
    },
    GET_DEPOSIT_ADDRESS(params) {
      return new Promise((resolve, reject) => {
        this.platAddress = "";
        $post("getDepositAddress", params).then((res) => {
          if (res.code === 0) {
            this.platAddress = res.data;
          }
          resolve(res);
        });
      });
    },
    WITHDRAWAL(params) {
      return new Promise((resolve, reject) => {
        // resolve(0);
        $post("withdrawal", params).then((res) => {
          // if (res.code === 0) {
          //
          // }
          resolve(res);
        });
      });
    },
    // set main wallet
    SET_MAIN(params) {
      return new Promise((resolve, reject) => {
        $post("updateMainWallet", params).then((res) => {
          if (res.code === 0) {
            this.walletList = res.data;
            useUserStore().GET_USER_PROFILE();
          }
          resolve(res.data);
        });
      });
    },
    // GET_CHANNEL
    GET_CHANNEL(params) {
      return new Promise((resolve, reject) => {
        $post("getChannelList", params).then((res) => {
          if (res.code === 0) {
            this.channelList = res.data;
            // useUserStore().GET_USER_PROFILE();
          }
          resolve(res);
        });
      });
    },
    // 获取充值通道
    GET_DEPOSIT_CHANNEL() {
      return new Promise((resolve, reject) => {
        $post("getDepositChannelList").then((res) => {
          if (res.code === 0) {
            this.depositList = res.data;
          }
          resolve(res);
        });
      });
    },
    // 获取提款通道列表  getWithdrawalAddressType
    GET_WITHDRAW_CHANNEL() {
      return new Promise((resolve, reject) => {
        $post("getWithdrawalAddressType").then((res) => {
          if (res.code === 0) {
            this.withdrawChannelList = res.data;
          }
          resolve(res);
        });
      });
    },
  },
});
