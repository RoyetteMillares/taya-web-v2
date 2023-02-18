<template>
  <main-container class="component-item">
    <div class="header-item flex-box-between">
      <div class="flex-box">
        <span class="show-new" v-show="!item.isRead"></span>
        <p class="message-title is-hidden">
          {{ item.title }}
        </p>
      </div>
      <div class="check-button   fs-14" @click="pageTo(item)">
        <p class="message-time">{{ time(item.createdAt) }}</p>
        <p class="to-check">{{t('mine.information.Check')}}</p>

      </div>
    </div>
    <div class="message-content is-hidden">
      {{ item.content }}
    </div>

  </main-container>
</template>

<script setup>
import { time } from "../../../../utils/date-filter";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  item: {
    type: Object,
  },
  checkAsRead: {
    type: Function,
  },
});
const router = useRouter();

const pageTo = (item) => {
  if (!item.isRead) props.checkAsRead(item.id);
  router.push({ name: "detail" });
  sessionStorage.messageInfo = JSON.stringify(item);
};
</script>

<style lang="scss" scoped>
.component-item {
  margin-top: 20px;
  border-radius: 12px;
  background: #112228;
  .header-item {
    font-size: 22px;
    color: #fff;
    margin-bottom: 12px;
    align-items: flex-start;
    .show-new {
      width: 6px;
      height: 6px;
      background: $main-color;
      border-radius: 50%;
      margin-right: 10px;
    }
    .message-title {
      max-width: 800px;
    }
    .check-button {
      //width: 126px;
      //height: 40px;
      //background: #11b85a;
      //border-radius: 20px;
      color: #34B8D5;
      cursor: pointer;
      .to-check{
        margin-top: 24px;
      }

    }
  }
  .message-content {
    font-size: 16px;
    line-height: 18px;
    color: $main-text-color;
    max-width: 900px;
  }
  .message-time {
    color: $main-text-color;
    //margin-top: 20px;
    font-size: 12px;
  }
}
</style>
