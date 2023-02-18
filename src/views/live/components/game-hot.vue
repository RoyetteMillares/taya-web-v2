<template>
  <section class="game-main">
    <p class="p-title is-bold left-title">{{t('live.HotPicks')}}</p>
    <ul class="flex-box game-list" v-show="hotList.length">
      <GameItem :item="item" v-for="item in hotList" />
    </ul>
    <div v-show="!hotList.length" class="game-list is-center flex-box">
      <no-data
        type="collection"
        class="empty-tip"
        :text="t('noData.modeGame')"
      ></no-data>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import GameItem from "../../index/components/modules/game-item.vue"
const { t } = useI18n()
const props = defineProps({
  hotList: {
    type: Array,
  },
  gameCollection: {
    type: Function,
  },
  startGame: {
    type: Function,
  },
});
</script>

<style lang="scss" scoped>
.game-main {
  .game-list {
    margin: 20px 0 0;
    flex-wrap: wrap;
  }
  .show-none {
    text-align: center;
    color: #fff;
    font-size: 18px;
    margin: 20px 0 40px;
  }
}
</style>
