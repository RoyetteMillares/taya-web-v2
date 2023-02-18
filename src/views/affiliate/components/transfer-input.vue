<template>
  <div>
    <section class="transfer">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="small"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="usdt">
          <el-input class="input" type="number" :placeholder="t('affiliate.transfer.TransferUSD')" v-model="ruleForm.usdt" />
        </el-form-item>
      </el-form>
      <div class="text">
        <p>
          {{ t("affiliate.transfer.AllowTransfers") }}：
          {{ mainWallet.allowWithdrawal }}
          {{ walletList?.mainCurrency }}
        </p>
        <span @click="transferAll">{{ t("affiliate.transfer.TransferAll") }}</span>
      </div>
      <div
        class="footer-modal flex-box"
      >
        <el-button
          @click="cancel"
          class="dialog-button cancel-button is-bold"
          type="info"
          >{{ t("affiliate.transfer.Cancel") }}</el-button
        >
        <el-button
          @click="confirm"
          class="dialog-button is-bold"
          type="primary"
          >{{ t("affiliate.transfer.Confirm") }}</el-button
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import {$post} from "@/request";
import { useAppStore } from "@/store/app";
import { useWallet } from "@/store/wallet";
import { customPopup } from "../../../components/custom-popup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const wallet = useWallet();
const walletList = computed(() => wallet.walletList);

const props = defineProps({
  mainWallet: {
    type: Object,
    default: {},
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  switchVisible: {
    type: Function,
  },
  beforeClose: {
    type: Function,
  },
  resolve: {
    type: Function,
    default: () => {},
  },
  reject: {
    type: Function,
    default: () => {},
  },
  removeEl: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);
const cancel = () => {
  emit("update:modelValue", false);
};

const minCoin = ref(0);

const ruleFormRef = ref(null);
const ruleForm = reactive({
  usdt: 0,
});
const rules = reactive({
  usdt: [{ required: true }],
});

// 提款最小额度
const minCoinLimit = async() => {
  let init = useAppStore().config;
  if (!init.length) {
    await useAppStore().GET_CONFIG();
    init = useAppStore().config;
  }
  minCoin.value = init.find((item) => item.title === "minCoin")?.value;
};

const confirm = async() => {
  await minCoinLimit()
  if(
    Number(props.mainWallet?.allowWithdrawal) > 0 && 
    Number(ruleForm.usdt) >= Number(minCoin.value)
  ) {
    ruleFormRef.value &&
    ruleFormRef.value.validate((v) => {
      if (v) {
        const params = { "coin": ruleForm.usdt }
        $post("coinTransfer", params).then((res) => {
          if (res.code === 0) {
            emit("update:modelValue", false);
          }
        });
      }
    });
  } else {
    customPopup(t("additional.minimumAmountIs"), minCoin.value);
  }
};

const transferAll = async() => {
  if(Number(props.mainWallet?.allowWithdrawal) >= 0) {
    ruleForm.usdt = props.mainWallet.allowWithdrawal
  } else {
    customPopup(t("affiliate.transfer.InsufficientBalance"));
  }
};
</script>

<style lang="scss" scoped>
.transfer {
  .demo-ruleForm {
    margin: 0 auto;
    .input {
      margin: 0 auto;
    }
    :deep(.el-input__wrapper) {
      width: 393px;
      height: 40px;
      box-shadow: none;
      background: #232a33;
      border: 1px solid #2d333c;
      border-radius: 8px;
      padding-left: 20px;
    }
    :deep(.el-form-item__error) {
      width: 266px;
    }
    :deep(.el-input) {
      width: 393px;
      height: 40px;
    }
  }
  .text {
    width: 393px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    //margin: 19px auto 163px;
    margin: 19px auto 0;
    p {
      color: #ffffff;
    }
    span {
      color: #11b85a;
    }
  }
  .form-label {
    color: $main-text-color;
    font-size: 14px;
    margin-bottom: 16px;
  }
  :deep(.el-input) {
    height: 40px;
    width: 393px;
  }
  .dialog-button {
    width: 160px;
    height: 44px;
    border-radius: 22px;
    //margin-top: 40px;
    margin: 151px 40px -10px;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    background: #11b85a;
  }
  .cancel-button {
    color: #8e99b6;
    background: #232a33;
  }

}
</style>
