import { defineStore } from "pinia";
import { $get, $post } from "../request";
export const useHomeStore = defineStore("home", {
  state: () => {
    return{
      bannerList: [], //banner list in home index
      jackpotList:{},
      rankList:[]
    };
  },
  actions: {
    GET_BANNER(params) {
      return new Promise((resolve, reject) => {
        $post("getBannerList", params).then((res) => {
          if (res.code === 0){
            this.bannerList = res.data
          }
          resolve(res);
        })
          .catch(() => reject())
      })
    },
    GET_JACKPOT(){
      return new Promise(async (resolve, reject) => {
        const {code,data} = await $post("getJackpotAndPayout");
        if(code===0) this.jackpotList=data
        resolve({code,data});
      })
    },
    GET_RANK(params){
      return new Promise(async (resolve, reject) => {
        const {code,data} = await $post("rankingList",params);
        if(code===0) this.rankList=params.category===0?data.slice(0,10):data.slice(0,20)
        resolve({code,data});
      })

    }
  }
})
