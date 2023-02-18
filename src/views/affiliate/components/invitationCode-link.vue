<template>
    <div class="copy-box">
      <div class="item left">
        <p class="text">{{ t("affiliate.invitationCodeLink.InvitationCode") }}</p>
        <span @click="handleCopy(InvitationCode, 'Invitation Code')">{{InvitationCode}}</span>
        <div @click="handleCopy(InvitationCode, 'Invitation Code')" class="copy-btn">
          <svg-icon class="icon" name="copy"></svg-icon>
        </div>
      </div>
      <div class="item">
        <p class="text">{{ t("affiliate.invitationCodeLink.InviteLink") }}</p>
        <span @click="handleCopy(InviteLink, 'Invite Link')">{{InviteLink}}</span>
        <div class="copy-btn"
        @click="handleCopy(InviteLink, 'Invite Link')"
        >
          <svg-icon class="icon" name="copy"></svg-icon>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import { ElMessage } from "element-plus";
import { hasData, copy } from "@/utils";
import { useUserStore } from "@/store/user.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const user = useUserStore();
const userInfo = computed(() => user.info);
const InvitationCode = ref("2782012")
const InviteLink = ref("")

const handleCopy = async (val, label) => {
  await copy(val);
  // if (hasData(label)) {
  //   const message = `${label} copied to clipboard successfully`;
  //   ElMessage.success(message);
  // }
};

onMounted(async() => {
  await user.GET_USER_PROFILE();
  InvitationCode.value = userInfo.value?.promoCode;
  InviteLink.value = `${window.location.origin}/register?promoCode=${userInfo.value?.promoCode}`;
});
</script>

<style lang="scss" scoped>
.copy-box {
  height: 60px;
  margin: 20px 0 40px;
  background: #1a212a;
  border-radius: 12px;
  display: flex;
  .item {
    display: flex;
    align-items: center;
    &.left {
      margin: 0 102px 0 50px;
    }
    p {
      font-size: 12px;
      font-weight: normal;
      text-align: left;
      color: #ffffff;
      line-height: 33px;
    }
    span {
      font-size: 18px;
      font-weight: normal;
      color: $main-color;
      line-height: 33px;
      display: block;
      margin: 0 14px 0 10px;
    }
    .copy-btn {
      cursor: pointer;
      .svg-icon {
        width: 18px;
        height: 18px;
        width: 14px;
        height: 14px;
        color: #8e99b6 !important;
      }
    }
  }
}
</style>
