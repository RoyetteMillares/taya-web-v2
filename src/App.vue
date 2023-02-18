<script setup>
import UnderMaintenance from "./components/under-maintenance/index.vue";
import { useUserStore } from "./store/user";
import {
  onMounted,
  watch,
  ref,
  computed,
  reactive,
  defineAsyncComponent,
} from "vue";
import { getToken } from "./utils/permission";
import { useAppStore } from "./store/app";
import { useSocket } from "./store/socket";
import { useI18n } from "vue-i18n";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import enUS from "element-plus/lib/locale/lang/en";
const BaseLayout = defineAsyncComponent(() =>
  import("./layouts/base-layout.vue")
);

const user = useUserStore();
const { t, locale } = useI18n();
const isShow = ref(true);
watch(
  () => locale.value,
  (val) => {
    // console.log(val, 999);
    loadLocale();
    changeShow();
  }
);
const changeShow = () => {
  // isShow.value = false;
  // setTimeout(() => {
  //   isShow.value = true;
  // }, 10);
  location.reload();
};
const loadLocale = () => {
  sessionStorage.lang = locale.value;
  document.documentElement.lang = locale.value;
};
const lang = computed(() => {
  const model = {
    zh: zhCn,
    en: enUS,
  };
  // const realLang = sessionStorage.lang || import.meta.env.VITE_APP_LOCAL;
  return model[locale.value];
});


onMounted(() => {
  useAppStore().GET_DICTIONARY();
  user.GET_VIP_INFO();
  loadLocale();
  if (getToken()) {
    user.GET_USER_PROFILE();
    user.GET_USER_VIP_INFO();
    useSocket().CONNECT_SOCKET();
  } else useAppStore().GET_CONFIG(); // 未登录
});
</script>

<template>
  <div id="full-page" class="full-page">
    <router-view v-if="isShow" v-slot="{ Component, route }">
      <!--      <transition name="fade-scale" mode="out-in">-->
      <BaseLayout>
        <el-config-provider :locale="lang">
          <component :is="Component" />
        </el-config-provider>
      </BaseLayout>

      <!--      </transition>-->
    </router-view>
    <UnderMaintenance />
  </div>
</template>

<style lang="scss" scoped>
.full-page {
  height: 100%;
  overflow-y: scroll;
}
</style>
