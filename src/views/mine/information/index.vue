<template>
  <section class="information-message">
    <p class="is-white mb-20 fs-18">{{t('extra.message')}}</p>
    <ul class="info-header flex-box-between">
      <section class="flex-box">
        <li
          @click="changeName(item)"
          class="flex-box header-item is-center"
          :class="{ 'header-item-active': item.code == state.category }"
          v-for="item in noticeTitleList"
          :key="item.value"
        >
          <span>{{ item.title }}</span>
          <span class="show-unread" v-show="+item.count > 0">{{
              item.count
            }}</span>
        </li>
      </section>
      <!--    message-content-->
      <div class="message-edit flex-box-between">
        <div
          class="flex-box delete-item"
          @click="deleteAll"
          v-show="state.messageList.length && state.category != 1"
        >
          <svg-icon name="delete"></svg-icon>
          <span class="delete-text">{{t('mine.information.DeleteAll')}}</span>
        </div>
        <span class="read-all" @click="readAsAll" v-if="state.messageList.length"
        >{{t('mine.information.MarkAllAsRead')}}</span
        >
      </div>
    </ul>

    <ul class="message-content">
      <ItemComponent
        :checkAsRead="checkAsRead"
        v-for="(item,index) in state.messageList"
        :item="item"
        :key="index"
      />
      <main-container class="mt-20" v-show="!state.messageList.length">
        <no-data
          type="message"
          :text="t('public.HaveNoMessages')"
          class="empty-tip"
        ></no-data>
      </main-container>

      <!--      <p class="show-empty" v-show="!state.messageList.length">No more data</p>-->
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
import { computed, onMounted, reactive } from "vue";
import { dialogConfirm } from "../../../components/custom-dialog";
import ItemComponent from "./components/item-component.vue";
import { useMessage } from "../../../store/message";
import { useDictionary } from "../../../hooks/dictionary";
import { $post } from "../../../request";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const { getDirection, getTitle } = useDictionary();
const message = useMessage();
const noticeCount = computed(() => message.noticeCount || []);
const titleList = computed(() => getDirection("dic_notice_category") || []);
const noticeTitleList = computed(() => {
  // const titleList = getDirection("dic_notice_category"); // 字典列表
  let list = [];
  const noticeCountList = message.noticeCountList || [];
  list = titleList.value.map((item) => {
    noticeCountList.forEach((val) => {
      if (item.code === val.category.toString()) {
        item.count = val.count;
      }
    });
    return item;
  });
  return list;
  // return [
  //   { label: "Notice", value: "Notice", num: 0 },
  //   { label: "Bulletin", value: "Bulletin", num: 0 },
  //   { label: "Information", value: "Information", num: 12 },
  // ];
});
const state = reactive({
  category: 1,
  page: 1,
  total: 0,
  size: 10,
  messageList: [],
});
const changeName = (item) => {
  state.category = item.code;
  state.page = 1;
  getMessageList();
};
const handleCurrentChange = (val) => {
  state.page = val;
  getMessageList();
};
const deleteAll = () => {
  dialogConfirm( t('mine.information.sureDleteAll'), t('mine.information.Reminder') ).then(
    async () => {
      const { code } = await message.DELETE_MESSAGE({
        category: state.category,
      });
      if (code === 0) getMessageList();
    }
  );
};
const readAsAll = () => {
  dialogConfirm( t('mine.information.sureMarkAll'), t('mine.information.Reminder') ).then(
    async () => {
      const { code } = await message.READ_MESSAGE({ category: state.category });
      if (code === 0) getMessageList();
    }
  );
};
const getMessageList = () => {
  const params = {
    current: state.page,
    size: state.size,
    data: { category: state.category },
  };
  $post("getMessageList", params).then((res) => {
    if (res.code === 0) {
      state.messageList = res.data.list;
      state.total = +res.data.total;
    }
  });
};
const checkAsRead = (id) => {
  // const { id } = item;
  message.READ_MESSAGE({ id });
};
onMounted(async () => {
  const { code, data } = await message.GET_NOTICE_COUNT();
  // console.log(code, data);
  if (code === 0 && data.length) state.category = data[0].category;
  getMessageList();
});
</script>

<style lang="scss" scoped>
.information-message {
  margin:0 0 30px 0;
  color: $main-text-color;

  .info-header {
    .is-active {
      background: $main-color !important;
      color: #fff;
    }
    .header-item {
      height: 32px;
      background: #253438;
      border-radius: 8px;
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
        .show-unread{
          color: #fff;
        }
      }
      &:last-child {
        margin-right: 0;
      }
      .show-unread {
        background: #8bddef;
        border-radius: 7px;
        //color: #B6C0C3;
        color: #fff;
        font-size: 12px;
        padding: 0 8px;
        margin-left: 6px;
      }
    }
  }
  .message-edit {

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
      color: #fff;
      background: #34b8d5;
      border-radius: 16px;
      padding: 4px 12px;
      margin-left: 30px;
      cursor: pointer;
    }
  }
  .message-content {
    margin-bottom: 40px;
    min-height: 400px;
    .show-empty {
      margin-top: 70px;
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>
