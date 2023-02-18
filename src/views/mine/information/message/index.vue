<template>
  <section class="information-message">
    <ul class="info-header flex-box">
      <li
        @click="changeName(item)"
        class="flex-box header-item is-center"
        :class="{ 'header-item-active': item.value === state.name }"
        v-for="item in noticeTitleList"
        :key="item.value"
      >
        <span>{{ item.label }}</span>
        <span class="show-unread" v-show="item.num > 0">{{ item.num }}</span>
      </li>
    </ul>
    <!--    message-content-->
    <div class="message-edit flex-box-between">
      <div class="flex-box delete-item" @click="deleteAll">
        <svg-icon name="delete"></svg-icon>
        <span class="delete-text">{{t('mine.information.DeleteAll')}}</span>
      </div>
      <span class="read-all" @click="readAsAll">{{t('mine.information.MarkAllAsRead')}}</span>
    </div>
    <ul class="message-content">
      <ItemComponent v-for="item in 10" :item="item" />
    </ul>
    <customPagination
      @handleCurrentChange="handleCurrentChange"
      :total="state.total"
      v-model:size="state.size"
      v-model:page="state.page"
    />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { dialogConfirm } from "../../../../components/custom-dialog";
import ItemComponent from "../components/item-component.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const noticeTitleList = [
  { label: t('mine.information.Notice'), value: "Notice", num: 0 },
  { label: t('mine.information.Bulletin'), value: "Bulletin", num: 0 },
  { label: t('mine.information.Information'), value: "Information", num: 12 },
];
const state = reactive({
  name: t('mine.information.Notice'),
  page: 1,
  total: 30,
  size: 10,
});
const changeName = (item) => {
  state.name = item.value;
};
const handleCurrentChange = () => {};
const deleteAll = () => {
  dialogConfirm( t('mine.information.sureDleteAll'), t('mine.information.Reminder') ).then(
    () => {}
  );
};
const readAsAll = () => {
  dialogConfirm( t('mine.information.sureMarkAll'), t('mine.information.Reminder') ).then(() => {});
};
</script>

<style lang="scss" scoped>
.information-message {
  margin: 30px 0;
  color: $main-text-color;

  .info-header {
    .is-active {
      background: $main-color !important;
      color: #fff;
    }
    .header-item {
      height: 32px;
      background: #1a212a;
      border-radius: 16px;
      min-width: 106px;
      margin-right: 22px;
      font-size: 14px;
      padding: 11px 12px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        @extend .is-active;
      }
      &-active {
        @extend .is-active;
      }
      &:last-child {
        margin-right: 0;
      }
      .show-unread {
        background: #e75353;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        padding: 1px 5px;
        margin-left: 6px;
      }
    }
  }
  .message-edit {
    margin-top: 30px;
    .delete-item {
      font-size: 16px;
      cursor: pointer;
      .delete-text {
        font-size: 14px;
        margin-left: 8px;
      }
    }
    .read-all {
      font-size: 14px;
      color: $main-color;
      cursor: pointer;
    }
  }
  .message-content {
    margin-bottom: 40px;
  }
}
</style>
