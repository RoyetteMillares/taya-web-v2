<template>
  <div class="mode-game">
    <div class="mode-header is-bold flex-box-between fs-14">
      <span>{{ title }}</span>
      <span class="is-hand" @click="seeMall">{{t('game.SeeAll')}} </span>
    </div>
    <ul class="flex-box game-list">
      <li class="game-item" v-for="item in gameList" @click="startGame(item)">
        <div class="item-mask"></div>
        <!--                 :style="{ backgroundImage: `url(${item.img})` }"-->
        <div class="item-list-bg" v-ground="item.img"></div>
        <section class="top-view">
          <div @click.stop="gameCollection(item)" class="flex-box show-icon">
            <svg-icon
              :name="item.isFavorite ? 'collection-active' : 'collection'"
            ></svg-icon>
          </div>
          <!--          <p class="game-name">{{ item.platName }}</p>-->
        </section>
        <p class="game-title">{{ item.name }}</p>
      </li>
      <no-data
        v-show="!gameList || !gameList.length"
        type="collection"
        class="empty-tip"
        :text="t('game.dondHaveGames')"
      ></no-data>
    </ul>
  </div>
</template>

<script setup>
import { getToken } from "../../utils/permission";
import { $post } from "../../request";
import { dialogConfirm } from "../../components/custom-dialog";
import { customPopup } from "../../components/custom-popup";
import { reactive } from "vue";
import router from "../../router";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const state = reactive({
  gameList: [],
});
const props = defineProps({
  title: {
    type: String,
  },
  tag: {
    type: [Number, String],
  },
  gameList: {
    type: Array,
  },
  route: {
    type: String,
  },
  getGame: {
    type: Function,
  },
});
const startGame = async ({ id, platId }) => {
  if (getToken()) {
    // router.push({ name: "gameRoom", query: { id, platId } });
    $post("startGame", { id, platId, playMode: 1 }).then((res) => {
      if (res.code === 0) {
        router.push({
          name: "gameRoom",
          query: { data: res.data, id, platId },
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
/**/
const gameCollection = (item) => {
  // console.log(item);
  const params = {
    direction: item.isFavorite === 0 ? 1 : 0,
    gameId: item.gameId,
    gameSlotId: item.id,
  };
  $post("gameFavorite", params).then((res) => {
    if (res.code === 0) {
      item.isFavorite = item.isFavorite === 1 ? 0 : 1;
      customPopup(t('game.EditSuccessfully'),"",{isSuccess: true});
      props.getGame();
    }
  });
};
const seeMall = () => {
  const { route } = props;
  router.push({ name: route });
};
</script>

<style lang="scss" scoped>
.mode-game {
  margin-top: 30px;
  .mode-header {
    color: $main-color;
  }
  .game-list {
    margin: 20px 0 30px;
    flex-wrap: wrap;
    background: #1a212a;
    border-radius: 20px;
    padding: 24px;

    .game-item {
      width: 168px;
      margin: 0 30px 30px 0;
      //height: 126px;
      //border-radius: 10px;

      cursor: pointer;
      //overflow: hidden;
      //padding: 20px;
      box-sizing: border-box;
      position: relative;

      .item-list-bg {
        background: url(@/assets/default/taya.gif) no-repeat center center;
        background-size: cover;
        height: 126px;
        transition: all 0.3s;
        border-radius: 6px;
        transform: scale(1);
      }
      &:hover {
        .item-list-bg {
          transform: scale(1.1);
        }
      }
      &:nth-child(6n) {
        margin-right: 0;
      }
      .game-name {
        color: $main-text-color;
        font-size: 14px;
      }
      .game-title {
        color: #fff;
        margin-top: 10px;
        font-size: 14px;
      }
      .show-icon {
        font-size: 16px;
        justify-content: flex-end;
        margin-bottom: 18px;
      }
      .item-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        //background: rgba(255, 255, 255, 0.1);
        left: 0;
        top: 0;
      }
      .top-view {
        //position: relative;
        z-index: 2;
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
  .empty-tip {
    line-height: 40px;
    color: $main-text-color;
    text-align: center;
    width: 100%;
  }
}
</style>
