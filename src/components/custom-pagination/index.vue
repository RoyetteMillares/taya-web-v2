<template>
  <div class="flex-box is-center" v-show="total >= size || page > 1">
    <el-pagination
      :page="page"
      :page-size="size"
      :small="false"
      :disabled="false"
      :prev-text="t('additional.Previous')"
      :next-text="t('additional.Next')"
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  page: {
    type: [Number, String],
  },
  size: {
    type: [Number, String],
  },
  total: {
    type: [Number, String],
  },
});
const emit = defineEmits(["handleCurrentChange"]);

const handleCurrentChange = (val) => {
  emit("handleCurrentChange", val);
};
</script>

<style lang="scss" scoped>
.flex-box {
  :deep(.btn-prev) {
    background: $main-color;
    width: 74px;
    height: 28px;
    border-radius: 4px;
    color: #fff;
    --el-pagination-button-disabled-bg-color: #000;
    &:disabled {
      background: #30373f;
      color: #8e99b6;
    }
    &:hover {
      color: #fff;
    }
  }
  :deep(.btn-next) {
    background: $main-color;
    width: 74px;
    height: 28px;
    border-radius: 4px;
    color: #fff;
    &:disabled {
      background: #30373f;
      color: #8e99b6;
    }
    &:hover {
      color: #fff;
    }
  }
  :deep(.el-pager) {
    .is-active {
      background: $main-color;
      color: #fff;
      font-size: 14px;
    }
    li {
      padding: 3px 7px;
      border-radius: 50%;
      background: transparent;
      margin: 0 6px;
      color: $main-text-color;
    }
  }
}
</style>
