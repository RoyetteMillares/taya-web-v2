<template>
  <section class="login-page">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      size="small"
      class="demo-ruleForm"
      status-icon
    >
      <!--      pix 添加-->
      <section>
        <p class="form-label fs-14">
          {{
            code === "0"
              ? t("mine.profile.CryptoType")
              : t("additional.accountType")
          }}
        </p>
        <el-form-item prop="categoryTransfer">
          <el-select
            :teleported="false"
            searchable
            class="crypto-code"
            v-model="ruleForm.categoryTransfer"
            :placeholder="t('mine.profile.PleaseSelect')"
          >
            <el-option
              :label="item.categoryTransferName"
              :value="item.categoryTransfer"
              v-for="item in categoryList"
              :key="item.categoryTransfer"
            />
          </el-select>
        </el-form-item>
        <!--        type-->
        <section v-if="typeInfo && typeInfo.typeList">
          <p class="form-label mt-30 fs-14">{{ t("bet.betrecord.Type") }}</p>
          <el-form-item prop="accountType">
            <el-select
              @change="changeType"
              :teleported="false"
              searchable
              class="crypto-code"
              v-model="ruleForm.accountType"
              :placeholder="t('mine.profile.PleaseSelect')"
            >
              <el-option
                :label="item.name"
                :value="item.type"
                v-for="(item, index) in typeInfo.typeList"
                :key="item.type"
              />
            </el-select>
          </el-form-item>
        </section>
        <section v-if="code === '0'">
          <p class="form-label mt-30 fs-14">
            {{ t("mine.profile.Address") }}
          </p>
          <el-form-item prop="address">
            <el-input
              :placeholder="t('mine.profile.EnterAddress')"
              v-model="ruleForm.address"
            >
            </el-input>
          </el-form-item>
        </section>

        <!--        银行卡-->
        <section v-else>
          <!--          4 pix-->
          <section v-if="typeInfo.categoryTransfer === 4">
            <p class="form-label mt-30 fs-14">
              {{ t("additional.accountNo") }}
            </p>
            <el-form-item prop="accountNo">
              <el-input
                :placeholder="t('additional.inputAccountNo')"
                v-model="ruleForm.accountNo"
              >
              </el-input>
            </el-form-item>
          </section>

          <section v-else>
            <p class="form-label mt-30 fs-14">
              {{ t("additional.accountName") }}
            </p>
            <el-form-item prop="realName">
              <el-input
                :placeholder="t('additional.realName')"
                v-model="ruleForm.realName"
              >
              </el-input>
            </el-form-item>
            <p class="form-label mt-30 fs-14">
              {{ t("additional.accountNo") }}
            </p>
            <el-form-item prop="accountNumber">
              <el-input
                type="number"
                :placeholder="t('additional.accountNumber')"
                v-model="ruleForm.accountNumber"
              >
              </el-input>
            </el-form-item>
          </section>
        </section>
      </section>
      <!--      brl 添加-->
      <!--      <section >-->
      <!--        <p class="form-label fs-14">{{ t("additional.accountType") }}</p>-->
      <!--        <el-form-item prop="accountType">-->
      <!--          <el-select-->
      <!--            :teleported="false"-->
      <!--            searchable-->
      <!--            class="crypto-code"-->
      <!--            v-model="ruleForm.accountType"-->
      <!--            :placeholder="t('mine.profile.PleaseSelect')"-->
      <!--          >-->
      <!--            <el-option-->
      <!--              :label="item.title"-->
      <!--              :value="item.code"-->
      <!--              v-for="item in statusList"-->
      <!--              :key="item.code"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--        <p class="form-label fs-14">{{ t("additional.accountNo") }}</p>-->
      <!--        <el-form-item prop="accountNo">-->
      <!--          <el-input-->
      <!--            :placeholder="t('additional.inputAccountNo')"-->
      <!--            v-model="ruleForm.accountNo"-->
      <!--          >-->
      <!--          </el-input>-->
      <!--        </el-form-item>-->
      <!--      </section>-->
      <!--      -->
    </el-form>
    <el-button type="primary" @click="submit" class="dialog-button">
      {{ t("public.Submit") }}</el-button
    >
  </section>
</template>

<script setup>
import { useCard } from "../../../../store/card";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useWallet } from "../../../../store/wallet";
import { useDictionary } from "../../../../hooks/dictionary";
import { get } from "lodash";
const { t } = useI18n();
const props = defineProps({
  switchVisible: {
    type: Function,
  },
  code: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
});

const isPix = computed(() => props.code === "PIX");

const { getDirection, getTitle } = useDictionary();
const statusList = computed(() => {
  const list = getDirection("dic_withdrawal_address_account_type") || [];
  return list;
});
const ruleForm = reactive({
  address: "",
  categoryTransfer: "",
  accountType: "",
  accountNo: "",
  accountNumber: "",
  realName: "",
});
const rules = reactive({
  accountType: [
    {
      required: true,
      message: t("mine.profile.PleaseSelect"),
      trigger: "change",
    },
  ],
  categoryTransfer: [
    {
      required: true,
      message: t("mine.profile.PleaseSelect"),
      trigger: "change",
    },
  ],
  address: [
    {
      required: true,
      message: t("mine.profile.CryptoAddressIncorrect"),
      min: 10,
      max: 100,
    },
  ],
  accountNo: [
    {
      required: true,
      message: t("additional.validateNo"),
      min: 5,
      max: 100,
    },
  ],
  accountNumber: [
    {
      required: true,
      message: t("additional.accountNumber"),
      min: 5,
      max: 100,
    },
  ],
  realName: [
    {
      required: true,
      message: t("additional.realName"),
      min: 3,
      max: 100,
    },
  ],
});

const card = useCard();
const wallet = useWallet();
const cryptoList = computed(() => wallet.cryptoList); // 虚拟币通道
const ruleFormRef = ref(null);
const withdrawChannelList = computed(() => wallet.withdrawChannelList);
const cardName = computed(
  () => card.configList.find((val) => val.code === ruleForm.code)?.name
);
// 以及选中后的详情
const typeInfo = computed(
  () =>
    categoryList.value.find(
      (item) => ruleForm.categoryTransfer === item.categoryTransfer
    ) ?? {}
);
// 提现类型列表
const categoryList = computed(() => {
  const { code } = props;
  const list = withdrawChannelList.value;
  if (code === '0') {
    const list = (getDirection("dic_category_currency_virtual") || []).map(item => {
      return {
        categoryTransferName: item.title,
        categoryTransfer: item.code
      }
    })
    return list
  }
  const newList = [];
  list.forEach((item) => {
    if (item.categoryCurrency.toString() === code) {
      newList.push(item);
    }
  });
  return newList;
});
const submit = () => {
  ruleFormRef.value &&
  ruleFormRef.value.validate(async (v) => {
    if (v) {
      const { categoryTransfer } = typeInfo.value;
      const params = {
        categoryCurrency: props.code,
        categoryTransfer,
      };
      // console.log(categoryTransfer, "categoryTransfer");
      switch (categoryTransfer) {
        case 1:
        case 2:
          params.address = ruleForm.address;
          break;
        case 3:
        case 5:
          params.address = JSON.stringify({
            accountNumber: ruleForm.accountNumber,
            accountNo: ruleForm.realName,
          });
          break;
        case 4:
          params.address = JSON.stringify({
            accountType: ruleForm.accountType,
            accountNo: ruleForm.accountNo,
          });
          default :
          params.address = ruleForm.address;
      }
      // console.log(params);
      // console.log(parseJson);
      const code = await card.CREATE_CARD(params);
      if (code === 0) {
        card.GET_USER_CARD({ code: props.code });

        props.switchVisible();
        ruleForm.address = "";
        ruleForm.code = "";
        ruleForm.accountType = "";
        ruleForm.accountNo = "";
      }
    }
  });
};
const changeType = () => {
  ruleForm.address = "";
  ruleForm.code = "";
  // ruleForm.accountType = "";
  ruleForm.accountNo = "";
  ruleForm.accountNumber = "";
  ruleForm.realName = "";
};
watch(
  () => props.visible,
  (val) => {
    // console.log(val);
    // ruleForm.categoryTransfer = "";
    if (!val) {
      ruleForm.categoryTransfer = "";
    }
    ruleFormRef.value && ruleFormRef.value.clearValidate();
  }
);
onMounted(() => {
  wallet.GET_WITHDRAW_PLATS();
});
</script>

<style lang="scss" scoped>
.login-page {
  .demo-ruleForm {
    width: 100%;
  }
  .crypto-code {
  }
  .el-select {
    &:hover {
      .el-input__wrapper {
        background-color: #2d333c;
        box-shadow: 1px 0 0 0 $main-color inset, 1px 0 0 0 $main-color,
        0 1px 0 0 $main-color inset, 0 -1px 0 0 $main-color inset !important;
      }
    }
  }
  :deep(.el-input__wrapper) {
    background: #232a33;
    &:hover {
      //--el-input-hover-border-color: $main-color;
      box-shadow: 0 0 0 1px $main-color inset;
    }
    .el-input__inner {
      font-size: 16px;
      color: #fff;
      &::placeholder {
        font-size: 14px;
        color: #8e99b6;
      }
    }
  }

  :deep(.el-popper) {
    --el-bg-color-overlay: #232a33;
    --el-fill-color-light: rgba(0, 0, 0, 0.2);
  }
}

.dialog-button {
  height: 50px;
  border-radius: 25px;
  font-size: 22px;
  margin-top: 20px;
  width: 393px;
}
.form-label {
  margin-top: 5px;
}
</style>
