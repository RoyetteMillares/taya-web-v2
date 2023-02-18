<template>
  <section>
    <IndexBanner />
    <IndexNotice />
    <!-- <IndexPool /> -->
    <!-- <IndexHot :platList="state.platList" /> -->
    <IndexGame :gameList="state.gameList" />
  </section>

</template>

<script setup>
import {$post} from "../../request";
import {onMounted, reactive,defineAsyncComponent} from "vue";
const IndexBanner=defineAsyncComponent(()=>import('./components/index-banner.vue'));
const IndexNotice=defineAsyncComponent(()=>import('./components/index-notice.vue'));
const IndexPool=defineAsyncComponent(()=>import('./components/index-pool.vue'));
const IndexHot=defineAsyncComponent(()=>import('./components/index-hot.vue'));
const IndexGame=defineAsyncComponent(()=>import('./components/index-game.vue'));
const state=reactive({
  platList:[],
  gameList:[]
})
const getGameList = () => {
  return $post("gameList", { groups: [2] }).then((res) => {
    if (res.code === 0 && res.data && res.data.length) {
      state.platList = res.data;
      state.platId = res.data[0].id;
    }
  })
};
const getHotGame=()=>{;
  $post("hotGameList", { gameGroupId:[1] }).then((res)=>{
    if(res.code===0){
      const extraData={
        name:'COMING SOON',
        img:''
      }
      state.gameList = res.data.slice(0,48)

      if(state.gameList.length < 2){
        state.gameList.push(extraData)
      }
    }
  })
}
// get all of the game
// const getAllGame = () => {
//   const params = {
//     current: 1,
//     size: 12,
//     data: {
//       category: 1,
//       ids: [state.platId],
//       // name: state.name,
//     },
//   };
//   $post("slotGameList", params).then((res) => {
//     if (res.code === 0) {
//       state.gameList = res.data.list;
//       // state.total = +res.data.total;
//     }
//   });
// };
onMounted(async()=>{
  await getGameList()
  getHotGame()
})
</script>

<style scoped>

</style>
