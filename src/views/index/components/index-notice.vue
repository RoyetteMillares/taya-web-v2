<!--公告-->
<template>
  <div class="index-notice flex-box">
    <d2-container>
      <div class="flex-box layout-notice">
        <div class="notice-icon flex-box">
          <svg-icon name="broadcast"></svg-icon>
        </div>
        <div class="notice-content">
          <!--              @mouseenter="closeMove"
            @mouseleave="startMove"-->
          <div
            class="full-content flex-box"
            :style="{ animationDuration: `${animateTime}s` }"
            ref="content"
          >
            <div class="flex-box mr-10" v-for="item in noticeList" :key="item.id">
              <span class="is-bold">{{ item.title }} :</span>
              <span class="ml-5">{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </d2-container>
  </div>


</template>

<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  nextTick,
} from "vue";
import { useMessage } from "../../../store/message";
import { scrollTop } from "../../../utils";
const content = ref(null);
const message = useMessage();
const state = reactive({
  announcementList: [],
});
const noticeList = computed(() => message.noticeList);
let distance = 0;
let timer = null;
const startMove = () => {
  // console.log(content.value.clientWidth);
  // distance += 1;
  // const width = (content.value && content.value.clientWidth) || 0;
  // content.value.style.left = -distance + "px";
  // if (width - distance <= 500) distance = 0;
  // timer = window.requestAnimationFrame(startMove);
};
const animateTime = computed(() => {
  let time = 0;
  const distance = content.value?.clientWidth;
  if (distance && noticeList.value.length) {
    time = distance / 50 + 10;
  }
  return time;
});
onMounted(async () => {
  const { code, data } = await message.GET_NOTICE();
  code === 0 && data.length && content.value && startMove();
});
const closeMove = () => {
  window.cancelAnimationFrame(timer);
};
onBeforeUnmount(() => {
  // closeMove();
});
</script>

<style lang="scss" scoped>
.index-notice{
  background: $main-sub-bg;
  padding: 9px 0;
}
.layout-notice {
  color: #8e99b6;
  font-size: 13px;
  width: 100%;
  align-items: stretch;
  .notice-icon {
    font-size: 20px;
    margin-right: 8px;
    color: $main-color;
  }
  .notice-content {
    flex: 1;
    white-space: nowrap;
    padding: 0 3px;
    font-size: 13px;
    overflow: hidden;
    position: relative;
    .full-content {
      position: absolute;
      min-width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      //transition: all 10s;
      color: #B6C0C3;
      animation: move 0s linear infinite;
      animation-play-state: running;
      cursor: pointer;
      &:hover {
        animation-play-state: paused;
      }
    }
    .is-bold {
      font-weight: 400;
    }
  }
}
</style>
