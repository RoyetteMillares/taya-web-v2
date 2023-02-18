<template>
  <main-container class="my-wallet">
    <p class="wallet-title">{{ t("wallet.myWallet.pageTitle") }}</p>
    <ul class="wallet-list flex-box-between">
      <div class="flex-box">
        <div class="show-wallet flex-box-between mr-10">
          <div class="wallet-info mr-90">
            <p>{{ t("wallet.withdraw.assets") }}</p>
            <span class="is-bold wallet-value"
            >{{ formatCoin(+walletList.reelCoin) }}
            {{ walletList.mainCurrency }}</span
            >
          </div>
          <div class="wallet-info mr-90">
            <p>{{ t("wallet.myWallet.bonus") }}</p>
            <span class="is-bold wallet-value"
            >{{ formatCoin(+walletList.bonus) }}
            {{ walletList.mainCurrency }}</span
            >
          </div>

        </div>
        <div class="show-wallet">
          <div class="wallet-info">
            <p>{{ t("wallet.myWallet.allowWithdrawal") }}</p>
            <span class="is-bold wallet-value"
            >{{ formatCoin(+walletList.allWithdrawalCoin) }}
            {{ walletList.mainCurrency }}</span
            >
          </div>
        </div>
      </div>

      <section class="to-button cursor fs-12 flex-box">
        <div
          @click="pageTo('recharge')"
          class="edit-button flex-box to-deposit is-center mr-20"
        >
          {{ t("new.Deposit") }}
        </div>
        <div @click="toWithdraw" class="edit-button flex-box is-center">
          {{ t("affiliate.banner.Withdrawal") }}
        </div>
      </section>
      <!--      <li-->
      <!--        :class="`wallet-item ${item.mainCurrency}`"-->
      <!--        v-for="item in walletList"-->
      <!--        :key="item.currency"-->
      <!--      >-->
      <!--        <div class="wallet-title flex-box-between">-->
      <!--          <span class="fs-12"-->
      <!--            >{{ item.currency }} {{ t("wallet.myWallet.wallet") }}</span-->
      <!--          >-->
      <!--        </div>-->
      <!--        &lt;!&ndash;        <div class="is-default" v-show="item.mainCurrency === item.currency">&ndash;&gt;-->
      <!--        &lt;!&ndash;          {{ t("wallet.myWallet.use") }}&ndash;&gt;-->
      <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
      <!--        <div class="wallet-info flex-box-between">-->
      <!--          <div class="money-item">-->
      <!--            <span class="fs-12">{{-->
      <!--              t("wallet.myWallet.allowWithdrawal")-->
      <!--            }}</span>-->
      <!--            <p class="show-amount is-bold fs-20">-->
      <!--              {{ formatCoin(+item.allWithdrawalCoin) }}-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <section class="flex-box show-bonus">-->
      <!--          <div class="money-item flex-box">-->
      <!--            <span class="mr-5">{{ t("wallet.myWallet.bonus") }}:</span>-->
      <!--            <p class="show-amount">{{ formatCoin(+item.bonus) }}</p>-->
      <!--          </div>-->
      <!--          <div class="money-item flex-box">-->
      <!--            <span class="mr-5">{{ t("wallet.myWallet.assetsReal") }}:</span>-->
      <!--            <p class="show-amount">{{ formatCoin(+item.reelCoin) }}</p>-->
      <!--          </div>-->
      <!--        </section>-->
      <!--        <section class="wallet-edit">-->
      <!--          &lt;!&ndash;           v-if="item.mainCurrency === item.currency"&ndash;&gt;-->
      <!--          <div class="deposit-to flex-box">-->
      <!--            <el-button-->
      <!--              type="primary"-->
      <!--              class="button-item"-->
      <!--              @click="pageTo(item.depositLink)"-->
      <!--              >{{ t("wallet.myWallet.deposit") }}</el-button-->
      <!--            >-->
      <!--            <el-button-->
      <!--              type="primary"-->
      <!--              class="button-item is-border"-->
      <!--              @click="pageTo('withdraw')"-->
      <!--              >{{ t("wallet.myWallet.withdrawal") }}</el-button-->
      <!--            >-->
      <!--          </div>-->
      <!--          &lt;!&ndash;          <div&ndash;&gt;-->
      <!--          &lt;!&ndash;            class="deposit-to flex-box"&ndash;&gt;-->
      <!--          &lt;!&ndash;            v-show="item.mainCurrency !== item.currency"&ndash;&gt;-->
      <!--          &lt;!&ndash;          >&ndash;&gt;-->
      <!--          &lt;!&ndash;            <el-button&ndash;&gt;-->
      <!--          &lt;!&ndash;              type="primary"&ndash;&gt;-->
      <!--          &lt;!&ndash;              class="button-item"&ndash;&gt;-->
      <!--          &lt;!&ndash;              @click="changeMain(item)"&ndash;&gt;-->
      <!--          &lt;!&ndash;              >{{ t("wallet.myWallet.useThis") }}</el-button&ndash;&gt;-->
      <!--          &lt;!&ndash;            >&ndash;&gt;-->
      <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--        </section>-->
      <!--      </li>-->
    </ul>
  </main-container>
</template>

<script setup>
import { useWallet } from "../../../../store/wallet";
import { computed, onMounted } from "vue";
import { formatCoin } from "../../../../utils/amount-format";
import { useRouter } from "vue-router";
import { dialogConfirm } from "../../../../components/custom-dialog";
import { $post } from "../../../../request";
import dollar from "../../../../assets/icons/dollar.svg";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter();
const wallet = useWallet();
const walletList = computed(() => {
  // const list = [wallet.walletList];
  // const depositLinks = {
  //   USD: "recharge",
  //   BRL: "rechargeR",
  // };
  // return list.map((item) => ({
  //   ...item,
  //   depositLink: depositLinks[item.currency] ?? depositLinks["USD"],
  // }));
  return wallet.walletList;
});
const pageTo = (name) => {
  router.push({ name });
};
const toWithdraw = () => {
  const { allWithdrawalCoin, needCodeCoin } = walletList.value;
  let message = "";
  if (+needCodeCoin > 0)
    message = t("additional.turnOver", { amount: needCodeCoin });
  else if (+allWithdrawalCoin <= 0)
    message = t("additional.insufficientWithdrawal");
  if (message) dialogConfirm(message, t("public.Reminder"));
  else pageTo("withdrawReal");
  // console.log(walletList.value, "999");
};
const changeMain = ({ mainCurrency, currency }) => {
  if (currency === mainCurrency) return;
  const message = t("wallet.myWallet.sureChangeWallet");
  dialogConfirm(message, t("wallet.myWallet.Reminder")).then(() => {
    wallet.SET_MAIN({ mainCurrency: currency });
    // $post("updateMainWallet", { mainCurrency: currency }).then((res) => {
    //   if (res.code === 0) {
    //
    //   }
    // });
  });
};
onMounted(() => {
  wallet.GET_USER_BALANCE();
});
</script>

<style lang="scss" scoped>
.my-wallet {
  margin-bottom: 20px;
  //background: #1a212a;
  border-radius: 20px;
  padding: 20px;
  .wallet-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
  .wallet-list {
    flex-wrap: wrap;

    margin-top: 20px;
    .show-wallet {
      background: #0c2930;
      border-radius: 12px;
      padding: 20px;
      min-width: 280px;
      box-sizing: border-box;
      .wallet-info {
        font-size: 14px;
        color: #8e99b6;
        p {
          margin-bottom: 20px;
        }
        .wallet-value {
          font-size: 20px;
          color: $main-color;
        }
      }
      .show-icon {
        font-size: 66px;
        margin-left: 53px;
      }
      .mr-90 {
        margin-right: 90px;
      }
    }
    .to-button {
      //margin-left: 20px;
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
}
</style>
