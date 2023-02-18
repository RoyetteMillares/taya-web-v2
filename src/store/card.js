import { $post } from "@/request";
import { defineStore } from "pinia";
export const useCard = defineStore("card", {
  state: () => {
    return {
      cardList: [],
      configList: [],
      withdrawConfig: [],
      // 4 PIX 5 G-CASH
      parseJson: [4, 5], // 需要解析的transfer类型 categoryTransfer
    };
  },
  actions: {
    GET_USER_CARD(params = {}) {
      return new Promise((resolve, reject) => {
        $post("withdrawalAddressList", params).then((res) => {
          if (res.code === 0) {
            this.cardList = res.data.map((item) => {
              let title = "";
              if (item.categoryTransfer === 1 || item.categoryTransfer === 2)
                title = item.address;
              if (
                (item.categoryTransfer === 3 || item.categoryTransfer === 5) &&
                item.address
              ) {
                title = JSON.parse(item.address)?.accountNumber;
              }
              if (item.categoryTransfer === 4 && item.address) {
                title = JSON.parse(item.address)?.accountNo;
              }
              item.title = title;
              return item;
            });
          }
          resolve(res);
        });
      }).catch(() => reject());
    },
    GET_PLAT_CONFIG() {
      $post("getPlatConfigList").then((res) => {
        if (res.code === 0) this.configList = res.data;
      });
    },
    CREATE_CARD(params) {
      return new Promise((resolve, reject) => {
        $post("addWithdrawalAddress", params)
          .then((res) => {
            resolve(res.code);
          })
          .catch(() => reject());
      });
    },
    GET_WITHDRAW_CONFIG(params) {
      return new Promise((resolve, reject) => {
        $post("getWithdrawalChannelList", params)
          .then((res) => {
            if (res.code === 0) this.withdrawConfig = res.data;
            resolve(res);
          })
          .catch(() => reject());
      });
    },
  },
});
