<template>
<div class="game-bg" :class="`bg-${groups}`">
  <d2-container class="container-bg">
    <slot></slot>
  </d2-container>

</div>
</template>

<script setup>
const props = defineProps({
  groups: {
    type: [Number, String],
    default: 2,
  },
});
</script>

<style lang="scss" scoped>
.game-bg{
  height: 300px;
  background: url(@/assets/images/game/bg-2.png) no-repeat center center;
  background-size: cover;
  //padding: 50px;
  //box-sizing: border-box;
  .container-bg{
    padding-top: 50px;
  }
}
.bg-1{
  background-image: url(@/assets/images/game/bg-1.png);
}
.bg-2{
  background-image: url(@/assets/images/game/bg-2.png);
}
.bg-3{
  background-image: url(@/assets/images/game/bg-3.png);
}
.bg-4{
  background-image: url(@/assets/images/game/bg-4.png);
}
.bg-8{
  background-image: url(@/assets/images/game/bg-8.png);
}
</style>
