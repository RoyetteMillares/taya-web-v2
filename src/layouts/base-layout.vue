<script setup>
import { useSlots } from "vue";
import useSEO from "@/hooks/useSEO.js";
useSEO();
const slots = useSlots();
</script>

<template>
  <div id="base-layout" class="">
    <slots.default />
  </div>
</template>

<style lang="scss" scoped></style>
