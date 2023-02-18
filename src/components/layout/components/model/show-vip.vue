<template>
  <div
    v-show="isLogin"
    class="show-vip flex-box"
    @click="pageTo({ routes: 'vip' })"
  >
    <span class="icons-icon">
      <img v-realImg="USER_VIP_ICON?.icon" alt="" />
      <!--      <svg-icon :name="info.levelId - 1"></svg-icon>-->
    </span>
    <div class="vip-header flex-box">
      <span class="header-text fs-12 flex-box-between">
        <span>{{ t("new.currentProgress") }}</span>
        <svg-icon name="top-right"></svg-icon>
      </span>
      <div class="vip-progress">
        <div
          class="current-progress"
          :style="{
            width: `${
              ((+vipInfo.score - vipInfo.scoreUpgradeMin * 1) /
                (+vipInfo.scoreUpgradeMax - vipInfo.scoreUpgradeMin * 1)) *
              100
            }%`,
          }"
        ></div>
      </div>
      <p class="flex-box progress-number">
        <span class="fs-12"
          >{{ +vipInfo.score - vipInfo.scoreUpgradeMin * 1 }} /
          {{ +vipInfo.scoreUpgradeMax - vipInfo.scoreUpgradeMin * 1 }}
        </span>
      </p>
    </div>

    <!--    <div class="fs-12 flex-box is-center">0/2800</div>-->
  </div>
</template>

<script setup>
import { useUserStore } from "../../../../store/user";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const user = useUserStore();
const USER_VIP_ICON = computed(() => user.USER_VIP_ICON);
const info = computed(() => user.info);
const isLogin = computed(() => user.isLogin);
const vipInfo = computed(() => user.vipInfo);
const props = defineProps({
  pageTo: {
    type: Function,
  },
});
</script>

<style lang="scss" scoped>
.show-vip {
  background: #2b3547;
  border-radius: 4px;
  padding: 3px 10px 3px;
  color: #8e99b6;
  margin: 0 0 13px 15px;
  cursor: pointer;
  .icons-icon {
    font-size: 33px;
    img {
      width: 33px;
    }
  }
  .vip-header {
    font-size: 28px;
    flex-direction: column;
    margin-left: 10px;
    .header-text {
      width: 100%;
      text-align: left;
      margin-bottom: 6px;
    }
    .progress-number {
      margin-top: 3px;
    }
  }
  .vip-progress {
    height: 4px;
    background: #1a212a;
    border-radius: 4px;
    width: 112px;
    //margin: 15px 0 18px;
    overflow: hidden;
    .current-progress {
      width: 0%;
      height: 100%;
      background: $main-color;
      animation: widthMoveRight 1s linear forwards;
    }
  }
}
</style>
