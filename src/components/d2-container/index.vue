<template>
<div class="d2-container">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.d2-container{
  width: $main-width;
  margin: 0 auto;
}
</style>
