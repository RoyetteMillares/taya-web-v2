import { defineStore } from "pinia";
import socket from "../utils/socket";
import { getToken } from "../utils/permission";
import { useAppStore } from "./app";
import { useMessage } from "./message";
import { useUserStore } from "./user";

export const useSocket = defineStore("socket", {
  state: () => {
    return {
      ws: null,
    };
  },
  actions: {
    /**
     * 连接 socket
     */
    async CONNECT_SOCKET() {
      try {
        let config = useAppStore().config;
        if (!config.length) {
          const { code, data } = await useAppStore().GET_CONFIG();
          if (code === 0 && data && data.length) config = data;
        }
        if (config.length) {
          const socketUrl = config.find(
            (item) => item.title === "ws_server"
          )?.value;
          if (socketUrl) {
            this.ws = new socket(`${socketUrl}/${getToken()}/d`);
          }
        }
      } catch (e) {
        console.log(e, 9090);
      }
    },
    /**
     * 断开连接
     */
    CLOSE_SOCKET() {
      if (this.ws) {
        this.ws.$soctket_close();
      }
      this.ws = null;
    },
    /**
     * 接收信息
     */
    ACCEPT_MESSAGE(val) {
      try {
        const { action, message } = JSON.parse(val);
        switch (action) {
          // 公告消息通知
          case "SYSTEM_NOTIFICATION":
            useMessage().GET_NOTICE(); // 获取公告
            break;
          //  站内信 通知
          case "STATION_LETTER":
            useMessage().GET_NOTICE_COUNT(); // 获取消息数量
            break;
          // 消息更新
          case "NOTICE_CHANGE":
            useMessage().GET_NOTICE_COUNT(); // 获取消息数量
            break;
          case "DEPOSIT_COIN_CHANGE":
            useUserStore().GET_USER_PROFILE(); // 获取用户信息
            useUserStore().GET_USER_VIP_INFO(); // vip信息
          // 流水变化  更新余额
          case "COIN_CHANGE":
            useUserStore().adjustCoin(message)
            // useUserStore().GET_USER_PROFILE(); // 获取消息数量
            break;
          default:
            break;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
