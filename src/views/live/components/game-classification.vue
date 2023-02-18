<template>
  <div class="flex-box" style="align-items: flex-start;">
    <ul class="game-classification flex-box">
      <li
        @click="changePlat(item)"
        :class="{ 'classification-item-active': item.id === modelValue }"
        class="flex-box is-center classification-item"
        v-for="item in platList"
      >
        <span class="is-bold fs-14">{{ item.name }}</span>
      </li>
    </ul>
    <div class="key-search">
      <!--       v-show="showSearch"-->
      <el-input
        v-model="state.keywords"
        size="large"
        :placeholder="t('public.EnterSearch')"
        @keyup.enter="globalSearch"
        @blur="globalSearch"
        :prefix-icon="Search"
      />
    </div>
  </div>

</template>

<script setup>
import {reactive} from "vue";
import { Search } from "@element-plus/icons-vue";
import {useI18n} from "vue-i18n";
const {t}=useI18n()
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  platList: {
    type: Array,
  },
});
const emit = defineEmits(["update:modelValue", "change",'searchKeyword']);
const changePlat = (val) => {
  emit("update:modelValue", val.id);
  emit("change", val.id);
};
const state=reactive({
  keywords:""
})
const globalSearch = () => {
  console.log(state.keywords);
  emit("searchKeyword", state.keywords);
};
</script>

<style lang="scss" scoped>
.game-classification {
  margin:0 0 15px 0;
  flex-wrap: wrap;
  flex: 1;
  .classification-item {
    border-radius: 8px;
    background: #213539;
    //min-width: 181px;
    color: #b6c0c3;
    font-size: 16px;
    padding: 12px 18px;
    box-sizing: border-box;
    margin: 0 20px 15px 0;
    cursor: pointer;
    &-active {
      background: $main-button-bg;
      color: #fff;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.key-search {
  :deep {
    --el-input-focus-border-color: $main-color;
    --el-input-border-color:#213539;
    --el-border-color:#213539;
    --el-input-hover-border-color: transparent;
    --el-input-border-radius: 20px;
    .el-input {
      background: #213539;
      border-radius: 20px;
      height: 40px;
      width: 168px;
      .el-input__wrapper {
        background: #213539;
        border-radius: 20px;
        &:hover {
          box-shadow: 0 0 0 1px  $main-color;
        }
        .el-input__inner {
          font-size: 16px;
          color: #fff;
          &::placeholder {
            font-size: 14px;
            color: #8e99b6;
          }
        }
      }
    }
  }
}
</style>
