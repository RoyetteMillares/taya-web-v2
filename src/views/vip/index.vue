<template>
  <div class="vip-menu">

    <div class="header-module">
      <d2-container>

        <h1>{{ t("club.title") }}</h1>
        <p class="vip-text mb-50">{{ t("club.text01") }}</p>
<!--        <el-button @click="pageTo" class="show-jump is-bold" type="primary">-->
<!--          {{ getToken() ? t("vip.UpgradeMembership") : t("vip.SignIn") }}-->
<!--        </el-button>-->
      </d2-container>

    </div>
    <d2-container>

      <section class="player-vip-info" v-if="getToken()">
        <p class="player-member is-bold">{{ t("club.text02") }}</p>
        <p class="fs-16">{{ t("club.text03") }}</p>
        <main-container class="mt-20 flex-box-between">
          <section class="flex-box">
            <div class="user-info flex-box">

              <section>
                <div class="is-bold vip-name flex-box">
                  <span>{{ info.username }}</span>
                  <div class="user-avatar flex-box is-center">
                    <img v-realImg="USER_VIP_ICON?.icon" alt="" />
                  </div>
                </div>
                <!--              <p class="fs-14 vip-tip mt-5">your membership benefits</p>-->
<!--                <p class="fs-16 is-bold is-white">-->
<!--                  {{ formatCoin(vipInfo.accumulatedDeposit) }}-->
<!--                  {{ MainWallet.mainCurrency }}-->
<!--                </p>-->
                <el-button
                  @click="pageTo"
                  style="margin-top: 0"
                  class="show-jump is-bold"
                  type="primary"
                >
                  {{ getToken() ? t("vip.UpgradeMembership") : t("vip.SignIn") }}
                </el-button>
<!--                <p class="vip-tip">-->
<!--                  <span>{{ t("extra.currentLevel") }}</span>-->
<!--                  <span class="is-white ml-5">Lv {{info.levelId}}</span>-->
<!--                </p>-->
              </section>
            </div>
            <section class="accumulated-deposit flex-box">
              <div  class="deposit-icon flex-box">
                <svg-icon name="deposit"></svg-icon>
              </div>
              <section class="ml-10">
                <p class="fs-14">{{ t('club.TotalDeposits') }}</p>
                <p class="is-bold is-white fs-18">{{ formatCoin(vipInfo.accumulatedDeposit) }}</p>
              </section>
            </section>
            <section>
              <div class="is-bold distance-next">
                {{ t("additional.next", { name: vipInfo.nextCode }) }}
              </div>
              <div class="vip-progress flex-box">
                <!--            <div class="flex-box flex-progress start-left"></div>-->
                <div class="show-vip flex-box">
                  <div class="show-ball">
                    <div class="span-text is-left">{{ vipInfo.code }}</div>
                    <div class="ball"></div>
                  </div>
                  <div class="progress-box">
                    <div
                      :style="{
                      width: `${
                        ((+vipInfo.score - vipInfo.scoreUpgradeMin * 1) /
                          (+vipInfo.scoreUpgradeMax -
                            vipInfo.scoreUpgradeMin * 1)) *
                        100
                      }%`,
                    }"
                      class="progress-current"
                    ></div>
                  </div>
                  <div class="show-ball">
                    <div class="span-text is-right">
                      {{
                        info.levelId < vipList.length
                          ? `${vipInfo.nextCode}`
                          : t("vip.FullLevel")
                      }}
                    </div>
                    <div class="ball"></div>
                  </div>
                  <!--            <div class="show-ball"></div>-->
                </div>
                <!--            <div class="flex-box flex-progress"></div>-->
              </div>
              <div class="show-vip-level">
                <!--              <span class="is-bold"-->
                <!--                >Distance To The Next Level: Vip{{ info.levelId }}</span-->
                <!--              >-->
                <!--              <span class="show-default">{{ t("club.text05") }}</span>-->
                <!--              <span-->
                <!--                >{{ formatCoin(vipInfo.distanceUsd) }}-->
                <!--                {{ MainWallet.mainCurrency }}</span-->
                <!--              >-->
                <span>
                {{
                    t("additional.vipRequired", {
                      current: +vipInfo.score,
                      num: +vipInfo.scoreUpgradeMax - vipInfo.score * 1,
                    })
                  }}
                  <!--                Current EXP is-->
                  <!--                {{ +vipInfo.score - vipInfo.scoreUpgradeMin * 1 }}, EXP required-->
                  <!--                to level up is-->
                  <!--                {{ +vipInfo.scoreUpgradeMax - vipInfo.scoreUpgradeMin * 1 }}.-->
              </span>
                <p>{{ t("additional.vipTips") }}</p>
              </div>
            </section>
          </section>

        </main-container>
      </section>
      <VipMore :info="info" :vipList="vipList" />
    </d2-container>

  </div>
</template>

<script setup>
import VipMore from "./components/vip-more.vue";
import { computed, onMounted } from "vue";
import { useWallet } from "../../store/wallet";
import { formatCoin } from "../../utils/amount-format";
import { useUserStore } from "../../store/user";
import { getToken } from "../../utils/permission";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const user = useUserStore();
const USER_VIP_ICON = computed(() => user.USER_VIP_ICON);
const info = computed(() => user.info);
const vipList = computed(() => user.vipList);
const vipInfo = computed(() => user.vipInfo);
const pageTo = () => {
  if (getToken()) router.push({ name: "recharge" });
  else router.push({ name: "login" });
};

const wallet = useWallet();
const walletList = computed(() => wallet.walletList);

let MainWallet = computed(() => wallet.MAIN_WALLET);
// const state = reactive({
//   mainWallet: {},
// });

// watch(walletList, (newValue, oldValue) => {
//   if (newValue) {
//     if (newValue.length && newValue.length > 1) {
//       newValue.map((item) => {
//         if (item.mainCurrency === item.currency) {
//           state.mainWallet = item;
//         }
//       });
//     } else if (newValue.length && newValue.length > 0) {
//       MainWallet = newValue;
//     }
//   }
// });

onMounted(async () => {
  if (getToken()) {
    await user.GET_VIP_INFO();
    // await wallet.GET_USER_BALANCE();
  }
});
</script>

<style lang="scss" scoped>
.vip-menu {
  //margin-top: 30px;

  .tips {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
    color: $main-color;
    gap: 10px;
  }
  .show-jump {
    border-radius: 8px;
    width: 220px;
    height: 46px;
    margin-top: 60px;
    font-size: 16px;
  }
  .header-module {
    background: url(@/assets/images/vip/vip-bg.png) no-repeat center center;
    background-size: 100% 100%;
    padding: 100px 50px 0;
    color: #fff;
    min-height: 350px;
    h1 {
      font-size: 28px;
      margin-bottom: 20px;
    }
    .vip-text {
      color: $main-text-color;
      line-height: 22px;
      max-width: 410px;
      font-size: 12px;
    }
  }
  .player-vip-info {
    margin-top: 40px;
    color: $main-text-color;
    .player-member {
      font-size: 22px;
      color: $main-color;
      margin-bottom: 8px;
    }
    .user-info {
      color: #fff;
      //margin-right: 84px;
      .vip-name {
        font-size: 20px;
        margin-bottom: 16px;
        .user-avatar {
          margin-left: 12px;
          height: 12px;
          img {
            height: 100%;
          }
        }
      }

    }
    .player-balance {
      background: #232a33;
      border-radius: 6px;
      padding: 15px 12px;
      min-width: 261px;
      box-sizing: border-box;
    }
    .distance-next {
      margin-bottom: 30px;
      color: #fff;
    }
    .vip-progress {
      margin-bottom: 20px;
      .flex-progress {
        width: 93px;

        height: 4px;
        background: #232a33;
        &:first-child {
          border-radius: 2px 0 0 2px;
        }
        &:last-child {
          border-radius: 0 2px 2px 0;
        }
      }
      .show-vip {
        //width: 230px;
        //height: 4px;
        //background: #232a33;
        border-radius: 2px;
        position: relative;
        padding-left: 10px;
        .show-ball {
          position: relative;
          .ball {
            width: 10px;
            height: 10px;
            background: #8e99b6;
            border-radius: 50%;
          }
          .span-text {
            position: absolute;
            font-size: 12px;
            top: -20px;
            min-width: 100px;
            text-align: center;
          }
          .is-left {
            left: 50%;
            transform: translateX(-50%);
            color: $main-color;
            & + .ball {
              background: $main-color;
            }
          }
          .is-right {
            right: 50%;
            transform: translateX(50%);
          }
        }
        .progress-box {
          width: 264px;
          height: 4px;
          background: #232a33;
          position: relative;
          overflow: hidden;
          .progress-current {
            position: absolute;
            height: 100%;
            width: 0%;
            background: $main-color;
            left: 0;
            top: 0;
          }
        }
      }
      .start-left {
        background: $main-color;
      }
    }
    .show-vip-level {
      color: #fff;
      font-size: 12px;
      .show-default {
        color: $main-text-color;
        margin: 0 10px 0 0;
      }
    }
  }
}
.vip-tip {
  color: $main-text-color;
  font-size: 12px;
  margin-top: 6px;
}
.accumulated-deposit{
  background: #213539;
  border-radius: 12px;
  padding: 22px;
  margin: 0 50px;
  .deposit-icon{
    font-size: 48px;
  }
}
.mb-50{
  margin-bottom: 50px;
}
</style>
