<template>
  <section class="login-page reset-password">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      size="small"
      class="demo-ruleForm"
      status-icon
    >
      <p class="form-label fs-12">{{t('mine.profile.Mobile')}}</p>
      <el-form-item prop="mobile">
        <el-input :placeholder="t('mine.profile.PhoneNumber')" v-model="ruleForm.mobile">
          <template #prepend>
            <el-select
              searchable
              class="area-code"
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
          <template #suffix>
            <div
              class="verify-code"
              :class="{ 'forbidden-send': timer }"
              @click="getCode"
            >
              <span class="is-bold fs-14">{{t('mine.profile.GetCode')}}</span>
              <span
                class="is-bold fs-14 countdown-show"
                v-show="count > 0 && timer"
                >({{ count }})</span
              >
            </div>
          </template>
        </el-input>
      </el-form-item>
      <p class="form-label fs-14"> {{t('mine.profile.CodeVerification')}} </p>
      <el-form-item prop="verifyCode">
        <el-input
        :placeholder="t('mine.CodeVerification')"
          v-model="ruleForm.verifyCode"
        />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit" class="dialog-button">
      <span class="fs-14 is-bold">{{t('public.Submit')}}</span>
    </el-button>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import areaList from "@/assets/json/area.json";
import { useVerify } from "../../../../hooks/verify";
import { useUserStore } from "../../../../store/user";
import { $post } from "@/request";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const {
  newState: { timer, count },
  startTimer,
  closeTimer,
} = useVerify();
const user = useUserStore();
const info = computed(() => user.info);
const ruleForm = reactive({
  areaCode: "+63",
  mobile: "",
});
const props = defineProps({
  changeVisible: {
    type: Function,
  },
  visible: {
    type: Boolean,
  },
});

watch(
  () => props.visible,
  (val) => {
    if (!val) closeTimer();
  }
);
const ruleFormRef = ref(null);
const rules = reactive({
  mobile: [{ required: true }],
});
const submit = () => {
  ruleFormRef.value &&
    ruleFormRef.value.validate((v) => {
      if (v) {
        $post("resetMobile", { ...ruleForm }).then((res) => {
          if (res.code === 0) {
            props.changeVisible();
            user.GET_USER_PROFILE();
          }
        });
      }
    });
};
const getCode = () => {
  if (ruleForm.mobile) {
    startTimer();
    user.GET_PHONE_CODE({ phone: `${ruleForm.areaCode} ${ruleForm.mobile}` });
  }
};

onMounted(async () => {
  const { id } = info.value;
  if (!id) await user.GET_USER_PROFILE();
  ruleForm.areaCode = "+" + info.value.areaCode;
  ruleForm.mobile = info.value.mobile;
});
</script>

<style lang="scss" scoped>
.reset-password {
  text-align: center;

  :deep(.el-input) {
    height: 40px;
    width: 393px;
  }
  .dialog-button {
    height: 44px;
    border-radius: 25px;
    font-size: 22px;
    margin-top: 40px;
    width: 280px;
  }
}
.area-code {
  width: 120px;

  :deep {
    &.el-select {
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
.form-label {
  margin-bottom: 12px;
}

.verify-code {
    position: relative;
    z-index: 1;
    cursor: pointer;
    color: $main-color;
  }
  .forbidden-send {
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
    pointer-events: none;
    .countdown-show {
      color: #8e99b6;
      margin-left: 8px;
    }
  }  
</style>
