<template>
  <custom-dialog
    :before-close="beforeClose"
    :title="title"
    v-model="showVisible"
    :showFooter="false"
  >
    <section class="login-page">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="small"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="phone">
          <!-- <el-input
            :placeholder="t('EnterAccountBindingPhone')"
            v-model="ruleForm.phone"
          >
          </el-input> -->
          <el-input
          class="phone-code"
          type="number"
          :placeholder="t('mine.profile.PhoneNumber')"
          v-model="ruleForm.phone"
        >
          <template #prepend>
            <el-select
              class="area-code"
              searchable
              v-model="ruleForm.areaCode"
              :placeholder="t('public.Select')"
            >
              <el-option
                :label="`+${item.code} ${item.locale}`"
                :value="`+${item.code}`"
                v-for="item in areaList"
              />
            </el-select>
          </template>
        </el-input>
          <div
            :class="{ 'send-disabled': timer }"
            @click="sendSms"
            class="show-append fs-14 flex-box is-center"
          >
            <span>{{ t('mine.GetCode') }}</span>
            <span class="show-count" v-show="timer">({{ count }})</span>
          </div>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            :placeholder="t('mine.CodeVerification')"
            type="number"
            v-model="ruleForm.verifyCode"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            :placeholder="t('mine.NewPassword')"
            v-model="ruleForm.password"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            type="password"
            show-password
            :placeholder="t('additional.ConfirmNewPassword')"
            v-model="ruleForm.confirmPassword"
          />
        </el-form-item>
      </el-form>
      <el-button @click="confirm" type="primary" class="dialog-button">
        <span class="is-bold fs-14">{{ t('public.Submit') }}</span>
      </el-button>
    </section>
  </custom-dialog>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { checkMobile, checkPassword, checkVerify } from "../../../plugins/check";
import { isPassword, isEmail } from "../../../utils/validate";
import { useUserStore } from "../../../store/user";
import { useVerify } from "../../../hooks/verify";
import { useI18n } from "vue-i18n";
import areaList from "@/assets/json/area.json";

const { t } = useI18n();
const {
  newState: { timer, count },
  startTimer,
  closeTimer,
} = useVerify();
const user = useUserStore();
const ruleForm = reactive({
  areaCode: '+63',
  email: "",
  phone: '',
  verifyCode: "",
  password: "",
  confirmPassword: "",
});

const checkconfirmPassword = (rule, value, cb) => {
  if (value) {
    if (isPassword(value) && value == ruleForm.password) cb();
    else cb(t("validator.text05"));
  } else cb(t("validator.text06"));
};

const rules = reactive({
  // email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  phone: [{ required: true, validator: checkMobile, trigger: "blur" }],
  verifyCode: [{ required: true, validator: checkVerify, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  confirmPassword: [{ required: true, validator: checkconfirmPassword, trigger: "blur" }],
});
const props = defineProps({
  modelVisible: {
    type: Boolean,
  },
  title: {
    type: String,
  },
});
const showVisible=computed({
  get(){
    return props.modelVisible
  },
  set(val){
    emit("update:modelValue",val)
  }
})
// const disabledSend = computed(() => {
//   const { email } = ruleForm;
//   return !isEmail(email) || state.timer;
// });
const ruleFormRef = ref(null);
const emit = defineEmits(["update:modelValue"]);
const beforeClose = () => {
  emit("update:modelValue", false);
};
const confirm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (v) => {
      if (v) {
        // const data = {
        //   email: ruleForm.email,
        //   phone: `${ruleForm.areaCode} ${ruleForm.phone}`,
        //   password: ruleForm.password,
        //   verifyCode: ruleForm.verifyCode
        // }
        const data = {...ruleForm}
        data.phone = `${data.areaCode} ${data.phone}`
        const { code } = await user.FORGET_PASSWORD(data);
        if (code === 0) {
          ruleForm.phone = "";
          ruleForm.email = "";
          ruleForm.verifyCode = "";
          ruleForm.password = "";
          beforeClose();
        }
      }
    });
  }
};

const sendSms = async () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validateField("phone", (v) => {
      if (v) {
        startTimer();
        user.GET_PHONE_CODE({ phone: `${ruleForm.areaCode} ${ruleForm.phone}` });
      }
    });
  }
};
onBeforeUnmount(() => {
  closeTimer();
});
</script>

<style lang="scss" scoped>
@import "../style";
.login-page {
  .demo-ruleForm {
    :deep(.el-input__suffix-inner) {
      display: none;
    }
    :deep(.el-input) {
      height: 40px;
    }
    //:deep(.el-input-group__append) {
    //  background: #232a33;
    //  box-shadow: none;
    //  border-left: none;
    //}
    .show-append {
      height: calc(100% - 4px);
      position: absolute;
      right: 2px;
      border-radius: 5px;
      top: 2px;
      padding: 0 12px;
      color: $main-color;
      cursor: pointer;
      background: #232a33;
      z-index: 10;
      //padding: 1px;
    }
    .send-disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.4;
      color: #fff;
    }
    .show-count {
      color: $main-text-color;
      margin-left: 8px;
    }
  }
}
.dialog-button {
  height: 44px;
  border-radius: 25px;
  font-size: 22px;
  margin: 40px auto 0;
  width: 280px;
}

.phone-code {
  :deep(.el-input-group__prepend) {
    width: 120px;
  }
}
.area-code {
  width: 120px;

  :deep {
    &.el-select {
      left: initial;
      top: initial;
      &:hover {
        .el-input__wrapper {
          background-color: #2d333c;
          box-shadow: 1px 0 0 0 $main-color inset, 1px 0 0 0 $main-color,
            0 1px 0 0 $main-color inset, 0 -1px 0 0 $main-color inset !important;
          //box-shadow: 0 0 0 1px $main-color inset !important;
        }
      }
    }
    .el-input {
      width: 100%;
      border: none;
      .el-input__wrapper {
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
    }
  }
}
</style>
