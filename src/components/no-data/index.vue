<template>
  <div class="no-data is-center flex-box">
    <div class="empty-icon flex-box">
      <svg-icon :name="iconShow"></svg-icon>
    </div>
    <p class="empty-content">{{ text }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  // 无记录类型
  type: {
    type: String,
    default: "record",
  },

  text: {
    type: String,
    default: () => useI18n().t("bet.betrecord.NoRecords"),
  },
});
const iconShow = computed(() => {
  // 空数据类型
  const typeList = {
    record: "record-none", // 无 记录
    collection: "collection-none", // 无 收藏
    bet: "bet-none", //五 投注
    message: "message-none", // 无 信息
  };
  return typeList[props.type];
});
</script>

<style lang="scss" scoped>
.no-data {
  padding: 20px 0;
  .empty-icon {
    font-size: 100px;
    margin-right: 30px;
  }
  .empty-content {
    font-size: 14px;
    color: #8e99b6;
  }
}
</style>
