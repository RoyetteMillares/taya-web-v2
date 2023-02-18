<template>
  <div class="layout-content">
    <router-view :key="routerKey" v-slot="{ Component, route }">
      <transition name="fade-transverse" mode="out-in" appear>
        <component :key="route.path" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const routerKey = computed(() => route.fullPath);
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
}
</style>
