import axios from "axios";
import apis from "./apis";
import { storage, clearToken, getToken } from "../utils/permission";
import { noLoading } from "../config";
import { deleteKey, trim } from "@/utils/index";
import router from "../router";
import qs from "qs";
import { useSocket } from "../store/socket";
import { useUserStore } from "../store/user";
import { ElLoading, ElMessage } from "element-plus";
import { customPopup } from "../components/custom-popup";
import { Encrypt } from "../utils/common";
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
import i18n from "../locales";
import { useAppStore } from "../store/app";
const t = i18n.global.t;

const instance = axios.create({
  timeout: 30000,
});

// 请求头配置
// axios.defaults.headers.post["Accept"] = "application/json";
// 请求拦截
let loading;
instance.interceptors.request.use(
  (config) => {
    if (getToken()) {
      let token = getToken() || "";
      config.headers.common["Authorization"] = "Bearer " + token;
    }
    config.headers.common["Accept-Language"] = sessionStorage.lang || "en";
    config.headers.common["Accept-Device"] = "d";
    if (!noLoading.includes(config.url)) {
      loading = ElLoading.service({
        lock: true,
        text: t("public.Loading"),
        background: "rgba(0, 0, 0, 0.7)",
        fullscreen: true,
      });
    }
    return config;
  },
  (error) => {
    loading.close();
    return Promise.reject(error);
  }
);
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (!noLoading.includes(response.config.url)) {
      loading.close();
    }
    const responseCode =
      response.data?.code?.toString() || response.data?.repCode.toString(); // 状态码
    // api请求错误提示
    if (responseCode !== "0" && responseCode !== "401") {
      if (response.data.msg) customPopup(response.data.msg);
    }
    if (responseCode === "401") {
      router.push(`/login`);
      clearToken();
    }

    return response.data;
  },
  (error) => {
    loading.close();
    // 断网或请求超时
    if (!error.response) {
      if (error.message.includes("timeout")) {
        customPopup(t("public.timeout"));
      } else {
        customPopup(t("public.RequestFail"));
      }
      return;
    }
    const errorCode = error.response.status;
    const errorData = error.response.data;
    switch (errorCode) {
      case 404:
        customPopup(t("public.NoRequest"));
        break;
      case 400:
        customPopup(errorData.msg);
        break;
      case 401:
        clearToken();
        useSocket().CLOSE_SOCKET();
        // const path = router.currentRoute.value.path
        router.push(`/login`);
        // clearToken()
        break;
      default:
        // ElMessage.error(errorData.msg);
        break;
    }
    return Promise.reject(error);
  }
);
/**
 *统一方法
 */
export function $post(href, data, no) {
  const init = useAppStore();
  const initList = init.config;
  let ENCRYPTION = "1";
  try {
    ENCRYPTION = initList.find((item) => item.title === "encrypt").value;
  } catch (e) {}
  const url = apis[href];
  const params = no ? data : data ? trim(deleteKey({ ...data })) : {};
  const query = {
    ...params,
    sign: ENCRYPTION == 1 ? Encrypt(params) : "",
  };

  return instance.post(url, query);
  // const url = apis[href];
  // const params = data ? trim(deleteKey({ ...data })) : {};
  // return instance.post(url, params);
}
export function $get(href, params) {
  const url = apis[href];
  if (params) params = trim(deleteKey({ ...params }));
  return instance.get(url, {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false });
    },
  });
}
