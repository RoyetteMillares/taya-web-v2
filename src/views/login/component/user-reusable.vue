<template>
  <div class="reusable-page flex-box">
    <div class="show-partner flex-box-between">
      <section>
<!--        <img class="login-logo" :src="PLAT_LOGO" alt="" />-->
<!--        <p class="welcome-text">{{ t("mine.WelcomeTo") }} {{ websiteName }}</p>-->
      </section>
      <!--      <section class="flex-box all-sponsor">-->
      <!--        <span>{{ t("mine.OfficialPartners") }}</span>-->
      <!--        <li class="show-sponsor" v-for="item in Sponsor" :key="item">-->
      <!--          <svg-icon :name="item"></svg-icon>-->
      <!--        </li>-->
      <!--      </section>-->
    </div>
    <div class="left-edit">
      <div @click="pageTo('/')" class="to-home flex-box is-center">
        <svg-icon name="home"></svg-icon>
      </div>
<!--      <p class="wel-text">{{ t("mine.WelcomeTo") }} {{ websiteName }}</p>-->
      <div  class="flex-box is-center cursor">
        <img  @click="pageTo('/')" class="login-logo-top" :src="PLAT_LOGO" />
      </div>

      <p class="user-title">{{ title }}</p>
      <slot></slot>
    </div>


  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useConfig } from "../../../hooks/platform";

const { PLAT_LOGO } = useConfig();
const { t } = useI18n();
const router = useRouter();
const Sponsor = ["digitain", "leap", "Sponsor"];
const websiteName = import.meta.env.VITE_APP_TITLE;
const props = defineProps({
  title: {
    type: String,
  },
});
const pageTo = (route) => {
  router.push(route);
};
</script>

<style lang="scss" scoped>
.login-logo-top{
  width: 120px;
  margin: 20px 0px 20px 0px;
}
.reusable-page {
  width: 100%;
  height: 100vh;
  background: url(@/assets/images/common/bg.jpg) no-repeat center center;
  background-size: cover;
  align-items: flex-end;
  background-attachment: fixed;
  .left-edit {
    background: #112228;
    padding: 60px 52px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0px !important;
      height: 0px !important;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    &::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    .to-home {
      font-size: 22px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #0c2930;
      cursor: pointer;
    }
    .wel-text {
      color: $main-color;
      font-size: 30px;
      margin: 68px 0 60px;
    }
    .user-title {
      font-size: 40px;
      color: #fff;
    }
  }
  .show-partner {
    margin: 0 100px 167px 100px;
    flex: 1;
    .login-logo {
      height: 120px;
    }
    .welcome-text {
      margin-top: 24px;
      color: #fff;
      font-size: 26px;
    }
  }
}
.all-sponsor {
  color: #fff;
  font-size: 16px;
  .show-sponsor {
    font-size: 61px;
    margin-left: 22px;
  }
}
</style>
