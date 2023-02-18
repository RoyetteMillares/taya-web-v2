<template>
  <div class="live-model">
    <GameBg :groups="groups" >
      <section class="game-text">
        <div  v-if="groups==3">
          <p class="bg-title is-bold">{{ t('menu.Live') }}</p>
          <p>{{t('extra.promoText')}}</p>
        </div>
        <div  v-if="groups==2">
          <p class="bg-title is-bold">{{ t('menu.Slots') }}</p>
          <p>{{t('extra.slotText')}}</p>
        </div>
        <div  v-if="groups==4">
          <p class="bg-title is-bold">{{ t('extra.fishingTitle') }}</p>
          <p>{{t('extra.fishingText')}}</p>
        </div>
      </section>
    </GameBg>
    <d2-container>
      <GameCollection

        :startGame="startGame"
        v-if="getToken()"
        :collectionList="collectionList"
      />

      <main-container>
        <GameClassification @searchKeyword="search"
          :platList="state.platList"
          v-model="state.platId"
          @change="changeGame"
        />
        <GameHot
          :startGame="startGame"
          :gameCollection="gameCollection"
          :hotList="state.hotList"
        />
        <GameContent
          :startGame="startGame"
          :handleCurrentChange="handleCurrentChange"
          :gameCollection="gameCollection"
          :gameList="state.gameList"
          v-model:page="state.page"
          v-model:total="state.total"
          :size="state.size"
        />
      </main-container>

    </d2-container>

  </div>
</template>

<script setup>
import GameCollection from "./components/game-collection.vue";
import GameContent from "./components/game-content.vue";
import GameClassification from "./components/game-classification.vue";
import GameHot from "./components/game-hot.vue";
import { computed, inject, onMounted, reactive } from "vue";
import GameBg from "./components/game-bg.vue"
import { $post } from "../../request";
import { getToken } from "../../utils/permission";
import {useRoute, useRouter} from "vue-router";
import { dialogConfirm } from "../../components/custom-dialog";
import { customPopup } from "../../components/custom-popup";
const route=useRoute()
// import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import {useGame} from "../../store/game";
const { t } = useI18n();
const props = defineProps({
  groups: {
    type: [Number, String],
    default: 2,
  },
});
const game=useGame()
const collectionList=computed(()=>game.collectionList)
const router = useRouter();
const state = reactive({
  gameName: "",
  name: "",
  page: 1,
  size: 18,
  total: 0,
  hotList: [],
  gameList: [],
  platList: [],
  platId: "",
});
const changeGame = () => {
  state.page = 1;
  getHotGame();
  getAllGame();
};
const getGameList = () => {
  const {id}=route.params
  return new Promise((resolve, reject) => {
    $post("gameList", { groups: [props.groups] })
      .then((res) => {
        if (res.code === 0) {
          state.platList = res.data;
        if(!id)  state.platId = res.data[0].id;
        else state.platId=id*1
        }
        resolve();
      })
      .catch(() => reject());
  });
};
/* global search */

const global = inject("global", {});
const globalSearch = computed(() => global);

const getData = (val) => {
  state.page = 1;
  state.name = val;
  getAllGame();
  getAllCollection();
  getHotGame();
};
globalSearch.value.getSearchFunction &&
  globalSearch.value.getSearchFunction(getData);
const search=(val)=>{
  console.log(val,'search');
  state.page = 1;
  state.name = val;
  getAllGame();
  getAllCollection();
  getHotGame();
}
/* global search */
// get hot game
const getHotGame = () => {
  const params = {
    gameGroupId: [props.groups],
    gameId:state.platId
  };
  $post("hotGameList", params).then((res) => {
    if (res.code === 0) {
      state.hotList = res.data;
    }
  });
};
// get all of the game
const getAllGame = () => {
  const params = {
    current: state.page,
    size: state.size,
    data: {
      category: 1,
      ids: [state.platId],
      name: state.name,
    },
  };
  $post("slotGameList", params).then((res) => {
    if (res.code === 0) {
      state.gameList = res.data.list;
      state.total = +res.data.total;
    }
  });
};
// get the game of collection
const getAllCollection = () => {
  game.GET_COLLECTION_LIST()
};
/* get plat list */
const getPlatList = () => {
  $post("platList");
};
/**/
const gameCollection = (item) => {
  const params = {
    direction: item.isFavorite === 0 ? 1 : 0,
    gameId: item.gameId,
    gameSlotId: item.id,
  };
  $post("gameFavorite", params).then((res) => {
    if (res.code === 0) {
      item.isFavorite = item.isFavorite === 1 ? 0 : 1;
      customPopup(t("game.EditSuccessfully"),"",{isSuccess: true});
      getAllCollection();
      getHotGame();
      getAllGame();
    }
  });
};
const handleCurrentChange = (val) => {
  state.page = val;
  getAllGame();
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
onMounted(async () => {
  // getPlatList();
  await getGameList();
  getHotGame();
  getAllGame();
  if (getToken()) getAllCollection();
});
</script>

<style lang="scss" scoped>
.live-model{
  padding-bottom: 50px;
}
.game-text{
  padding-left: 130px;
  max-width: 70%;
  color: var(--theme-main-color);
  font-size: 30px;
  .bg-title{
    font-size: 60px;
    margin-bottom: 10px;
    color: #fff;
  }
}
</style>
