<template>
  <div class="empty-content">
    <div class="flex-box is-center none-icon">
      <svg-icon name="maintain"></svg-icon>
    </div>
    <p class="mt-20 fs-14 deposit-text">
      {{ t("additional.Maintenance") }}
    </p>
    <p class="tips-text fs-16">{{ t("additional.changeWay") }}</p>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.empty-content {
  width: 393px;
  height: 280px;
  background: $main-input-login-bg;
  border-radius: 8px;
  margin-top: 30px;
  text-align: center;
  padding-top: 1px;
  box-sizing: border-box;
  .deposit-text {
    color: #8e99b6;
  }
  .none-icon {
    font-size: 100px;
    margin-top: 40px;
    overflow: hidden;
  }
  .tips-text {
    color: $main-color;
    margin-top: 50px;
  }
}
</style>
