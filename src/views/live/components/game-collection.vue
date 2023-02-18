<template>
  <section class="my-collection" v-show="collectionList.length">
    <main-container class="game-collection flex-box">
      <p class="collection-text is-bold left-title">{{t('live.MyFavourites')}}</p>
      <section class="game-content">
        <no-data
          v-show="!showList.length"
          type="collection"
          class="empty-tip"
          :text="t('noData.gameCollection')"
        ></no-data>

        <div class="main-content flex-box">

          <el-carousel
            v-if="showList[0]"
            @change="change"
            indicator-position="none"
            height="140px"
            class="show-full"
            :interval="5000"
            :autoplay="false"
            arrow="never"
            ref="carousel"
          >
            <el-carousel-item v-for="(item, i) in showList" :key="i">
              <ul class="collection-ul flex-box">
                <li
                  class="show-item flex-box"
                  @click="startGame(val)"
                  v-for="val in item"
                >
                  <div @click.stop="gameCollection(val)" class="flex-box game-icon">
                    <svg-icon
                      :name="val.isFavorite ? 'collection-active' : 'collection'"
                    ></svg-icon>
                  </div>
                  <div
                    class="show-img"
                    v-ground="val.img"
                    :style="{ backgroundImage: `url(${val.img})` }"
                  ></div>
                  <p class="game-name">{{ val.name }}</p>
                  <p class="tips-show">{{ val.platName }}</p>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>

        </div>
        <div class="flex-box is-center" v-show="showList.length>1">
          <span :class="{'show-icon-disabled':index===0}" @click="changePage('prev')" class="show-icon is-center flex-box">
            <svg-icon  name="left"></svg-icon>
          </span>
          <span :class="{'show-icon-disabled':index >= showList.length - 1||showList.length <=1}" @click="changePage('next')" class="show-icon is-center ml-30 flex-box">
            <svg-icon
              name="right"
            ></svg-icon>
          </span>
        </div>
      </section>
    </main-container>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import {getToken} from "../../../utils/permission";
import {customPopup} from "../../../components/custom-popup";
import {dialogConfirm} from "../../../components/custom-dialog";
import {useGame} from "../../../store/game";
const game=useGame()
const { t } = useI18n()
const carousel = ref(null);
const index = ref(0);
const props = defineProps({
  collectionList: {
    type: Array,
  },
  startGame: {
    type: Function,
  },
});
const change = (val) => {
  index.value = val;
};
const showList = computed(() => {
  // props.collectionList.forEach();
  const { collectionList } = props;
  let num = 10;
  let arr = [];
  if (collectionList && collectionList.length) {
    const count = Math.ceil(collectionList.length / num);
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(collectionList.slice(num * i, num * i + num));
    }
    arr = list;
  }

  return arr;
});
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
      customPopup(t("game.EditSuccessfully"),"",{isSuccess: true});
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
const changePage = (type) => {
  if (type === "prev") carousel.value && carousel.value.prev();
  else carousel.value && carousel.value.next();
};
</script>

<style lang="scss" scoped>
.my-collection {
  margin:0 0 30px 0;
  .game-collection {
    min-height: 222px;
    flex-direction: column;
    padding: 16px 0;
    .collection-text {
      //color: $main-color;
      margin-right: auto;
      //width: 100%;
      text-align: left;
      margin-bottom: 20px;
      margin-left: 28px;
    }
    .game-content {
      flex: 1;
      width: 100%;
      position: relative;
      .main-content {
        height: 100%;

        .show-full {
          flex: 1;
          //margin: 0 12px;
          .collection-ul {
            text-align: center;
            padding: 0 20px;
            .show-item {
              margin-right: 24px;
              flex-direction: column;
              position: relative;
              .game-icon {
                position: absolute;
                top: 0;
                right: 0;
                padding: 7px;
                //background: #000;
                border-radius: 5px;
                font-size: 16px;
                z-index: 1;
              }
              &:last-child {
                margin-right: 0;
              }
              .show-img {
                width: 109px;
                height: 80px;
                background: rgba(0, 0, 0, 0);
                border-radius: 12px;
                background: url(@/assets/default/taya.gif) no-repeat center
                  center;
                background-size: contain;
                transform: scale(1);
                transition: all 0.3s;
                &:hover {
                  transform: scale(1.1);
                }
              }
              .game-name {
                max-width: 100px;
                font-size: 12px;
                color: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 13px 0 5px;
              }
              .tips-show {
                font-size: 12px;
                color: #8e99b6;
              }
            }
          }
        }
      }
      .show-icon {
        cursor: pointer;
        font-size: 12px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #1e4750;
        &-disabled{
          opacity: .3;
          cursor: not-allowed;
          pointer-events: none;
        }
        //width: 18px;
        //margin-top: -39px;
      }
    }
    .empty-text {
      font-size: 20px;
      text-align: center;
      color: $main-text-color;
      padding-top: 49px;
      flex-shrink: 0;
    }
  }
}
.ml-30{
  margin-left: 30px;
}
</style>
