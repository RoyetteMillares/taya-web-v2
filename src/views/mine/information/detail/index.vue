<template>
  <main-container class="details-message">
    <div class="flex-box fs-14 title-message">
      <span>{{t('extra.current')}} : </span>
      <span @click="router.push({name:'information'})" class="ml-5 mr-5 cursor">{{t('mine.information.Information')}} > </span>
      <span class="is-white">{{t('routerTitle.Detail')}}</span>
    </div>
    <p class="title-info">{{ info.title }}</p>
    <section class="info-content">
      {{ info.content }}
    </section>
  </main-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
const {t}=useI18n()
const info = ref({});
const router=useRouter()
onMounted(() => {
  const messageInfo = sessionStorage.messageInfo;
  try {
    info.value = JSON.parse(messageInfo);
  } catch (e) {
    console.log(e);
  }
});
</script>

<style lang="scss" scoped>
.details-message {
  //margin: 0 0 100px;
  color: #fff;
  min-height: 500px;
  .title-info {
    padding-bottom: 30px;
    border-bottom: 1px solid #2d333c;
    font-size: 20px;
  }
  .info-content {
    margin-top: 20px;
    font-size: 14px;
    color: $main-text-color;
    line-height: 25px;
  }
  .title-message{
    font-weight: 400;
    text-align: left;
    color: #b6c0c3;
    margin-bottom: 13px;
  }
}
</style>
