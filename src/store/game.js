import { defineStore } from "pinia";
import {  $post } from "@/request";

export const useGame = defineStore("game", {
  state: () => {
    return {
      collectionList: [],
    };
  },
  getters: {},
  actions: {
    GAME_COLLECTION(params){
      return new Promise(async resolve=>{
       const res=await $post("gameFavorite", params)
        this.GET_COLLECTION_LIST()
        resolve(res)
      })
    },
    GET_COLLECTION_LIST(){
      const params = {
        current: 1,
        size: 100,
        data: {
          category: 3,
          name: '',
        },
      };
      return new Promise(async (resolve, reject) => {

      const res=await   $post("slotGameList", params)
        if (res.code === 0) {
          this.collectionList = res.data.list;
        }
      resolve(res)
      });
    }
  },
});
