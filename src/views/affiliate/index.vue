<template>
  <div class="affiliate-page">
    <div v-if="getToken()">
<!--      <div class="page-title">-->
<!--        <svg-icon name="warning"></svg-icon>-->
<!--        <span>{{ t("affiliate.Notification") }}</span>-->
<!--      </div>-->
      <AffiliateBanner />
<!--      <InvitationCodeLink />-->
      <d2-container>
        <CommissionBetting />
        <CommissionDetails />
      </d2-container>

    </div>
    <div v-else>
      <AffiliateBannerWithout />
      <Affiliate />
    </div>
  </div>
</template>

<script setup>
import AffiliateBanner from "./components/affiliate-banner.vue";
import AffiliateBannerWithout from "./components/affiliate-banner-without.vue";
import CommissionBetting from "./components/commission-betting.vue";
import InvitationCodeLink from "./components/invitationCode-link.vue";
import CommissionDetails from "./components/commission-details.vue";
import Affiliate from "./components/affiliate.vue";
import { getToken } from "../../utils/permission";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
// import { computed, onMounted } from "vue";
// import { useUserStore } from "@/store/user";
// const userInfo = computed(() => user.info);
// const user = useUserStore();
// onMounted(() => {
//   user.GET_USER_PROFILE();
//   console.log(userInfo.value.role)
// });
</script>

<style lang="scss" scoped>
.affiliate-page {
  .page-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: normal;
    text-align: left;
    color: #11b85a;
    margin-top: 20px;
    margin-bottom: 10px;
    .point {
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 12px;
      border-radius: 50%;
      margin-right: 10px;
      background: #11b85a;
    }
  }
}
</style>
