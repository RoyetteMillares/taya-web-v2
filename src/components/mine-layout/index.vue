<template>
  <div class="layout-view ">
    <v2-header></v2-header>
    <d2-container class="flex-box mine-view layout-view">
      <section class="section-left">
        <LayoutAside />
      </section>
      <section class="section-right is-info">
<!--        <LayoutBread />-->
        <LayoutContent />
      </section>
    </d2-container>
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<script setup>

import { defineAsyncComponent } from "vue";
// import LayoutAside from "./components/layout-aside.vue";
import LayoutBread from "../layout/components/layout-bread.vue";
import LayoutContent from "../layout/components/layout-content.vue";
const LayoutFooter = defineAsyncComponent(() =>
  import("../layout/components/layout-footer.vue")
);
// import LayoutFooter from "../layout/components/layout-footer.vue";

const LayoutAside = defineAsyncComponent(() =>
  import("./components/layout-aside.vue")
);
const V2Header =defineAsyncComponent(()=>import("../v2-header/index.vue"))
</script>

<style lang="scss" scoped>
@import "../layout/style";
.mine-view {
  margin-top: 40px;
  align-items: flex-start;
}
</style>
