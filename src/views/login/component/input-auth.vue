<template>
  <custom-dialog
    @confirm="confirm"
    :before-close="beforeClose"
    :title="title"
    :showFooter="false"
    v-model="showVisible"
    
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
        <p class="form-label fs-14">{{ t('mine.CodeVerification') }}</p>
        <el-form-item prop="googleCode">
          <el-input
            :placeholder="t('mine.CodeVerification')"
            v-model="ruleForm.googleCode"
          />
        </el-form-item>
        <p class="code-of-tips fs-14">{{ t('mine.SixdigitCodeToVerify') }}</p>
      </el-form>
      <el-button @click="confirm" class="dialog-button" type="primary">
        {{ t('public.Submit') }}
      </el-button>
    </section>
  </custom-dialog>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import { checkGoogleCode } from "../../../plugins/check";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  modelVisible: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  params: {
    type: Object,
    default: {},
  },
  login: {
    type: Function,
  },
});
const ruleFormRef = ref(null);
const showVisible=computed({
  get(){
    return props.modelVisible
  },
  set(val){
    emit("update:modelValue",val)
  }
})
const emit = defineEmits(["update:modelValue"]);
const beforeClose = () => {
  emit("update:modelValue", false);
};
const ruleForm = reactive({
  googleCode: "",
});
const rules = reactive({
  googleCode: [{ required: true, validator: checkGoogleCode, trigger: "blur" }],
});
const confirm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate((v) => {
      if (v) {
        const data = { ...props.params, ...ruleForm };
        props.login(data);
        // beforeClose();
      }
    });
  }
  // console.log(9999);
};
</script>

<style lang="scss" scoped>
@import "../style";
.demo-ruleForm {
  color: #8e99b6;
  text-align: left;
  .form-label {
    text-align: left;
    margin-bottom: 13px;
  }
  // .code-of-tips {
  //   //margin-bottom: 100px;
  // }
  :deep(.el-input__suffix-inner) {
    display: none;
  }

  :deep(.el-input) {
    height: 40px;
  }
}
.dialog-button {
  height: 50px;
  border-radius: 25px;
  font-size: 22px;
  margin-top: 100px;
  width: 393px;
}
</style>
