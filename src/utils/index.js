// import showTip from './toast'
import i18n from "../locales";
const t = i18n.global.t;
// import { ElMessage } from "element-plus";
import { customPopup } from "../components/custom-popup";

import * as R from "ramda";
export const hasData = R.compose(R.not, R.either(R.isNil, R.isEmpty));

export const copy = (value) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value);
  } else {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.style.position = "absolute";
    textarea.style.top = "-100px";
    textarea.style.left = "-1000px";
    textarea.style.zIndex = "-1000";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.readOnly = "readOnly";
    textarea.value = value;
    textarea.select();
    document.execCommand("copy", true);
  }
  customPopup(t("additional.copySuccessfully"),"",{isSuccess: true});
};
/**
 * 删除为空的key
 * @param data 传入对象
 * @return 返回删除后的对象
 */
export function deleteKey(data) {
  // console.log(data)
  if (!data) return "";
  const obj = data;

  Object.keys(obj).forEach((item) => {
    if (item == "data") {
      if (typeof obj[item] !== "string") deleteKey(obj[item]);
    } else {
      if (obj[item] === null || obj[item] === "" || obj[item] === " ") {
        delete obj[item];
      } else {
        if (typeof obj[item] === "string") {
          obj[item] = obj[item].replace(/(^\s*)|(\s*$)|\n/g, "");
        }
      }
    }
  });
  if (Object.keys(obj).length) {
    return obj;
  } else {
    return {};
  }
}
export function trim(data) {
  if (!data) return "";
  const obj = data;
  Object.keys(obj).forEach((item) => {
    if (item == "data") {
      if (typeof obj[item] !== "string") trim(obj[item]);
    } else if (Array.isArray(obj[item]) && obj[item].length) {
      obj[item].forEach((val, i) => {
        // console.log(Object.prototype.toString.call(val), 90909);
        // 对象数组
        if (Object.prototype.toString.call(val) === "[object Object]") {
          // console.log(val, "val", 90909);
          trim(val);
        } else {
          // console.log(typeof val, "val");
          if (typeof val === "string")
            obj[item][i] = val.replace(/(^\s*)|(\s*$)|\n/g, "");
        }
      });
    } else {
      if (typeof obj[item] === "string") {
        if (obj[item]) obj[item] = obj[item].replace(/(^\s*)|(\s*$)|\n/g, "");
      }
    }
  });
  return obj;
}

// scrollTop animation
/**
 *
 * @param el 元素
 * @param from 从某个位置
 * @param to 到某个位置
 * @param duration
 * @param endCallback
 */

export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}
export const returnKey = (list, key) => {
  let label = "-";
  try {
    list.find((item) => item.value === key).label;
  } catch (e) {}
  return label;
};

export function ToChanged(num) {
  let point, str;
  if (num.toString().length >= 10) {
    point = num / 1000000000;
    str = point.toFixed(2) + "*B*";
  } else if (num.toString().length > 6) {
    point = num / 1000000;
    str = point.toFixed(2) + "*M*";
  } else if (num.toString().length > 3) {
    point = num / 1000;
    str = point.toFixed(2) + "*K*";
  } else str = num;
  return str;
}
