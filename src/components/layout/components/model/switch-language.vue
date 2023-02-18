<template>
  <div class="switch-language cursor flex-box">
    <div
      @click="state.isShow = !state.isShow"
      class="flex-box-between show-language"
    >
      <span class="fs-14 mr-26">{{ getTitle.title }}</span>
      <div class="flex-box">
        <svg-icon v-if="getTitle.code" :name="getTitle.code"></svg-icon>
        <span
          :class="{ 'trans-icon-active': state.isShow }"
          class="fs-12 ml-5 flex-box trans-icon"
        >
          <svg-icon name="lan-right"></svg-icon>
        </span>
      </div>
    </div>
    <transition name="fade-scale">
      <ul class="language-list" v-show="state.isShow">
        <li
          @click="changeLanguage(item)"
          :class="{ 'language-item-active': item.code === state.lang }"
          class="language-item flex-box-between fs-16"
          v-for="item in languageList"
        >
          <span class="fs-14">{{ item.title }}</span>
          <svg-icon :name="item.code"></svg-icon>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { useAppStore } from "../../../../store/app";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

// const { getConfigValue } = useConfig();
const state = reactive({
  lang: locale.value,
  isShow: false,
});
const app = useAppStore();
const config = computed(() => app.config); // init 配置文件
const dictionary = computed(() => app.dictionary);

const getDirection = (key) => {
  let value = [];
  try {
    value = dictionary.value[key];
  } catch (e) {}
  return value;
};
const getTitle = computed(() => {
  let label = {};
  try {
    if (languageList.value) {
      label = languageList.value.find(
        (item) => item.code == state.lang.toString()
      );
    }
  } catch (e) {
    label = {};
  } finally {
    return label ? label : {};
  }
});
const languageList = computed(() => {
  const configLanguage = getConfigValue("lang");
  let list = [];
  list = list.concat(getDirection("dic_lang") || []);
  return list.filter((item) => configLanguage.includes(item.code));
});
const changeLanguage = (item) => {
  state.lang = item.code;
  state.isShow = false;
  locale.value = item.code;
};
const getConfigValue = (code) =>
  config.value.find((item) => item.title === code)?.value ?? "";
</script>

<style lang="scss" scoped>
.switch-language {
  //margin: 13px 13px 0;
  position: relative;
  width: 148px;
  box-sizing: border-box;
  .show-language {
    width: 100%;
    padding: 5px 5px 5px 16px;
    background: #152227;
    border: 1px solid #1a222f;
    border-radius: 19px;
    color: $main-text-color;
    font-size: 24px;
    .mr-26 {
      margin-right: 26px;
    }
    .trans-icon {
      transition: all 0.3s;
      transform: rotate(0deg);
      &-active {
        transform: rotate(90deg);
      }
    }
  }
  .language-list {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    background: #152227;
    border-radius: 6px;
    padding: 8px 0;
    overflow: hidden;
    .language-item {
      padding: 8px 16px;
      cursor: pointer;
      color: #8e99b6;
      &:hover {
        background: #000;
      }
      &-active {
        background: $main-input-login-bg;
      }
    }
  }
}
</style>
