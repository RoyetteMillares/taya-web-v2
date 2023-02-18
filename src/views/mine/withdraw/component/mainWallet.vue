<template>
  <section class="my-wallet">
    <p class="wallet-title">{{ t("routerTitle.Withdraw") }}</p>
    <ul class="wallet-list flex-box">
      <div class="show-wallet flex-box-between">
        <div class="wallet-info mr-90">
          <p>{{ t("wallet.withdraw.assets") }}</p>
          <span class="is-bold wallet-value"
            >{{ formatCoin(+walletList.reelCoin) }}
            {{ walletList.mainCurrency }}</span
          >
        </div>
        <div class="wallet-info">
          <p>{{ t("wallet.myWallet.allowWithdrawal") }}</p>
          <span class="is-bold wallet-value"
            >{{ formatCoin(+walletList.allWithdrawalCoin) }}
            {{ walletList.mainCurrency }}</span
          >
        </div>
        <section class="to-button cursor fs-12 flex-box">
          <div
            @click="pageTo('withdraw')"
            class="edit-button flex-box to-deposit is-center mr-20"
          >
            {{ t("affiliate.banner.Withdrawal") }}
          </div>
        </section>
        <div class="show-icon flex-box">
          <svg-icon name="dollar"></svg-icon>
        </div>
      </div>
    </ul>
  </section>
</template>

<script setup>
import { useWallet } from "../../../../store/wallet";
import { computed, onMounted, watch, reactive } from "vue";
import { formatCoin } from "../../../../utils/amount-format";
import { useRouter } from "vue-router";
import { dialogConfirm } from "../../../../components/custom-dialog";
import { $post } from "../../../../request";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter();
const wallet = useWallet();
const walletList = computed(() => wallet.walletList);

const mainCurrencyUnit = computed(() => {
  const unit = {
    USD: "Usdt",
    BRL: "BRL",
  };
  return unit[state.mainWallet.mainCurrency];
});
let MainWallet = computed(() => {});
const pageTo = (name) => {
  if (name === "USD") {
    router.push({ name: "withdrawUsdt", query: { mainCurrency: "USD" } });
  } else {
    router.push({ name: "withdrawReal", query: { mainCurrency: "BRL" } });
  }
};
const state = reactive({
  mainWallet: {},
});
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
onMounted(() => {
  wallet.GET_USER_BALANCE();
});
</script>

<style lang="scss" scoped>
.my-wallet {
  margin-bottom: 45px;

  .wallet-title {
    font-size: 22px;
    color: $main-color;
  }
  .wallet-list {
    flex-wrap: wrap;
    background: #1a212a;
    border-radius: 20px;
    padding: 20px;
    margin-top: 20px;
    .show-wallet {
      background: #232a33;
      border-radius: 12px;
      padding: 20px;
      .wallet-info {
        font-size: 14px;
        color: #8e99b6;
        p {
          margin-bottom: 20px;
        }
        .wallet-value {
          font-size: 20px;
          color: #fff;
        }
      }
      .show-icon {
        font-size: 66px;
        //margin-left: 53px;
      }
      .mr-90 {
        margin-right: 90px;
      }
    }
    .to-button {
      margin-left: 70px;
      .edit-button {
        width: 130px;
        height: 34px;
        border: 1px solid $main-color;
        border-radius: 18px;
        color: $main-color;
        box-sizing: border-box;
      }
      .to-deposit {
        background: $main-color;
        color: #fff;
      }
    }
  }

  /*.wallet-list {
    flex-wrap: wrap;
    .wallet-item {
      background: #1a212a;
      border-radius: 12px;
      margin: 20px 23px 0 0;
      padding: 34px 30px;
      box-sizing: border-box;
      position: relative;
      color: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .wallet-title {
        font-size: 14px;
        color: #fff;
        margin-bottom: 16px;
      }
      .wallet-info {
        font-size: 16px;
        font-family: AvertaStd-Bold, AvertaStd-Bold-☞;
        font-weight: normal;
        text-align: left;
      }
      .button-item {
        height: 46px;
        background: #11b85a;
        border-radius: 30px;
        font-size: 16px;
        margin-left: 90px;
      }
    }
  }*/
}
</style>
