<template>
  <ul v-show="titleList.length" class="show-bread flex-box fs-12">
    <li @click="pageTo('/')">{{ t("new.home") }}</li>
    <li
      @click="breadClick(item)"
      v-for="(item, i) in titleList"
      :key="item.name"
    >
      <span class="show-digit"> > </span>
      <span
        class="show-title"
        :class="{ 'is-active': i === titleList.length - 1 }"
        >{{ item }}</span
      >
    </li>
  </ul>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const titleList = computed(() => {
  let list = [];
  const {
    matched,
    meta: { title },
  } = route;
  const isArray = Array.isArray(title);
  if (title) list = isArray ? title : [title];
  return list;
});
const routeName = computed((item) => route.name);
const pageTo = (path) => {
  router.push(path);
};
const breadClick = (item) => {
  const { matched } = route;
  const list = matched[0]?.children.find((val) => val.meta?.title === item);
  const length = titleList.value.length;
  const last = titleList.value[titleList.value.length - 1];
  // console.log(list, matched, titleList.value.length);
  if (list) router.push({ name: list.name });
  // if (last !== item) router.back();
};
</script>

<style lang="scss" scoped>
.show-bread {
  color: $main-text-color;
  li {
    cursor: pointer;
    &:hover {
      .show-title {
        text-decoration: underline;
      }
    }
  }
  .show-digit {
    margin: 0 10px;
  }
  .is-active {
    color: $main-color;
    text-decoration: underline;
  }
}
</style>
