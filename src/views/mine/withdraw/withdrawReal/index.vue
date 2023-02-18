<template>
  <div>
    <main-container class="mb-20">
      <p class="fs-18 choose-title is-bold mb-20">{{ t("additional.chooseWithdraw") }}</p>

      <!--      提现方式-->
      <ul class="methods-withdraw flex-box">
        <li
          class="with-item"
          :class="{ 'with-item-active': state.selectedType === wtype.code }"
          v-for="wtype in titleList"
          :key="wtype.code"
          @click="changeType(wtype)"
        >
          <div class="methods-item flex-box is-center">
            <svg-icon :name="wtype.code"></svg-icon>
          </div>
          <p class="fs-12">
            {{ wtype.title }}
          </p>
        </li>
      </ul>
    </main-container>
    <main-container class="rechargeR">

      <!--v-show="currentConfig.id"-->
      <section v-if="cardList?.length > 0" class="rInfo">
        <!--        <span>{{ currentConfig }}</span>-->
        <div class="rform">
          <el-form
            ref="ruleFormRef"
            class="rechargeForm"
            :model="ruleForm"
            :rules="rules"
            status-icon
          >
            <p class="rText is-white fs-18">{{ t("additional.withdrawAddress") }}</p>
            <ul class="address-list flex-box">
              <li class="address-item" :class="{'address-item-active':ruleForm.selectId===item.id}" @click="ruleForm.selectId=item.id" v-for="(item, i) in cardList"
              >
                <p class=" mb-10 fs-12 is-bold">{{item.categoryTransferName}}</p>
                <p>{{item.title.replace(/^(\S{4})\S+(\S{4})/, "$1 **** $2")}}</p>
              </li>
            </ul>
            <p class="rText is-white  fs-18">{{ t("additional.Amount") }}</p>
            <el-form-item prop="amount">
              <el-input type="number" v-model="ruleForm.amount">
                <template #suffix>
                  <span class="is-white">{{ MAIN_WALLET.mainCurrency }}</span>
                </template>
              </el-input>
            </el-form-item>
            <div class="numBox flex-box-between">
              <span class="numText">
                {{ t("wallet.myWallet.allowWithdrawal") }}：{{
                  currentConfig?.allWithdrawalCoin
                }}
                <span>{{ MAIN_WALLET.mainCurrency }}</span>
              </span>
              <span
                :class="['all ', { switchChoose: switchChoose }]"
                @click="withdrawAll"
              >
                {{ t("wallet.withdraw.withdrawAll") }}
              </span>
            </div>
            <!--        {{ currentConfig.currency}}-->
            <div class="rqrcode flex-box">
              <div class="codeBox">
<!--                <div class="numLine flex-box-between">-->
<!--                    <span class="numLine-l">{{ t("additional.Fees") }}</span>-->
<!--                    <span class="numLine-r">-->
<!--                      {{ currentConfig.mainNetFees }}-->
<!--                      {{ currentConfig.currency }}-->
<!--                    </span>-->
<!--                </div>-->
                <div class="numLine flex-box-between">
                  <span class="numLine-l">
                    {{
                      t("wallet.withdraw.exchangerateType", {
                        type: currentConfig.currency,
                      })
                    }}
                  </span>
                    <span class="numLine-r">
                      1 : {{ currentConfig?.withdrawalRate }}
                    </span>
                </div>
                <div class="flex-box-between">
                  <p class="textLine">
                    {{
                      t("wallet.withdraw.actualType", {
                        type: currentConfig.currency,
                      })
                    }}
                  </p>
                  <p class="num">
                    {{ actualCryptoNum }}
                    {{ currentConfig.currency }}
                  </p>
                </div>

              </div>
            </div>
            <el-button type="primary" class="button-item fs-16 is-bold" @click="onSubmit">{{
                t("public.Submit")
              }}</el-button>
          </el-form>
        </div>

      </section>
      <div v-else class="show-unbind">
        <div class="flex-box is-center none-bind">
          <svg-icon name="collection-none"></svg-icon>
        </div>
        <p class="description">{{ t("additional.dontHaveWithdrawAccount") }}</p>

        <router-link to="/mine" class="is-success fs-14 link">
          {{ t("extra.toBind") }}
        </router-link>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useWallet } from "@/store/wallet.js";
import { isAmount } from "@/utils/validate";
import { checkAmountOrBet } from "@/plugins/check.js";
import { useI18n } from "vue-i18n";
import { useCard } from "@/store/card";
import { useDictionary } from "@/hooks/dictionary";
import { customPopup } from "@/components/custom-popup";
import { useUserStore } from "@/store/user";

const { t } = useI18n();
const { getTitle, getDirection } = useDictionary();
const list = computed(() =>
  getDirection("dic_withdrawal_address_account_type")
);

const card = useCard();
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const wallet = useWallet();
const MAIN_WALLET = computed(() => wallet.MAIN_WALLET);

const titleList = computed(() => getDirection("dic_category_currency") || []);

const state = reactive({
  selectedType: getDirection("dic_category_currency") ? [0]?.code ?? "0" : "0",
});
const ruleFormRef = ref(null);
const ruleForm = reactive({
  amount: "",
  selectId: "", // 选中的id
});

const isPix = computed(() => state.selectedType === "PIX");

const cardList = computed(() =>
  card.cardList.filter(
    (item) => state.selectedType === item.categoryCurrency.toString()
  )
);
const selectedCard = computed(() =>
  cardList.value?.find((c) => c.id === ruleForm.selectId)
);

const switchChoose = ref(false);
// 校验提现金额
const checkAmount = (rule, value, cb) => {
  const { minWithdrawalCoin, maxWithdrawalCoin, allWithdrawalCoin } =
    currentConfig.value;
  if (!value) cb(t("additional.enterAmount"));
  else {
    if (isAmount(value)) {
      if (+value && +value <= +allWithdrawalCoin) {
        if (+value >= +minWithdrawalCoin && +value <= +maxWithdrawalCoin) cb();
        else
          cb(
            t("additional.correctAmount", {
              min: minWithdrawalCoin,
              max: maxWithdrawalCoin,
            })
          );
      } else cb(t("additional.insufficientAmount"));
    } else cb(t("additional.amountFormat"));
  }
};

const rules = reactive({
  selectId: [
    {
      required: true,
      trigger: "blur",
      message: t("mine.profile.PleaseSelect"),
    },
  ],
  address: [{ required: true, trigger: "blur" }],
  quantity: [{ required: true, validator: checkAmountOrBet, trigger: "blur" }],
  amount: [{ required: true, validator: checkAmount, trigger: "blur" }],
});

const withdrawAll = () => {
  const { allWithdrawalCoin } = currentConfig.value;
  if (+allWithdrawalCoin) ruleForm.amount = +allWithdrawalCoin;
};

// 清空输入框
const clearInput = () => {
  ruleForm.amount = "";
};
// 切换提款方式
const changeType = async (wtype) => {
  clearInput();
  ruleForm.selectId = "";
  state.selectedType = wtype.code;

  // await getCards();
  setDefault();
};

// 设置默认的提款方式(初次或者切换type)
const setDefault = () => {
  const list = cardList.value;
  if (list?.length > 0) {
    ruleForm.selectId = list[0].id;
  }
};
// 提款汇率配置
const withdrawConfig = computed(() => card.withdrawConfig ?? []);
// 当前提现渠道的配置
const currentConfig = computed(() => {
  const getInfo =
    cardList.value.find((item) => item.id === ruleForm.selectId) ?? {};
  const obj =
    withdrawConfig.value.find(
      (item) =>
        item.categoryCurrency == state.selectedType &&
        getInfo.categoryTransfer == item.categoryTransfer
    ) ?? {};
  return obj;
});
// 获取提款配置
const getWithdrawConfig = () => {
  card.GET_WITHDRAW_CONFIG({
    withdrawalType: route.query.type ? "0" : "1",
  });
};
// 计算实际到账 u 数量
const actualCryptoNum = computed(() => {
  const { amount } = ruleForm;
  let num = "0.00";
  const { withdrawalRate, mainNetFees, categoryCurrency } = currentConfig.value;
  if (categoryCurrency != "1") {
    num = (+amount / withdrawalRate - mainNetFees * 1).toFixed(2) || "0.00";
  } else {
    num = (+amount - mainNetFees * 1).toFixed(2) || "0.00";
  }
  return +num >= 0 ? num : "0.00";
});

const getCards = async () => {
  const payload = { code: state.selectedType };
  await card.GET_USER_CARD(payload); // 获取提现地址列表
};
onMounted(async () => {
  await getCards();

  setDefault();
  getWithdrawConfig();
});

const onSubmit = () => {
  console.log(selectedCard);
  ruleFormRef?.value?.validate(async (v) => {
    if (v) {
      const {
        accountNo,
        accountType,
        address,
        categoryTransfer,
        categoryCurrency,
      } = selectedCard.value;
      const result = await wallet.WITHDRAWAL({
        withdrawalAddress: address,
        withdrawalAmount: ruleForm.amount,
        category: route.query.type ? "0" : "1",
        categoryCurrency,
        categoryTransfer,
      });
      if (result.code == 0) {
        user.GET_USER_PROFILE();
        getWithdrawConfig();
        customPopup(t("wallet.withdraw.WithdrawalSucceeded"), "", {
          isSuccess: true,
        });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.rtitle {
  margin: 10px 0px;
  color: #11b85a;
}

  .choose-title {
    color: #fff;
  }
  .methods-withdraw {
    .with-item {
      margin-right: 12px;
      text-align: center;
      color: #506871;
      cursor: pointer;
      &-active {
        color: #fff;
        .methods-item {
          background: $main-color;
        }
      }
    }
    .methods-item {
      width: 70px;
      height: 58px;
      background: #18292f;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 36px;
    }
  }

.rInfo {
  color: #8e99b6;
  display: flex;
  width: 960px;
  .rqrcode {
    //flex: 1;
    .codeBox {
      padding: 20px;
      background: #0c2930;
      border-radius: 8px;
      margin-top: 20px;
      min-width: 300px;
      .numLine {

        .numLine-l {
          float: left;
        }
        .numLine-r {
          float: right;
        }
      }
      .textLine {
        //padding: 20px 20px;
      }
      .num {
        //padding: 0px 20px;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  .rform {
    flex: 1;
    .rechargeForm {
      :deep(.el-select) {
        --el-border-color-hover: #11b85a;
      }

      :deep(.el-input) {
        width: 251px;
        height: 40px;
      }
      .numBox {
        width: 251px;
        //margin: 0 20px;
        .numText {
          font-size: 12px;
          text-align: left;
          color: #ffffff;
          line-height: 14px;
          float: left;
        }
        .all {
          font-size: 12px;
          color: $main-color;
          cursor: pointer;
        }
      }
      .warning {
        display: flex;
        width: 392px;
        .icon-warning {
          flex: 1;
          height: 16px;
          margin-top: 10px;
        }
        p {
          flex: 13;
          font-size: 10px;
          line-height: 16px;
        }
      }
      .rText {
        margin-bottom: 20px;
      }
      .button-item {
        margin: 50px 0;
        width: 280px;
        height: 46px;
        border-radius: 8px;
      }
    }
  }
}
.show-unbind {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 500px;

  .none-bind {
    font-size: 100px;
  }
  .description {
    text-align: center;
    color: #8e99b6;
    font-size: 20px;
  }

  .link {
    line-height: 30px;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
  }
}
.address-list{
  margin-bottom: 30px;
  .address-item{
    width: 141px;
    height: 67px;
    background: #18292f;
    border-radius: 8px;
    padding: 13px 16px;
    box-sizing: border-box;
    color: #B6C0C3;
    border: 1px solid #18292f;
    cursor: pointer;
    &-active{
      color: $main-color;
      border-color: $main-color;
    }
  }
}
.is-success{
  color:$main-color;
}
</style>
