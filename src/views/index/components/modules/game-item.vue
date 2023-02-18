<template>
<section class="all-item" @click="startGame(item)">
  <div v-ground="item.img ? sportbg:coming" class="show-img flex-box">
    <div @click.stop="gameCollection(item)" class="flex-box show-icon">
      <svg-icon
        v-if="item.img"
        :name="item.isFavorite ? 'collection-active' : 'collection'"
      ></svg-icon>
    </div>
  </div>
  <p class="game-name is-hidden">{{ item.name }}</p>
  <p class="is-hidden game-title">{{ item.platName }}</p>
</section>
</template>

<script setup>
import {$post} from "../../../../request";
import {customPopup} from "../../../../components/custom-popup";
import {getToken} from "../../../../utils/permission";
import {dialogConfirm} from "../../../../components/custom-dialog";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useGame} from "../../../../store/game";
import sportbg from "../../../../assets/images/game/sportgame.png"
import coming from "../../../../assets/images/game/coming-soon.png"

const game=useGame()
const {t}=useI18n()
const router=useRouter()
const props=defineProps({
  item:{
    type:Object,
    default:[]
  }
})
const gameCollection =async (item) => {
  if (getToken()){
    const params = {
      direction: item.isFavorite === 0 ? 1 : 0,
      gameId: item.gameId,
      gameSlotId: item.id,
    };
   const {code}=await game.GAME_COLLECTION(params);
      if (code === 0) {
        item.isFavorite = item.isFavorite === 1 ? 0 : 1;
        const msg= item.isFavorite===0?t('extra.cancelCollect'):t('extra.collectSuccess')
        // toast.success(msg,"",{isSuccess: true});
        customPopup(msg,"",{isSuccess: true});
      }
  }else{
    dialogConfirm(
      t('game.needLoginFirst'),
      t('public.Reminder'),
      {
        showCancelButton: true,
      }
    ).then(() => {
      router.push("/login");
    });
  }

};
const startGame = async ({ id, platId, gameId }) => {
  if (getToken()) {
    $post("startGame", { id, gameId, playMode: 1 }).then((res) => {
      if (res.code === 0) {
        router.push({
          name: "gameRoom",
          query: { data: res.data, id, platId, gameId },
        });
      }
    });
  } else {
    dialogConfirm(
      t('game.needLoginFirst'),
      t('public.Reminder'),
      {
        showCancelButton: true,
      }
    ).then(() => {
      router.push("/login");
    });
  }
};
</script>

<style lang="scss" scoped>
.all-item {
  //width: 185px;s
  width: 49%;
  cursor: pointer;
  margin: 0 2% 24px 0; 
  position: relative;
  overflow: hidden;
  transition:width 0.5s;
  .show-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 7px;
    //background: #000;
    border-radius: 5px;
  }
  &:hover {
    width: 60%;
    .show-img {
      //transform: scale(1.1);
      background-size: 105%;
    }
  }
  .show-img {
    height: 300px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    border-radius: 6px;
    transition: all 0.3s;
    transform: scale(1);
    //padding: 10px;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: flex-start;
  }
  &:nth-child(2n) {
    margin-right: 0;
  }
  .game-name {
    font-size: 28px;
    color: #fff;
    margin: 10px 0;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .game-title {
    color: $main-text-color;
    font-size: 20px;
    min-height: 25px;
    
  }
}
</style>
