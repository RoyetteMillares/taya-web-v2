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
      <!--      <p class="form-label fs-12">Mail</p>-->
      <p class="form-label fs-12">{{ t("mine.profile.OldPassword") }}</p>
      <el-form-item prop="oldPassword">
        <el-input
          autocomplete="off"
          type="password"
          show-password
          :placeholder="t('mine.profile.OldPassword')"
          v-model="ruleForm.oldPassword"
        />
      </el-form-item>
      <p class="form-label fs-12">{{ t("mine.profile.NewPassword") }}</p>
      <el-form-item prop="password">
        <el-input
          type="password"
          show-password
          autocomplete="off"
          :placeholder="t('mine.profile.NewPassword')"
          v-model="ruleForm.password"
        />
      </el-form-item>
      <p class="form-label fs-12">{{ t("additional.ConfirmNewPassword") }}</p>
      <el-form-item prop="confirmPassword">
          <el-input
            type="password"
            show-password
            :placeholder="t('additional.ConfirmNewPassword')"
            v-model="ruleForm.confirmPassword"
          />
        </el-form-item>
    </el-form>
    <el-button type="primary" class="dialog-button" @click="confirm">{{
        t("public.Submit")
      }}</el-button>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useUserStore } from "../../../../store/user";
import {
  checkEmail,
  checkPassword,
  checkVerify,
} from "../../../../plugins/check";
import { isPassword } from "@/utils/validate";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const props = defineProps({
  changeVisible: {
    type: Function,
  },
  visible: {
    type: Boolean,
  },
});
const info = computed(() => user.info);

const user = useUserStore();
const ruleForm = reactive({
  checkPassword: "",
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
  oldPassword: [{ required: true, validator: checkPassword, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  confirmPassword: [{ required: true, validator: checkconfirmPassword, trigger: "blur" }],
});
const ruleFormRef = ref(null);

const confirm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (v) => {
      if (v) {
        const { code } = await user.RESET_PASSWORD({
          ...ruleForm,
          category: 1,
        });
        await user.LOGOUT();
        router.push("/login");
        if (code === 0) {
          ruleForm.password = "";
        }
      }
    });
  }
};
// const sendSms = async () => {
//   if (ruleFormRef.value) {
//     ruleFormRef.value.validateField("email", (v) => {
//       if (v) {
//         startTimer();
//         user.GET_EMAIL_CODE();
//       }
//     });
//   }
// };
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
.dialog-button {
  height: 44px;
  border-radius: 25px;
  font-size: 22px;
  margin: 40px auto 0;
  width: 280px;
}
</style>
