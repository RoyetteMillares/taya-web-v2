<template>
  <section class="pool-view">
    <d2-container class="flex-box-between">
      <div class="pool-item flex-box">
        <img class="pool-img" :src="p1">
        <div class="total-reward">
          <p class="reward-name">{{t('extra.slots')}}</p>
          <NumberPot v-if="jackpot.jackpotAmount" :num="+jackpot.jackpotAmount"/>
        </div>
      </div>
      <div class="pool-item flex-box">
        <img class="pool-img" :src="p2" alt="">
        <div class="total-reward">
          <p class="reward-name">{{t('extra.todayReward')}}</p>
          <NumberPot v-if="jackpot.payoutAmount" :num="+jackpot.payoutAmount"/>
        </div>
      </div>

<!--      <div class="pool-item"></div>-->
    </d2-container>

  </section>
<!--  <NumberPot />-->
</template>

<script setup>
import p1 from "@/assets/images/home/p1.png"
import p2 from "@/assets/images/home/p2.png"
import NumberPot from "./NumberPot.vue";
import {useI18n} from "vue-i18n";
import {useHomeStore} from "../../../store/home";
import {computed,onMounted} from "vue";

const home=useHomeStore();
const jackpot=computed(()=>home.jackpotList)
const {t}=useI18n()
onMounted( ()=>{
  home.GET_JACKPOT()
})
</script>

<style lang="scss" scoped>
.pool-view{
  padding: 40px 0 0px;
  .pool-item{
    background: linear-gradient(90deg,#0c2930, #0a2329);
    border-radius: 8px;
    width: 665px;
    height: 156px;
    padding: 29px 36px;
    .pool-img{
      width: 111px;
      height: 97px;
      margin-right: 40px;
    }
    .total-reward{
      color: #b6c0c3;
      .reward-name{
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
