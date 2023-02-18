<!--底部组件-->
<template>
  <div class="layout-footer flex-box">
    <section class="left-logo">
      <img :src="PLAT_LOGO" alt="" />
    </section>
    <section class="footer-right">
      <img src="../../../assets/images/footer/footer.png" alt="">
      <p class="mt-20">{{ t('extra.footer') }}</p>
      <p class="copy-right">{{ t('extra.copyright') }}</p>
    </section>
    <SwitchLanguage />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import SwitchLanguage from "./model/switch-language.vue"
import {useConfig} from "../../../hooks/platform";
const {PLAT_LOGO} = useConfig();
/**
 * 由于pina初始化限制 所以需要动态引入 以及延迟引入  以保证 pina已挂载
 */
// import("../../../hooks/platform").then(({ useConfig }) => {
//
//   const config =useConfig() ;
//   // console.log(config.PLAT_LOGO.value,'useConfig');
//   PLAT_LOGO.value = config.PLAT_LOGO.value;
// });

const { t } = useI18n();
const router = useRouter();
const projectList = [
  {
    label: t("menu.sports"),
    key: "sport",
    list: [
      { label: t("menu.inPlay"), key: "inPlay" },
      { label: t("menu.Upcoming"), key: "upcoming" },
    ],
  },
  {
    label: t("menu.Casino"),
    key: "casino",
    list: [
      { label: t("menu.Live"), key: "live" },
      { label: t("menu.Slots"), key: "slots" },
    ],
  },
  {
    label: t("menu.liveChat"),
    key: "customer",
    disabled: true,
    list: [
      { label: t("menu.About"), key: "about" },
      { label: t("menu.Help"), key: "helpCenter" },
    ],
  },
];
const cryptoList = [
  "BTC",
  "ETH",
  "USDT",
  "U3",
  "LTC",
  "U2",
  "U1",
  "USDC",
  "TRON",
];
const Sponsor = ["digitain", "leap", "Sponsor"];
const pageTo = (item) => {
  // console.log(item);
  if (!item.disabled) router.push({ name: item.key });
};
</script>

<style lang="scss" scoped>
.layout-footer {
  justify-content: center;
  padding: 36px 0;
  color: #8e99b6;
  background: #061519;
  align-items: flex-start;
  min-height: 300px;
  .left-logo {
    margin-right: 111px;
    img {
      width: 115px;
    }
  }
  .footer-right {
    width: 728px;
    font-weight: 400;
    color: #374346;
    .game-match {
      color: #fff;
      font-size: 13px;
    }
    .game-name {
      color: #8e99b6;
      margin-top: 16px;
      cursor: pointer;
      &:hover {
        color: #fff;
        text-decoration: underline;
      }
    }
    .crypto-model {
      margin-top: 40px;
      .crypto-item {
        font-size: 40px;
        margin-right: 16px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .show-intro {
      line-height: 24px;
      font-size: 12px;
      margin-top: 20px;
    }
  }
}
.sponsor-list {
  font-size: 50px;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
}
.copy-right{
  margin-top: 43px;
}
</style>
