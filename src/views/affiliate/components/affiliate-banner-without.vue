<template>
  <div class="affiliate-banner-without">
    <d2-container>
      <div class="title is-bold">{{ t("affiliate.banner.agencyEarnings") }}</div>
      <p>
        {{ t("affiliate.banner.text") }}
      </p>
      <el-button  @click="pageTo('login')" class="primary-btn xis-bold" type="primary">
        {{ t("affiliate.banner.JoinAgent") }}
      </el-button>
    </d2-container>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const pageTo = (name) => {
  router.push({ name });
};
</script>

<style lang="scss" scoped>
.affiliate-banner-without {
  //margin-top: 30px;
  height: 500px;
  color: #FFFFFF;
  padding-left: 40px;
  background: url("./../../../assets/images/affiliate/ag-bg.png") no-repeat center center;
  background-size: cover;
  .title {
    padding-top: 120px;
    margin: 0px 0 12px 0px;
    font-size: 26px;
    font-weight: normal;
    color: #ffffff;
  }
  p {
    width: 463px;
    font-size: 14px;

    font-weight: normal;
    text-align: left;
    color: $main-color;
    line-height: 24px;
  }
  .primary-btn {
    //width: 148px;
    height: 46px;
    padding: 0 40px;
    margin-top: 128px;
    border-radius: 8px;
    background: $main-color;
    font-size: 22px;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
</style>
