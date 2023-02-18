<template>
  <div class="cockfight-view">
    <GameBg groups="8" >
      <div class=" game-text" >
        <p class="bg-title is-bold">{{ t('extra.cockfight') }}</p>
        <p>{{t('extra.cockText')}}</p>
      </div>
    </GameBg>
    <d2-container class="mt-30">
      <ul class="flex-box-between">
        <li class="game-item flex-box is-center"
            :style="item.icon&&{backgroundImage:`url(${item.icon})`}"
            @click="startGame(item)"
            v-for="item in  gameList"
        >
          <div class="game-info is-bold" :class="{'has-game':item.icon}">
            <p class="game-name " v-if="!item.icon">{{item.name}}</p>
            <div class="play-now flex-box fs-16">Play Now</div>
          </div>
        </li>
      </ul>
    </d2-container>

  </div>
</template>

<script setup>
import GameBg from "../live/components/game-bg.vue"
import {$post} from "../../request";
import {computed, onMounted, reactive} from "vue";
import {useI18n} from "vue-i18n";
import {getToken} from "../../utils/permission";
import {dialogConfirm} from "../../components/custom-dialog";
import {useRouter} from "vue-router";

const router=useRouter()
const {t}=useI18n()

const state=reactive({
  platList:[]
})
const getGameList = () => {
  return new Promise((resolve, reject) => {
    $post("gameList", { groups: [8] })
      .then((res) => {
        if (res.code === 0) {
          state.platList = res.data;
        }
        resolve();
      })
      .catch(() => reject());
  });
};
const gameList=computed(()=>{
  const {platList}= state
  // const gameList=[]
  const extraData={
    name:'COMING SOON',
    img:''
  }
  const realGame=platList.slice(0,2);
  const gameList=[...realGame]
  // console.log(realGame);
  const length=2-realGame.length;
  for (let i=0;i<length;i++){
    gameList.push(extraData)
  }
  return gameList
})
const startGame = async ({ id, platId=8, gameId }) => {
  if(id){
    if (getToken()) {
      $post("startGame", { id, gameId:id, playMode: 1 }).then((res) => {
        if (res.code === 0) {
          router.push({
            name: "gameRoom",
            query: { data: res.data, id, platId, gameId:id },
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
  }

};
onMounted(()=>{
  getGameList()
})
</script>

<style lang="scss" scoped>
.cockfight-view{
  //min-height: 800px;
  .game-item{
    width: 49%;
    height: 326px;
    background: rgba(0,0,0,0.00);
    border-radius: 20px;
    border: 1px solid transparent;
    box-sizing: border-box;
    background: url(@/assets/images/game/cockfight.png) no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
    transition: all .5s;
    position: relative;
    &:hover{
      //border-color: $main-color;
      background-size: 110% 110%;
      .has-game{
        display: block;
      }
    }
    .game-info{
      //position: absolute;
      //width: 100%;
      //height: 40%;
      //left: 0;
      //bottom: 0;
      //border-radius: 0 0 20px 20px;
      text-align: center;
      color: #fff;
      .game-name{
        font-size: 22px;
      }
      .play-now{
        width: 116px;
        height: 40px;
        background: linear-gradient(270deg,#bef1ff, #5fb5d2);
        border-radius: 8px;
        justify-content: center;
        margin: 26px auto 0;
      }
    }
    .has-game{
      display: none;
    }
  }
}
.mt-30{
  margin-top: 30px;
}
.game-text{
  max-width: 60%;
  color: var(--theme-main-color);
  padding-left: 130px;
  font-size: 30px;
  .bg-title{
    font-size: 60px;
    margin-bottom: 10px;
    color: #fff;
  }
}
</style>
