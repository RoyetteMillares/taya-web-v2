<!--左侧导航栏-->
<template>
  <ul class="layout-routes">
    <li class="layout-logo flex-box is-center">
      <img @click="pageTo({ routes: 'sport' })" :src="PLAT_LOGO" alt="" />
    </li>
    <!--    sports-->
    <div class="show-bottom p-30">
      <li
        @click="pageTo(item)"
        :class="{
          'layout-items-active': item.active.includes(routeName),
          'layout-items-title': !item.icon,
        }"
        class="layout-items flex-box"
        v-for="item in firstMenu"
        :key="item.routes"
      >
<!--        <span class="left-icon flex-box" v-if="item.icon">-->
<!--          <svg-icon :name="item.icon"></svg-icon>-->
<!--        </span>-->
        <span class="routes-name is-bold">{{ item.label }}</span>
      </li>
    </div>
    <!--    Live -->
    <div class="show-bottom p-30">
      <li
        @click="pageTo(item)"
        :class="{
          'layout-items-active': item.active.includes(routeName),
          'layout-items-title': !item.icon,
        }"
        class="layout-items flex-box"
        v-for="item in secondMenu"
        :key="item.routes"
      >
<!--        <span class="left-icon flex-box" v-if="item.icon">-->
<!--          <svg-icon :name="item.icon"></svg-icon>-->
<!--        </span>-->
        <span class="routes-name is-bold">{{ item.label }}</span>
      </li>
    </div>

    <!--    -->
    <div class="show-bottom">
      <li
        v-for="item in middleMenu"
        :key="item.routes"
        @click="pageTo(item)"
        :class="{ 'layout-items-active': item.active.includes(routeName) }"
        class="layout-items routes-middle flex-box"
      >
<!--        <span class="left-icon flex-box">-->
<!--          <svg-icon :name="item.icon"></svg-icon>-->
<!--        </span>-->
        <span class="routes-name is-bold">{{ item.label }}</span>
      </li>
    </div>
    <SwitchLanguage />
  </ul>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import ShowVip from "./model/show-vip.vue";
import SwitchLanguage from "./model/switch-language.vue";
import { useI18n } from "vue-i18n";
import { useConfig } from "../../../hooks/platform";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const routeName = computed(() => route.name);
const { PLAT_LOGO } = useConfig();
const firstMenu = [
  { label: t("menu.sports"), routes: "sport", active: "sport" },
  {
    label: t("menu.inPlay"),
    routes: "inPlay",
    icon: "Inplay",
    active: "inPlay",
  },
  {
    label: t("menu.Upcoming"),
    routes: "upcoming",
    icon: "Upcoming",
    active: "upcoming",
  },
  { label: t("menu.MyBet"), routes: "myBet", icon: "Mybet", active: "myBet" },
];
const secondMenu = [
  { label: t("menu.Casino"), routes: "casino", active: "casino" },
  {
    label: t("menu.Live"),
    routes: "live",
    icon: "Live Casino",
    active: "live",
  },
  { label: t("menu.Slots"), routes: "slots", icon: "Slots", active: "slots" },
  { label: t("menu.Turbo"), routes: "turbo", active: "turbo", icon: "turbo" },
];
const middleMenu = [
  {
    label: t("menu.Promotions"),
    routes: "promote",
    active: "promote,promote-detail",
    icon: "Promotions",
  },
  {
    label: t("menu.Affiliate"),
    routes: "affiliate",
    active: "affiliate",
    icon: "Affiliate",
  },
  {
    label: t("menu.Blog"),
    routes: "blog",
    active: "blog,blog-detail",
    icon: "blog",
  },
  {
    label: t("menu.Help"),
    routes: "helpCenter",
    active: "helpCenter,helpDetail",
    icon: "Help Center",
  },
  { label: t("menu.About"), routes: "about", active: "about", icon: "About" },
];
// const helperMenu = [
//   // { label: "Live Chat", routes: "liveChat", icon: "Live Chat" },
//   { label: "Help Center", routes: "helpCenter", icon: "Help Center" },
//   { label: "About", routes: "about", icon: "About" },
// ];

const pageTo = ({ routes }) => {
  routes && router.push({ name: routes });
};
</script>

<style lang="scss" scoped>
.layout-routes {
  width: 100%;
  .layout-logo {
    border-bottom: 1px solid #2d333c;
    padding: 23px 15px;
    cursor: pointer;
    img {
      height: 31px;
    }
  }
  .layout-items {
    padding: 11px 15px;
    cursor: pointer;
    position: relative;
    color: #8e99b6;
    transform-origin: center;
    &-title {
      color: #506088;
    }
    &:hover {
      color: #fff;
    }
    .left-icon {
      font-size: 14px;
      margin-right: 13px;
    }
    &-active {
      color: $main-color;
      &:hover {
        color: $main-color;
      }
      .routes-name,
      .left-icon {
        animation: zoomIn ease-in 0.2s forwards;
      }

      &:before {
        content: "";
        width: 3px;
        height: 11px;
        background: $main-color;
        border-radius: 2px;
        left: 0;
        top: 14px;
        position: absolute;
      }
    }
  }
  .routes-middle {
    padding: 11px 15px;
    //&:before {
    //  top: 33px;
    //}
  }
  .show-bottom {
    padding-bottom: 5px;
    position: relative;
    &:after {
      content: "";
      height: 1px;
      background: linear-gradient(135deg, #2d333c, rgba(45, 52, 60, 0));
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .routes-name {
      font-size: 14px;
    }
  }
  .p-30 {
    padding: 17px 0;
  }
}
</style>
