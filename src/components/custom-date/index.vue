<template>
  <section class="flex-box custom-date">
    <span class="date-label is-bold fs-14">{{ label }}</span>
    <!--    <el-date-picker-->
    <!--      :teleported="false"-->
    <!--      class="custom-date"-->
    <!--      v-model="state.key"-->
    <!--      :format="VITE_APP_TIME_FORMAT"-->
    <!--      type="daterange"-->
    <!--      range-separator="-"-->
    <!--      :editable="false"-->
    <!--      :value-format="VITE_APP_TIME_FORMAT"-->
    <!--      :start-placeholder="startPlaceholder"-->
    <!--      :end-placeholder="endPlaceholder"-->
    <!--      @change="change"-->
    <!--    />-->
    <el-date-picker
      :clearable="false"
      :editable="false"
      @change="change"
      v-model="state.start"
      :format="VITE_APP_TIME_FORMAT"
      :value-format="VITE_APP_TIME_FORMAT"
      :teleported="false"
      :disabledDate="disabledDate"
      type="date"
      :placeholder="startPlaceholder"
    />
    <span class="range-separator is-bold fs-14">-</span>
    <el-date-picker
      :clearable="false"
      :editable="false"
      @change="change"
      v-model="state.end"
      :format="VITE_APP_TIME_FORMAT"
      :disabledDate="disabledDate"
      :value-format="VITE_APP_TIME_FORMAT"
      :teleported="false"
      type="date"
      :placeholder="endPlaceholder"
    />
  </section>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

const VITE_APP_TIME_FORMAT = import.meta.env.VITE_APP_TIME_FORMAT;
const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: [Array],
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: () => useI18n().t("public.start"),
  },
  startPlaceholder: {
    type: String,
    default: () => useI18n().t("new.start"),
  },
  endPlaceholder: {
    type: String,
    default: () => useI18n().t("public.EndDate"),
  },
});
const change = () => {
  const { start, end } = state;
  const startTime = new Date(`${start} 00:00:00`).valueOf() / 1000;
  const endTime = new Date(`${end} 23:59:59`).valueOf() / 1000;
  emit("update:modelValue", [startTime, endTime]);
  emit("change");
};
const state = reactive({
  key: [],
  start: "",
  end: "",
});
const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

const setDate = (date) => {
  if (date?.length === 2) {
    state.start = dayjs.unix(date[0]).format(VITE_APP_TIME_FORMAT);
    state.end = dayjs.unix(date[1]).format(VITE_APP_TIME_FORMAT);
  }
};

onMounted(() => {
  setDate(props.modelValue);
});

watch(
  () => props.modelValue,
  (newDate) => {
    setDate(newDate);
  }
);
</script>

<style lang="scss" scoped>
.custom-date {
  margin-right: 12px;
  .el-date-editor {
    --el-date-editor-width: 100px;
  }

  .date-label {
    color: $main-text-color;
    margin-right: 12px;
  }
  :deep(.el-input) {
    width: auto;
    .el-input__wrapper {
      //background: transparent;
      border-radius: 16px;
      width: 100px;
      height: 32px;
      padding: 9px 13px;
      box-sizing: border-box;
      box-shadow: 0 0 0 1px #232a33 inset;
      background: $main-input-bg;
      //&:focus {
      //  box-shadow: 0 0 0 1px $main-color inset;
      //}
      .el-range-separator {
        flex: unset;
        margin: 0 5px;
      }
      .el-input__prefix {
        display: none;
      }
      .el-input__inner {
        &::placeholder {
          color: $main-text-color;
        }
      }
    }
    .is-focus {
      box-shadow: 0 0 0 1px $main-color inset !important;
    }
  }

  :deep(.el-date-editor) {
    //box-shadow: 0 0 0 1px transparent inset;
    .el-range__icon {
      display: none;
    }
    .el-range__close-icon {
      display: none;
    }
    .el-range-input {
      background: $main-input-bg;
      border-radius: 16px;
      //width: 86px;
      height: 32px;
      font-size: 14px;
      color: $main-text-color;
      padding: 5px 12px;
      box-sizing: border-box;
    }
    .el-range-separator {
      color: $main-text-color;
    }
  }

  :deep(.el-date-table-cell) {
    &:hover {
      background: $main-color;
      color: #fff;
    }
  }
  .range-separator {
    margin: 0 8px;
    color: $main-text-color;
  }
  :deep(.el-popper) {
    //--el-bg-color-overlay: #2b3547;
    .el-picker-panel__icon-btn {
      color: $main-text-color;
    }
    .disabled {
      .el-date-table-cell {
        background: rgba(52, 184, 213,.2);

        .el-date-table-cell__text {
          color: #495572;
        }
      }
    }

    //--el-datepicker-icon-color: #000;
  }
}
</style>
