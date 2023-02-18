<template>
  <div class="index-game ">
    <d2-container class="flex-box c-game">
      <GameItem :item="item" v-for="item in gameList" />
    </d2-container>

  </div>
</template>

<script setup>
import GameItem from "./modules/game-item.vue"
const props=defineProps({
  gameList:{
    type:Array,
    default:[]
  }
})
</script>

<style lang="scss" scoped>
.index-game{
  margin-top: 26px;
}
</style>
