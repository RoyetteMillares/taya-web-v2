<template>
  <UserReusable :title="t('mine.SignIn')">
    <div class="login-page">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            :placeholder="t('mine.UsernameOrEmail')"
            v-model="ruleForm.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            :placeholder="t('mine.Password')"
            v-model="ruleForm.password"
          />
        </el-form-item>
        <p class="forgot-text" @click="openDialog('forget')">
          {{ t('mine.ForgotPassword') }}
        </p>
        <el-form-item>
          <el-button
            :disabled="isDisabled"
            :loading="loading"
            @click="submit"
            class="login-button"
            type="primary"
            >{{ t('mine.SignIn') }}</el-button
          >
        </el-form-item>
        <div class="is-have">
          <span>{{ t('mine.DontHaveAccount') }}</span>
          <span class="is-active" @click="pageTo('/register')"
            >{{ t('mine.CreateAccount') }}</span
          >
        </div>
      </el-form>
    </div>
    <!--    <custom-dialog :title="customInfo.title" v-model="visible">-->
    <component
      v-model="visible"
      :title="customInfo.title"
      :is="customInfo.component"
      :params="ruleForm"
      :login="login"
    ></component>
    <!--    </custom-dialog>-->
  </UserReusable>
</template>

<script setup>
import UserReusable from "./component/user-reusable.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { isUsername, isPassword } from "../../utils/validate";
import { useUserStore } from "../../store/user";
import ForgetPassword from "./component/forget-password.vue";
import InputAuth from "./component/input-auth.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const customList = [
  {
    title: t('mine.ForgetPassword'),
    component: ForgetPassword,
    key: "forget",
  },
  {
    title: t('mine.GoogleAuthenticator'),
    component: InputAuth,
    key: "google",
  },
];
const state = reactive({
  currentView: "forget",
});
const customInfo = computed(() =>
  customList.find((val) => state.currentView === val.key)
);
const router = useRouter();
const user = useUserStore();
const loading = ref(false);
const visible = ref(false);
const pageTo = (route) => {
  router.push(route);
};
const ruleForm = reactive({
  username: "",
  password: "",
});
// submit button disabled
const isDisabled = computed(() => {
  const { username, password } = ruleForm;
  return !username || !password;
});
const ruleFormRef = ref(null);
// check the login name
const checkLoginName = (rule, value, cb) => {
  if (value) {
    if (isUsername(value)) cb();
    else cb( t('validator.text01') );
  } else cb( t('mine.EnterUsernameOrEmail') );
};
// check password
const checkPassword = (rule, value, cb) => {
  if (value) {
    if (isPassword(value)) cb();
    else cb( t('mine.IncorrectInput') );
  } else cb( t('mine.EnterPassword') );
};
const rules = reactive({
  username: [{ required: true, validator: checkLoginName, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
});
// submit and check the validation
const submit = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (v) => {
      if (v) {
        loading.value = true;
        const { data, code } = await user.CHECK_NEED_GOOGLE({
          username: ruleForm.username,
        });
        loading.value = false;
        if (code === 0) {

          if (data !== 1) login(ruleForm);
          else {

            openDialog("google");
          }
        }
      }
    });
  }
};
const login = async (data) => {
  loading.value = true;
  const code = await user.LOGIN({ ...data });
  loading.value = false;
  code === 0 && router.replace("/");
};
const openDialog = (val) => {
  state.currentView = val;
  visible.value = true;
};
// onMounted(() => {
//   const env = import.meta.env.MODE;
//   if (env === "development") {
//     ruleForm.username = "test4321";
//     ruleForm.password = "1234qwer";
//   }
// });
</script>

<style lang="scss" scoped>
@import "style";
.is-have {
  //margin-top: 30px;
  margin-top: 40px;
  font-size: 18px;
  color: #fff;
  text-align: center;
}
.el-button.is-disabled {
  opacity: 0.3 !important;
  border: none !important;
  border-color: none !important;
  //background: #11b85a !important;
}
</style>
