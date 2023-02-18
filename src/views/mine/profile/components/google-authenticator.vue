<template>
  <section>
    <!--    unset-->
    <section>
      <div class="flex-box google-show">
        <qrcode-vue
          id="canvasDom"
          background="#f2f2f2"
          :value="googleInfo.qrCode"
          :size="120"
          level="H"
          class="show-code"
        />
        <div class="show-text">
          <p>{{t('mine.profile.ToActivate')}}</p>
          <div class="show-value" @click="copy(googleInfo.secret)">
            <span>{{t('mine.profile.KeyValue')}}</span>
            <span class="ml-5">{{ googleInfo.secret }}</span>
          </div>
        </div>
      </div>
      <el-button @click="nextStep" class="dialog-button" type="primary">
        {{t('mine.profile.NextStep')}}
      </el-button>
    </section>
    <!--    next step-->
    <section></section>
  </section>
  <!--  -->
</template>

<script setup>
import QrcodeVue from "qrcode.vue";
import { useUserStore } from "../../../../store/user";
import { computed, onMounted, reactive } from "vue";
import { $post } from "@/request";
import { copy } from "../../../../utils";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  openInputAuth: {
    type: Function,
  },
  googleInfo: {
    type: Object,
  },
});
const user = useUserStore();
const info = computed(() => user.info);
const state = reactive({
  // googleInfo: {},
});
const getCode = () => {
  $post("createGoogleCode").then((res) => {
    if (res.code === 0) {
      state.googleInfo = res.data;
    }
  });
};
const nextStep = () => {
  props.openInputAuth();
};
onMounted(() => {
  // getCode();
});
</script>

<style lang="scss" scoped>
.google-show {
  background: #232a33;
  border-radius: 8px;
  padding: 20px;
  .show-code {
    background: #2b3547;
    border-radius: 4px;
    margin-right: 22px;
  }
  .show-text {
    color: $main-text-color;
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    .show-value {
      color: $main-color;
      margin-top: 16px;
      cursor: pointer;
    }
  }
}
.dialog-button {
  height: 50px;
  border-radius: 25px;
  font-size: 22px;
  margin-top: 60px;
  width: 393px;
}
</style>
