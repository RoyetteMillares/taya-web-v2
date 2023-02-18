<template>
  <section id="" class="layout-view">
    <v2-header></v2-header>
<!--    <LayoutHeader @search="globalSearch" />-->
    <section class="v-content">
      <router-view :key="routerKey" v-slot="{ Component, route }">
        <transition name="fade-transverse" mode="out-in" appear>
          <component :key="route.path" :is="Component" />
        </transition>
      </router-view>
    </section>

<!--    <section class="flex-box main-layout">-->
<!--      <section class="section-left">-->
<!--        <LayoutRoutes />-->
<!--      </section>-->
<!--      <section class="section-right">-->
<!--        <LayoutHeader @search="globalSearch" />-->
<!--        <LayoutNotice />-->
<!--        <LayoutBread />-->
<!--        <LayoutContent />-->
<!--      </section>-->
<!--    </section>-->
    <LayoutFooter />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { provide, reactive, defineAsyncComponent } from "vue";
const route = useRoute();
const routerKey = computed(() => route.fullPath);
const state = reactive({
  callback: null,
});
const LayoutFooter = defineAsyncComponent(() =>
  import("./components/layout-footer.vue")
);
const LayoutRoutes = defineAsyncComponent(() =>
  import("./components/layout-routes.vue")
);
const V2Header=defineAsyncComponent(()=> import("../v2-header/index.vue"))

// use the function of children and transfer the params to child components
const globalSearch = (val) => {
  if (state.callback) state.callback(val);
};
// get the callback function from child components
const getSearchFunction = (callback) => {
  state.callback = callback;
};
provide("global", {
  getSearchFunction,
});
</script>

<style lang="scss" scoped>
@import "style";
.v-content{
  min-height: 1000px;
  padding-bottom: 50px;
}
</style>
