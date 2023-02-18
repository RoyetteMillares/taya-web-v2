<template>
  <d2-container>
    <section class="game-room">
      <!--     ref="frame"-->
      <section v-if="gameInfo" class="flex-box-between">
        <section>
          <section class="flex-box game-header">
            <span class="fs-14 is-white mr-20">{{ gameInfo.name }}</span>
            <span class="fs-16 cursor flex-box" @click="toCollection">
            <svg-icon
              :name="gameInfo.isFavorite ? 'collection-active' : 'collection'"
            ></svg-icon>
          </span>
          </section>
          <p class="game-plat fs-12">{{ gameInfo.platName }}</p>
        </section>
<!--        <div @click="toggle" class="flex-box is-screen">-->
<!--          <svg-icon name="fullscreen"></svg-icon>-->
<!--        </div>-->
      </section>

      <div class="frame-screen" ref="full" v-if="loading">
        <div v-show="!isLoaded" class="app-loader-container flex-box is-center">
          <img class="loading" src="@/assets/default/taya.gif" alt=""/>
          <p class="loading-text">{{t('public.Loading')}} ...</p>
        </div>
        <iframe
          ref="frame"
          v-show="isLoaded"
          :src="gameUrl"
          frameborder="0"
        ></iframe>
      </div>

      <!--    <div class="flex-box mt-20" v-show="gameUrl">-->
      <!--      <div @click="toggle" class="flex-box is-screen">-->
      <!--        <svg-icon name="fullscreen"></svg-icon>-->
      <!--      </div>-->
      <!--      <span class="fs-12 full-mode flex-box">FUN MODE</span>-->
      <!--      <el-switch-->
      <!--        :before-change="gameChange"-->
      <!--        class="ml-10"-->
      <!--        active-value="2"-->
      <!--        inactive-color="1"-->
      <!--        style="&#45;&#45;el-switch-off-color: #8696a2"-->
      <!--        v-model="state.playMode"-->
      <!--      />-->
      <!--      <span class="fs-12 is-white ml-10">-->
      <!--        {{ state.playMode ? "PLAY" : "REAL" }} MODE</span-->
      <!--      >-->
      <!--    </div>-->
    </section>
  </d2-container>


</template>

<script setup>
import { api as fullscreen } from "vue-fullscreen";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { onMounted, ref, nextTick, reactive } from "vue";
import { dialogConfirm } from "../../components/custom-dialog";
import { $post } from "../../request";
import { useUserStore } from "../../store/user";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const user = useUserStore();
const full = ref(null);
const gameUrl = ref("");
const route = useRoute();
const isLoaded = ref(false);
const frame = ref(null);
const gameInfo = ref(null);
const playMode = ref(1);
const loading = ref(true);
const state = reactive({
  playMode: 1,
});
onMounted(() => {
  const { data } = route.query;
  // startGame();
  getGameDetails();
  if (data) gameUrl.value = data;
  nextTick(() => {
    frame.value.onload = function () {
      isLoaded.value = true;
    };
  });
});
onBeforeRouteLeave(async () => {
  const flag = await dialogConfirm(
    t('game.sureQuitGame'),
    t('public.Reminder'),
    {
      showCancelButton: true,
    }
  );
  if (flag) user.GET_USER_PROFILE();
  return flag;
});
const toggle = async () => {
  await fullscreen.toggle(full.value, {
    teleport: "body",
    callback: (isFullscreen) => {},
  });
};
const getGameDetails = () => {
  const { platId, id ,gameId} = route.query;
  $post("details", { gameId, id, playMode: 1 }).then((res) => {
    if (res.code === 0) {
      gameInfo.value = res.data;
    }
  });
};
const toCollection = () => {
  const { gameId, id } = route.query;
  const { isFavorite } = gameInfo.value;
  const params = {
    direction: isFavorite === 0 ? 1 : 0,
    gameId,
    gameSlotId: id,
  };
  $post("gameFavorite", params).then((res) => {
    if (res.code === 0) {
      gameInfo.value.isFavorite = isFavorite === 1 ? 0 : 1;
    }
  });
};
/**
 * 开启游戏
 */
const startGame = () => {
  const { gameId, id, platId } = route.query;
  return new Promise((resolve, reject) => {
    $post("startGame", { id, gameId:id, playMode: state.playMode ? 2 : 1 }).then(
      (res) => {
        if (res.code === 0) {
          gameUrl.value = res.data;
        }
        resolve(res);
      }
    );
  });
};
/**
 * 切换游戏模式
 */
const gameChange = async () => {
  const flag = await dialogConfirm(
    t('game.sureChangeModel'),
    t('public.Reminder'),
    {
      showCancelButton: true,
    }
  );
  if (flag) {
    const { code, data } = await startGame();
    if (code === 0 && data) {
      // loading.value = false;
      nextTick(() => {
        loading.value = true;
      });
    }
    return code === 0 && data;
  } else return flag;
};
</script>

<style lang="scss" scoped>
.game-room {
  margin-top: 20px;
  background: $main-input-login-bg;
  border-radius: 10px;
  padding: 20px;
  //height: 850px;
  overflow: hidden;
  .frame-screen {
    height: 700px;
    background: rgba(0, 0, 0, 0);
    border-radius: 12px;
    overflow: hidden;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .is-screen {
    font-size: 20px;

    cursor: pointer;
  }
  .game-plat {
    margin: 8px 0 16px;
    color: #8e99b6;
  }
  .full-mode {
    margin-left: 30px;
    color: #fff;
  }
}
.app-loader-container {
  flex-direction: column;
  height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
  color: $main-color;
  //margin: 100px 0;

  .loading {
    width: 320px;
  }
  .loading-text {
    margin-top: 20px;
    font-size: 14px;
  }
}
</style>
