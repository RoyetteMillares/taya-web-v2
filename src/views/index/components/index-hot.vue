<template>
<div class="hot-recommend">
  <d2-container>
    <div class="hot-title flex-box-between">
      <div class="flex-box">
        <p class="text-title is-bold">{{ t('extra.hot') }}</p>
        <span class="small-text">{{ t('extra.haveFun') }}</span>
      </div>
      <div class="flex-box cursor get-more" @click="router.push({name:'slots'})">
        <span class="mr-5 fs-12">{{ t('extra.more') }}</span>
        <svg-icon name="v2_more"></svg-icon>
      </div>
    </div>
    <section class="recommend-module flex-box-between">
      <SlotGame :platList="platList" />
<!--      <TopPlayer />-->
      <RankGame />
    </section>
  </d2-container>
</div>
</template>

<script setup>
import SlotGame from "./modules/slot-game.vue"
import TopPlayer from "./modules/top-player.vue"
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import RankGame from "./modules/rank-game.vue"
const {t}=useI18n()
const router=useRouter()
const props=defineProps({
  platList:{
    type:Array,
    default:[]
  }
})
</script>

<style lang="scss" scoped>
.hot-recommend{
  margin-top: 39px;
  .hot-title{
    padding-bottom: 9px;
    border-bottom: 1px solid rgba(95, 181, 210,.2);
    .text-title{
      font-weight: 500;
      font-size: 26px;
      color: #fff;
    }
    .small-text{
      color: #8BDDEF;
      margin-left: 19px;
    }
    .get-more{
      color: #8BDDEF;
    }
  }
  .recommend-module{
    padding-top: 25px;
  }
}
</style>
