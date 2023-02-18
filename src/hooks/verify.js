/**
 * @author django
 * @description 获取邮箱验证码 以及倒计时
 */

import { computed, ref, reactive, onBeforeUnmount, toRefs } from "vue";
import { useUserStore } from "../store/user";
const user = useUserStore();
const countTime = 300;
const state = reactive({
  timer: null,
  count: countTime,
});
/**
 * 关闭倒计时
 */
const closeTimer = () => {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
};
/**
 * 开启倒计时
 */
const startTimer = () => {
  closeTimer();
  state.timer = setInterval(() => {
    if (state.count > 0) state.count--;
    else {
      closeTimer();
      state.count = countTime;
    }
  }, 1000);
};
/**
 * 赋值响应式给页面使用
 */
const newState = toRefs(state);
export const useVerify = () => {
  return {
    newState,
    startTimer,
    closeTimer,
  };
};
