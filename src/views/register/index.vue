<template>
  <UserReusable :title="t('mine.Register')">
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
            :placeholder="t('mine.EnterYourAccount')"
            v-model="ruleForm.username"
          />
        </el-form-item>
<!--        <el-form-item prop="email">-->
<!--          <el-input placeholder="e.g. you@example.com" v-model="ruleForm.email">-->
<!--            <template #suffix>-->
<!--              <div-->
<!--                class="verify-code"-->
<!--                :class="{ 'forbidden-send': timer }"-->
<!--                @click="sendSms"-->
<!--              >-->
<!--                <span class="is-bold fs-14">{{ t("mine.GetCode") }}</span>-->
<!--                <span-->
<!--                  class="is-bold fs-14 countdown-show"-->
<!--                  v-show="count > 0 && timer"-->
<!--                  >({{ count }})</span-->
<!--                >-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-input>-->
<!--        </el-form-item>-->
<!--        v-if="IS_NEED_MOBILE === '0'"-->
        <el-form-item prop="mobile" >
          <el-input
            class="mobile-input"
            type="number"
            :placeholder="t('mine.PhoneNumber')"
            v-model="ruleForm.mobile"
          >
            <template #prefix>
              <el-select
                :teleported="false"
                searchable
                class="area-code"
                v-model="ruleForm.areaCode"
                :placeholder="t('public.Select')"
              >
                <el-option
                  :label="`+${item.code} ${item.locale}`"
                  :value="`+${item.code}`"
                  v-for="item in newList"
                >
                  <span>{{ `${item.en} +${item.code}` }}</span>
                </el-option>
              </el-select>
            </template>
            <template #suffix v-if="VERIFY_MOBILE_CODE==='1'">
              <div
                class="verify-code"
                :class="{ 'forbidden-send': timer }"
                @click="sendSms"
              >
                <span class="is-bold fs-14">{{ t("mine.GetCode") }}</span>
                <span
                  class="is-bold fs-14 countdown-show"
                  v-show="count > 0 && timer"
                >({{ count }})</span
                >
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode" v-if="VERIFY_MOBILE_CODE==='1'">
          <el-input
            :placeholder="t('mine.EnterCodeVerification')"
            v-model="ruleForm.verifyCode"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :placeholder="t('mine.Password')"
            type="password"
            show-password
            v-model="ruleForm.password"
          />
        </el-form-item>
        <!--         v-if="IS_NEED_PROMOTE === '1'"-->
        <el-form-item prop="promoCode" v-if="IS_NEED_PROMOTE !== '2'">
          <el-input
            :placeholder="t('mine.InvitationCode')"
            v-model="ruleForm.promoCode"
          />
        </el-form-item>
        <section class="flex-box confirm-sign" @click="checked = !checked">
          <span class="fs-16 flex-box">
            <svg-icon :name="checked ? 'select' : 'default'"></svg-icon>
          </span>
          <span class="confirm-text">{{ t("mine.confirmText") }}</span>
        </section>
        <el-form-item>
          <el-button
            :disabled="isDisabled"
            @click="onSubmit"
            class="login-button"
            type="primary"
            >{{ t("mine.CreateAccount") }}</el-button
          >
        </el-form-item>
        <div class="is-have">
          <span>{{ t("mine.HaveAccount") }}</span>
          <span class="is-active" @click="pageTo('/login')">{{
            t("mine.SignIn")
          }}</span>
        </div>
      </el-form>
      <Verify :request="request"
        @success="success"
      mode="pop"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
      ></Verify>
    </div>
  </UserReusable>
</template>

<script setup>
import UserReusable from "../login/component/user-reusable.vue";
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Verify from "@/components/verifition/Verify.vue";
import {
  checkUsername,
  checkEmail,
  checkPassword,
  checkMobile,
  checkVerify,
} from "../../plugins/check";
import areaList from "@/assets/json/area.json";
import { $post } from "../../request";
import { isPromoCode } from "../../utils/validate";
import { useUserStore } from "../../store/user";
import { useVerify } from "../../hooks/verify";
import { useI18n } from "vue-i18n";
import { useConfig } from "../../hooks/platform";
import {dialogConfirm} from "../../components/custom-dialog";

const verify=ref(null);

const newList = computed(() => {
  const newList = areaList.sort(function (a, b) {
    if (a.en.toUpperCase() < b.en.toUpperCase()) {
      return -1;
    }
    if (a.en.toUpperCase() > b.en.toUpperCase()) {
      return 1;
    }
    return 0;
  });
  return newList;
});
const { t } = useI18n();
const {
  newState: { timer, count },
  startTimer,
  closeTimer,
} = useVerify();
const user = useUserStore();
const VITE_APP_AREA = import.meta.env.VITE_APP_AREA;
const router = useRouter();
const checked = ref(false);
const ruleFormRef = ref(null);
const route = useRoute();
const pageTo = (route) => {
  router.push(route);
};
/* 获取配置 */
const { IS_NEED_PROMOTE, getConfigValue, IS_NEED_MOBILE ,IS_AUTO,VERIFY_CODE,VERIFY_MOBILE_CODE} = useConfig();
// IS_NEED_PROMOTE 0 可选 1 必填 2 隐藏
// submit button disabled
const isDisabled = computed(() => {
  const { username, password, email, verifyCode } = ruleForm;
  return !username || !password  || !checked.value || (!verifyCode&&VERIFY_MOBILE_CODE.value==='1');
});
const ruleForm = reactive({
  username: "",
  email: "",
  password: "",
  areaCode: VITE_APP_AREA,
  mobile: "",
  promoCode: "",
  verifyCode: "",
});
const success=(params)=>{

}
// const useVerify=()=>{
//   this.$refs.verify.show()
// }
// validate of promo code
const checkPromo = (rule, value, cb) => {
  if (IS_NEED_PROMOTE.value !== "2") {
    if (IS_NEED_PROMOTE.value === "0") {
      if (!value) cb();
      else {
        if (isPromoCode(value)) cb();
        else cb(t("mine.PromoIncorrect"));
      }
    } else if (IS_NEED_PROMOTE.value === "1") {
      if (isPromoCode(value)) cb();
      else cb(t("mine.PromoIncorrect"));
    }
  } else cb;
};
const rules = reactive({
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  username: [{ required: true, validator: checkUsername, trigger: "blur" }],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  promoCode: [{ required: true, validator: checkPromo, trigger: "blur" }],
  mobile: [{ required: true, validator: checkMobile, trigger: "blur" }],
  verifyCode: [{ required: true, validator: checkVerify, trigger: "blur" }],
});
const onSubmit = () => {
  // request();
  if (ruleFormRef.value) {
    ruleFormRef.value.validate((v) => {
      if (v) {
       if(VERIFY_CODE.value==='1') verify.value.show()
        else request();
      }
    });
  }
};
const request =  (data,cb) => {

return new Promise(async (resolve)=>{
  const code = await user.REGISTER({ ...ruleForm ,...data});

  // code === 0 && router.replace("/");
  if(code===0){
    if(IS_AUTO.value!=='0') router.replace("/");
    else{
      dialogConfirm(t('extra.registerTip'), t("mine.profile.Reminder"), {
        showCancelButton: true,
        confirmText:t('extra.join')
      }).then(() => {
        router.replace({name:"promote"});
      }).catch(()=>{
        router.replace("/");
      })
    }
  }
  // console.log(code);
  resolve(code)
})

};
// 发送验证码 （邮箱）
// const sendSms = async () => {
//   if (ruleFormRef.value) {
//     ruleFormRef.value.validateField("email", (v) => {
//       if (v) {
//         startTimer();
//         user.GET_EMAIL_CODE({ email: ruleForm.email });
//       }
//     });
//   }
// };
// 手机号 验证码发送
const sendSms = async () => {
  const {areaCode,mobile}=ruleForm
  if (ruleFormRef.value) {
    ruleFormRef.value.validateField("mobile", async (v) => {
      if (v) {
        startTimer();
        const res = await user.GET_MOBILE_CODE({ areaCode,mobile });
        if (res.code !== 0) {
          closeTimer()
        }
      }
    });
  }
};
onMounted(() => {
  const { promoCode } = route.query;
  const env = import.meta.env.MODE;
  if (env === "development") {
    ruleForm.username = "owen001";
    ruleForm.password = "owen001";
    ruleForm.email = "owen001@gmail.com";
    ruleForm.areaCode = VITE_APP_AREA;
    ruleForm.mobile = "09616738888";
    ruleForm.promoCode = promoCode;
  }
  if(promoCode) ruleForm.promoCode=promoCode
  // setTimeout(()=>{
  //   verify.value.show()
  // })
});
</script>

<style lang="scss" scoped>
@import "../login/style";
.confirm-sign {
  width: 100%;
  margin-bottom: 40px;
  cursor: pointer;
}
.confirm-text {
  font-size: 12px;
  word-break: break-word;
  color: #8e99b6;
  margin-left: 19px;
  flex: 1;
  //white-space: wrap;
  width: 388px;
  line-height: 20px;
}
.is-have {
  margin-top: 60px;
  margin-top: 40px;
  font-size: 18px;
  color: #fff;
  text-align: center;
}
.verify-code {
  position: relative;
  z-index: 1;
  cursor: pointer;
  color: $main-color;
  border: none;
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
.mobile-input {
  :deep(.el-input__wrapper) {
    .el-input__inner {
      padding-left: 120px;
    }
  }
}
.el-button.is-disabled {
  opacity: 0.3 !important;
  border: none !important;
  border-color: none !important;
  //background: #11b85a !important;
}
</style>
