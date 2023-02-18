import {defineStore} from "pinia";
import {$post} from "@/request/index.js";

export const myBetStore = defineStore("myBet", {
  state: () => {
    return {
      formParms: {
        current: 1,
        data: {
          startTime: null,
          endTime: null,
          gameTypeId: 0,
          status: 0
        },
        size: 10,
      },
      list: [],
      state: {
        page: 1,
        total: 30,
        size: 10,
      },
      statusList: [],
      type: {"1": "CASH", "2": "BONUS", "3": "FREE SPINS", "4": "EVENT FREE SPINS"}
    };
  },
  getters: {},
  actions: {
    GET_LIST: async function (currentPage=1) {
      this.formParms.current = currentPage;
      let {data} = await await $post('queryMyBets', this.formParms);
      this.state.page = data.current;
      this.state.size = +data.size;
      this.state.total = +data.total;
      this.list = data.list;
    },
    GET_GAMELIST: async function () {
      let {data} = await await $post('gameList');
      var type = {};
      var statusList = [];
      for (let v of data) {
        type[v.id] = v.name;
        statusList.push({code: v.id, title: v.name})
      }
      this.type = type;
      this.statusList = statusList;
    },

  },
});
