<template>
  <section class="flex-box">
    <span class="show-label is-bold">{{ label }}</span>
    <el-select
      :filterable="filterable"
      :placeholder="placeholder"
      class="custom-select"
      :teleported="false"
      @change="change"
      v-model="state.key"
    >
      <el-option
        v-for="item in statusList"
        :label="item.title"
        :value="item.code"
        :key="item.code"
      ></el-option>
    </el-select>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  statusList: {
    type: [Array, Object],
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    // default: "Please select",
    default: () => useI18n().t("new.select"),
  },
  filterable: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  key: "",
});
const change = () => {
  emit("update:modelValue", state.key);
};
</script>

<style lang="scss" scoped>
.show-label {
  margin-right: 12px;
  color: $main-text-color;
  font-size: 14px;
}
.custom-select {
  min-width: 100px;
  max-width: 150px;
  --el-border-color-hover: $main-color;
  --el-bg-color-overlay: #182226;
  --el-fill-color-light:#213539;
  :deep(.el-input__wrapper) {
    background: $main-input-bg;
    border-radius: 16px;
    box-shadow: 0 0 0 1px #1a212a inset;

    input {
      text-align: center;
    }
  }
  :deep(.el-input__suffix) {
    //display: none;
  }
}
</style>
