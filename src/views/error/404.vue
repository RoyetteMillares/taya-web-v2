<template>
  <div class="bg">
    <div>

      <div class="logo">
        <router-link to="/">
          <img  :src="PLAT_LOGO" alt="" />
        </router-link>
      </div>

      <img class="f404" src="../../assets/images/error/f404.png" alt="" />

      <p>
        {{t("additional.errorTips01")}}
      </p>
      <p>
        {{t("additional.errorTips02")}}
      </p>

      <router-link style="text-decoration: none !important;" to="/">
        <div class="btn">
          {{t("additional.Back2Home")}}
        </div>
      </router-link>

<!--      <div class="official">-->
<!--        {{t("additional.OfficialPartner")}}-->
<!--      </div>-->
<!--      <div class="flex-box">-->
<!--        <li class="sponsor-list flex-box" v-for="item in Sponsor" :key="item">-->
<!--          <svg-icon :name="item"></svg-icon>-->
<!--        </li>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { useConfig } from "@/hooks/platform";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { PLAT_LOGO } = useConfig();
const Sponsor = ["digitain", "leap", "Sponsor"];
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  //padding-top: 58px;
  object-fit: cover;
  -o-object-fit: cover;
  background-size: cover;
  //background-size: 100%;
  //background-position: 0 0;
  //background-repeat: no-repeat;
  //background-image: url("@/assets/images/error/bg.png");
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    display: block;
    height: 39px;
    //margin: -58px auto;
    margin: 0px auto;
    text-align: center;
    position: relative;
    z-index: 10;
    cursor: pointer;
    img {
      height: 39px;
    }
  }
  .f404 {
    display: block;
    //height: 494px;
    //height: 324px;
    height: 224px;
    margin: 0 auto;
  }
  p {
    width: 664px;
    font-size: 18px;
    text-align: center;
    color: #8e99b6;
    line-height: 26px;
    margin: 0 auto;
  }
  .btn {
    width: 130px;
    height: 34px;
    margin: 50px auto 69px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #34B8D5;
    border-radius: 17px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }
  .official {
    font-size: 16px;
    font-weight: normal;
    color: #ffffff;
    text-align: center;
    margin-bottom: 22px;
  }
  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .sponsor-list {
      width: 61px;
      height: 61px;
      font-size: 61px;
      margin-right: 42px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
