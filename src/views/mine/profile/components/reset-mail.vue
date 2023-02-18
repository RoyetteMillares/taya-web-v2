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
      <p class="form-label fs-14">{{t('mine.profile.CurrentMail')}}</p>
      <el-form-item>
        <el-input readonly :placeholder="t('mine.profile.EnterMmail')" v-model="info.email">
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
      <p class="form-label fs-14">{{t('mine.profile.NewEmail')}}</p>
      <el-form-item prop="email">
        <el-input :placeholder="t('mine.profile.EnterMmail')" v-model="ruleForm.email" />
      </el-form-item>
    </el-form>
    <el-button @click="submit" type="primary" class="dialog-button">
      <span class="is-bold fs-14">{{t('public.Submit')}}</span>
    </el-button>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { checkEmail, checkVerify } from "../../../../plugins/check";
import { $post } from "@/request";
import { useUserStore } from "../../../../store/user";
import { useVerify } from "../../../../hooks/verify";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const {
  newState: { timer, count },
  startTimer,
  closeTimer,
} = useVerify();
const user = useUserStore();
const info = computed(() => user.info);
const props = defineProps({
  changeVisible: {
    type: Function,
  },
  visible: {
    type: Boolean,
  },
});
const ruleFormRef = ref(null);
watch(
  () => props.visible,
  (val) => {
    if (!val) closeTimer();
  }
);
const ruleForm = reactive({
  email: "",
  verifyCode: "",
});
const rules = reactive({
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  verifyCode: [{ required: true, validator: checkVerify, trigger: "blur" }],
});
const getCode = () => {
  if (info.value.email) {
    startTimer();
    user.GET_EMAIL_CODE({ email: info.value.email });
  }
};
const submit = () => {
  ruleFormRef.value &&
    ruleFormRef.value.validate((v) => {
      if (v) {
        $post("resetEmail", { ...ruleForm }).then((res) => {
          if (res.code === 0) {
            user.GET_USER_PROFILE();
            props.changeVisible();
          }
        });
      }
    });
};
</script>

<style lang="scss" scoped>
.reset-password {
  text-align: center;
  .form-label {
    color: $main-text-color;
    font-size: 12px;
    margin-bottom: 12px;
  }
  :deep(.el-input) {
    height: 40px;
    width: 393px;
  }
  .dialog-button {
    height: 44px;
    border-radius: 25px;
    font-size: 22px;
    margin: 40px auto 0;
    width: 280px;
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
}
</style>
