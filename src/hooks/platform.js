import { useAppStore } from "../store/app";
import { computed, toRefs } from "vue";
import defaultLogo from "@/assets/logo/logo.svg";
const app = useAppStore();
const config = computed(() => app.config);
/**
 * 注册是否需要邀请码
 */
const LOGIN_REGISTER = computed(() => {
  let config = {};
  try {
    config = JSON.parse(getConfigValue("register_login_config"));
  } catch (e) {
    config = {};
  } finally {
    return config;
  }
});
/**
 * 注册是否需要 邀请码
 */
const IS_NEED_PROMOTE = computed(() => {
  let value = "0";
  if (config.value.length) value = getConfigValue("registerInviteCode");
  return value;
});
/**
 * 注册是否需要 手机号码
 */
const IS_NEED_MOBILE = computed(() => {
  let value = "0";
  if (config.value.length) value = getConfigValue("registerMobile");
  return value;
});
/**
 * 平台logo
 */
const PLAT_LOGO = computed(() => {
  let value = defaultLogo;
  if (config.value.length) value = getConfigValue("platLogo");
  return value;
});
/**
 * 是否自动触发活动
 */
const IS_AUTO = computed(() => {
  let value = "1";
  if (config.value.length) value = getConfigValue("isAuto");
  return value;
});
/**
 * 是否需要验证码 （滑动）
 */
const VERIFY_CODE = computed(() => {
  let value = "1";
  if (config.value.length) value = getConfigValue("verifyCode");
  return value;
});
/**
 * 是否需要验证码 （手机号）
 */
const VERIFY_MOBILE_CODE = computed(() => {
  let value = "1";
  if (config.value.length) value = getConfigValue("verifyMobile");
  return value;
});
/**
 * 获取配置
 */
const getConfigValue = (code) =>
  config.value.find((item) => item.title === code)?.value ?? "";
export const useConfig = () => {
  return toRefs({
    getConfigValue,
    LOGIN_REGISTER,
    IS_NEED_PROMOTE,
    IS_NEED_MOBILE,
    PLAT_LOGO,
    IS_AUTO,
    VERIFY_CODE,
    VERIFY_MOBILE_CODE,
  });
};
