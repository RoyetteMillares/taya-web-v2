<template>
  <div class="all-casino">
    <ModeGame
      :getGame="getGame"
      route="live"
      :gameList="state.gameList[2]"
      :title="t('casino.BestSlotsGames')"
      tag="2"
    />
    <ModeGame
      :getGame="getGame"
      route="slots"
      :gameList="state.gameList[3]"
      :title="t('casino.BestLiveCasinoGames')"
      tag="3"
    />
    <ModeGame
      :getGame="getGame"
      route="turbo"
      :gameList="state.gameList[8]"
      :title="t('casino.TurboGames')"
      tag="8"
    />
  </div>
</template>

<script setup>
import ModeGame from "./mode-game.vue";
import { $post } from "@/request";
import { reactive, onMounted, inject, computed } from "vue";
import { useI18n } from "vue-i18n";

/* global search */

const global = inject("global", {});
const globalSearch = computed(() => global);
const getData = (val) => {
  state.name = val;
  getGame();
};
globalSearch.value.getSearchFunction &&
  globalSearch.value.getSearchFunction(getData);
const { t } = useI18n();
const state = reactive({
  gameList: {},
  name: "",
});
const getGame = () => {
  const groups = [2, 3, 8];
  $post("casinoList", { groups, size: 12, name: state.name }).then((res) => {
    if (res.code === 0) {
      state.gameList = res.data;
    }
  });
};
onMounted(() => {
  getGame();
});
</script>

<style lang="scss" scoped>
.all-casino {
}
</style>
