<template>
  <div class="main-container">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-container {
  background: $main-container-inner-bg;
  border-radius: 20px;
  padding: 20px;
}
</style>
