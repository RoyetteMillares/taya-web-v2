<template>
  <div class="flex-box">
    <div class="rInfo">
      <p class="is-white">{{ t("wallet.recharge.QuickAmount") }}</p>
      <div class="amounts" v-if="depositInfo.chips">
        <div
          :class="['amountBox fs-12', { active: item === activeIndex }]"
          v-for="(item, i) in depositInfo.chips.split(',')"
          :key="i"
          @click="changeAmount(item, i)"
        >
          <p>{{ depositInfo.unit }}{{ item }}</p>
        </div>
      </div>
      <el-form
        ref="ruleFormRef"
        class="rechargeForm"
        :model="ruleForm"
        :rules="rules"
        status-icon
      >
        <p class="rText is-white">{{ t("wallet.recharge.DepositAmount") }}</p>
        <el-form-item prop="amount">
          <el-input v-model="ruleForm.amount" style="width: 350px;">
            <template #suffix>
              <span v-if="depositInfo.name">{{
                depositInfo.name.split("_")[1]
              }}</span>
            </template>
          </el-input>
        </el-form-item>
        <div class="tip-exchange is-white">
          {{ t("wallet.recharge.tip3") }}{{ depositInfo.rate }}
        </div>
        <p style="text-align: left;max-width: 350px " class="fs-12 mt-5 is-white">
          {{ t("additional.depositTips") }}
        </p>
        <el-button
          type="primary"
          @click="submitRecharge"
          class="button-item fs-18 is-bold"
          >{{ t("public.Submit") }}</el-button
        >
      </el-form>
    </div>
    <custom-dialog
      v-model="state.show"
      :title="t('wallet.recharge.RechargeUSDT')"
    >
      <div class="codeBox flex-box">
        <!--        <div class="addressBlock" />-->
        <qrcode-vue
          id="canvasDom"
          background="#f2f2f2"
          :value="state.address"
          :size="120"
          level="H"
          class="show-code"
        />
        <section @click="copy(state.address)" class="flex-box show-address">
          <span>
            {{
            state.address.replace(/^(\S{6})(\S{6})(\S+)/, "$1 **** $2")
          }}
          </span>
          <div class="flex-box fs-16 ml-5">
            <svg-icon name="copy"></svg-icon>
          </div>
        </section>
        <p>{{ t("wallet.recharge.qrLabel") }}</p>
      </div>
    </custom-dialog>
  </div>
</template>

<script setup>
import QrcodeVue from "qrcode.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useWallet } from "../../../../store/wallet.js";
import { useI18n } from "vue-i18n";
import { useUserStore } from "../../../../store/user";
import { isAmount } from "../../../../utils/validate";
import { dialogConfirm } from "../../../../components/custom-dialog";
import { copy } from "@/utils";
const props = defineProps({
  depositInfo: {
    type: Object,
    default: {},
  },
});
const { t } = useI18n();
const activeIndex = ref("");
const router = useRouter();
const user = useUserStore();
const wallet = useWallet();
const ruleFormRef = ref(null);
const ruleForm = reactive({
  amount: "",
});
const checkAmount = (rule, value, cb) => {
  if (value) {
    const { minCoin, maxCoin } = props.depositInfo;
    if (isAmount(value)) {
      if (+value >= +minCoin && +value <= +maxCoin) cb();
      else cb(t("additional.minAmount", { min: minCoin, max: maxCoin }));
    } else cb(t("additional.amountFormat"));
  } else cb(t("validator.text11"));
};
const rules = reactive({
  amount: [{ required: true, validator: checkAmount, trigger: "blur" }],
});
const state = reactive({
  show: false,
  address: "",
});

const changeAmount = async (data, index) => {
  activeIndex.value = data;
  ruleForm.amount = +data;
};
const openAddress = async () => {
  const params = {
    uid: user.info.id,
    code: props.depositInfo.code,
    coin: +ruleForm.amount,
  };
  const {
    code,
    data: { depositAddress },
  } = await wallet.GET_DEPOSIT_ADDRESS(params);
  if (code === 0 && depositAddress) jump(depositAddress);
};
const jump = (address) => {
  ruleForm.amount = "";
  activeIndex.value = "";
  const { skipCategory } = props.depositInfo;
  if (skipCategory === 1) {
    state.show = true;
    state.address = address;
  } else if (skipCategory === 2) {
    const newWindow = window.open();
    newWindow.location.href = address;
  }
};
const submitRecharge = () => {
  ruleFormRef?.value?.validate(async (v) => {
    if (v) {
      const {
        code,
        data: { address },
      } = await user.CHECK_DEPOSIT({ code: props.depositInfo.code });

      if (code === 0) {
        if (address) {
          dialogConfirm(t("additional.unFinished"), t("public.Reminder"), {
            showCancelButton: true,
            cancelText: t("additional.resend"),
            confirmText: t("additional.continuePay"),
          })
            .then(() => {
              jump(address);
            })
            .catch(() => {
              openAddress();
            });
        } else {
          openAddress();
        }
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
.rechargeR {
  margin-bottom: 50px;
}
.plats {
  display: flex;
  margin-top: 20px;
  .plat {
    display: inline-grid;
    margin-right: 12px;
    width: 80px;
    text-align: center;
    color: #8e99b6;
    .active {
      color: #ffffff !important;
      .rimg {
        background: #11b85a !important;
        .svg-icon {
          color: #ffffff !important;
        }
      }
    }
    .rimg {
      width: 80px;
      height: 50px;
      background: #232a33;
      border-radius: 6px;
      margin-bottom: 12px;
      .svg-icon {
        width: 30px;
        height: 30px;
        color: #8e99b6;
        margin-top: 10px;
      }
    }
  }
}
.rInfo {
  color: #8e99b6;
  //margin: 30px 50px 0 0;
  //width: 960px;
  .amounts {
    width: 400px;
    color: #ffffff;
    margin-top: 12px;
    margin-bottom: 20px;
    .amountBox {
      display: inline-grid;
      width: 80px;
      height: 50px;
      box-sizing: border-box;
      background: #18292f;
      border-radius: 6px;
      text-align: center;
      line-height: 50px;
      margin-bottom: 10px;
      margin-right: 12px;
      cursor: pointer;
      border: 1px solid #18292f;
      &.active {
        background: #0c2930;
        color: $main-color;
        border-color: $main-color;
      }
    }
  }
  .rechargeForm {
    .button-item {
      margin-top: 55px;
      margin-bottom: 20px;
      width: 350px;
      height: 50px;
      //background: $main-color;
      border-radius: 8px;
      font-size: 18px;
    }
    .real {
      font-size: 16px;
      text-align: right;
      color: #ffffff;
      line-height: 14px;
    }
    .rText {
      margin-bottom: 16px;
      margin-top: 30px;
    }
  }
}
:deep(.el-form-item__error) {
  white-space: pre-line;
  //word-break: pre-line;
}
.codeBox {
  //width: 280px;
  //height: 339px;
  background: #232a33;
  border-radius: 8px;
  margin: 0 auto 30px;
  padding: 20px;
  width: 300px;
  box-sizing: border-box;
  flex-direction: column;
  .show-code {
    //margin: 40px 80px 30px 80px;
    width: 120px;
    height: 120px;
  }
  p {
    color: #fff;
    margin-top: 10px;
  }
  .show-address {
    cursor: pointer;
    margin-top: 15px;
    color: $main-text-color;
  }
}
</style>
