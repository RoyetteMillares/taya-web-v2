<template>
  <main-container class="commission-betting" v-if="subordinateDetailsObj">
    <div class="tittle flex-box">
      <p class="team-title ">{{t('affiliate.commissionBetting.MyTeam')}}</p>
      <div class="item ">
        <p>{{ t("affiliate.commissionBetting.TotalCommission") }}</p>
        <span class="is-bold" v-if="subordinateDetailsObj?.bettingTurnOver">
          <!-- 佣金金额 -->
          {{ subordinateDetailsObj?.commission }}
          {{ state.mainWallet.mainCurrency }}
        </span>
      </div>
      <div class="item ">
        <p>{{ t("affiliate.commissionBetting.BettingTurnover") }}</p>
        <span class="is-bold" v-if="subordinateDetailsObj?.bettingTurnOver">
          <!-- 投注流水 -->
          {{subordinateDetailsObj?.bettingTurnOver }}
          {{ state.mainWallet.mainCurrency }}
        </span>
      </div>
    </div>
    <div class="agent-level-box flex-box-between">
      <section class="agent-level-box-item" v-for="(item, index) in subordinateDetailsObj" :key="index">
        <div  class="item flex-box" v-if="index != 'bettingTurnOver'&&index != 'commission'">
          <div class="level w-30">
            <div class="box">
              <span>{{index}} {{ t("affiliate.commissionBetting.Agent") }}</span>
              <p>
                <!-- 代理人数 -->
                {{ item?.nums }}
              </p>

            </div>
          </div>
          <div class="mgT10 w-30">
            <p class="mb-10">{{ t("affiliate.commissionBetting.TotalCommission") }}</p>
            <span v-if="item?.bettingTurnOver">
              <!-- 佣金金额 -->
              {{ item?.commission }}
              {{ state.mainWallet.mainCurrency }}
            </span>
          </div>
          <div class="mgT18 w-40">
            <p class="mb-10">{{ t("affiliate.commissionBetting.BettingTurnover") }}</p>
            <span v-if="item?.bettingTurnOver">
              <!-- 投注流水 -->
              {{ item?.bettingTurnOver }}
              {{ state.mainWallet.mainCurrency }}
            </span>
          </div>
        </div>
      </section>
    </div>
  </main-container>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useWallet } from "../../../store/wallet";
import {$post} from "@/request/index";
// import { formatCoin } from "./../../../utils/amount-format";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const subordinateDetailsObj = ref({});

const subordinateDetails = async() => {
  await $post("subordinateDetails").then((res) => {
    if (res?.code === 0) {
      subordinateDetailsObj.value = res?.data??{};
    }
  });
}

const wallet = useWallet();
const walletList = computed(() => wallet.walletList);

let MainWallet = computed(() => {});
const state = reactive({
  mainWallet: {},
});

watch(walletList, (newValue, oldValue) => {
  if (newValue) {
    if (newValue.length && newValue.length > 1) {
      newValue.map((item) => {
        if (item.mainCurrency === item.currency) {
          state.mainWallet = item;
        }
      });
    } else if (newValue.length && newValue.length > 0) {
      MainWallet = newValue;
    }
  }
});

onMounted(async() => {
  await wallet.GET_USER_BALANCE();
  await subordinateDetails()
})
</script>

<style lang="scss" scoped>
.commission-betting {
  overflow: hidden;
  //border-radius: 12px;
  //background: $main-container-inner-bg;
  margin-top: 20px;
  //padding: 20px;
  .tittle {
    display: flex;
    .team-title{
      font-size: 18px;
      color: #fff;
      font-weight: 700;
      margin-right: 114px;
    }
    .item {
      margin-right: 138px;
      p {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #B6C0C3;
        margin-bottom: 10px;
      }
      span {
        font-size: 18px;
        text-align: left;
        color: #ffffff;
      }
    }
  }
  .agent-level-box {
    flex-wrap: wrap;
    margin-top: 27px;
    .agent-level-box-item{
      width: 49%;
    }
    &::-webkit-scrollbar {
      width: 0px !important;
      height: 0px !important;
    }
    &::-webkit-scrollbar-track {
      background-color:$main-color;
    }
    &::-webkit-scrollbar-thumb {
      background-color:$main-color;
    }
    .item {
      //width: 49%;
      background: #14282f;
      border-radius: 12px;
      margin-bottom: 20px;
      padding: 20px;
      //margin: 30px 31px;
      //margin-right: 63px;
      text-align: left;
      p {
        font-size: 12px;
        font-weight: normal;
        color: #8e99b6;
      }
      span {
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        margin-top: 6px;
      }
      .level {
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .box {
          p {
            font-size: 18px;
            font-weight: normal;
            text-align: left;
            color: $main-color;
            margin-top: 10px;
          }
          span {
            display: block;
            font-size: 12px;
            font-weight: normal;
            text-align: center;
            color: #34B8D5;

            //margin-top: 8px;
          }
        }
      }
    }
  }
}
.w{
  &-30{
    width: 30%;
  }
  &-40{
    width: 40%;
  }
}
</style>
