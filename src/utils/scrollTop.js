import moment from "moment-timezone";
let timeZone = "";
/**
 * @description 10位时间戳转换
 * @param time
 * @returns {string}
 */
export function tenBitTimestamp(time, type = "-", flag = true, year = true) {
  if (flag) {
    if (year)
      return moment(time * 1000).format(`YYYY${type}MM${type}DD HH:mm:ss`);
    else return moment(time * 1000).format(`MM${type}DD HH:mm:ss`);
  } else {
    return moment(time * 1000).format(`MM${type}DD HH:mm:ss`);
  }
}
export function yearTimes(time, type = "-") {
  return moment(time * 1000).format(`YYYY${type}MM${type}DD`);
}
/**
 * 位运算
 *  byteToResult
 * @param data 数字类型 拆分 数组类型累加
 */
export function byteToResult(data) {
  // if(data==FormData) return data
  if (typeof data === "number") {
    const newdata = data.toString(2);
    const mycars = new Array();
    for (let i = 0, len = newdata.length; i < len; i++) {
      if (newdata[i] == 1) {
        const a = 1 << i;
        mycars.push(a);
      }
      return mycars;
    }
    // 判断数组
  } else if (Object.prototype.toString.call(data) === "[object Array]") {
    let number = 0;
    if (data.length) {
      data.map((item) => {
        number += item;
      });
    }
    return number;
  }
}

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
/*
 * 监听页面是否能播放 在能够播放的情况下 才允许播放声音
 * */

export const futestAutoPlay = () => {
  // 返回一个promise以告诉调用者检测结果
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    // require一个本地文件，会变成base64格式
    audio.src = require("@/assets/audio/open.mp3");
    document.body.appendChild(audio);
    let autoplay = true;
    // play返回的是一个promise
    audio
      .play()
      .then(() => {
        // 支持自动播放
        autoplay = true;
      })
      .catch((err) => {
        // 不支持自动播放
        autoplay = false;
      })
      .finally(() => {
        audio.remove();
        // 告诉调用者结果
        resolve(autoplay);
      });
  });
};
export function parseTime(str) {
  const y = str.substr(0, 4);
  const m = str.substr(4, 2);
  const d = str.substr(6, 2);
  return isNaN(Date.parse(new Date(`${y}/${m}/${d}`)));
}

/**
 * @author django
 * @description 比较两个对象的key value
 * @param oldObj {Object} 旧的对象
 * @param newObj {Object} 新的对象
 */
export const compareObject = (newObj, oldObj) => {
  const newArr = Object.keys(newObj);
  const oldArr = Object.keys(oldObj);
  const obj = {};
  newArr.forEach((item) => {
    oldArr.forEach((val) => {
      if (item === val) {
        if (newObj[item] !== oldObj[item]) {
          obj[item] = newObj[item];
        }
      }
      if (!oldArr.includes(item)) {
        obj[item] = newObj[item];
      }
    });
  });
  return obj;
};
/**
 * @description 设置时区
 * @param name 时区名称
 */
export const setTimeZone = (name) => {
  if (name) {
    moment.tz.setDefault(name);
    timeZone = name;
  }
};
export const translateTime = (value) => {
  if (value)
    return (
      new Date(
        moment.tz(value, timeZone).tz("Asia/Shanghai").format()
      ).valueOf() / 1000
    );
};
/**
 * 通过时间戳转换成时间格式
 */
function add0(m) {
  return m < 10 ? "0" + m : m;
}
export function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}
export const timeFormat = (shijianchuo, type = "-") => {
  // shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();

  return (
    y +
    type +
    add0(m) +
    type +
    add0(d) +
    " " +
    add0(h) +
    ":" +
    add0(mm) +
    ":" +
    add0(s)
  );
  // }
};
/**
 * 根据对应的时间格式 以及时间区 获取到对应的时间戳
 */
export const getTimestamp = (time) => {
  // if(time)  return moment(timeFormat(time)).valueOf()/1000
  if (time) return translateTime(timeFormat(time)).valueOf();
  else return "";
};

export function numFormat(num) {
  if (!num) return;
  const res = num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
  return res;
}
/**
 * @author django
 * @description 滑动 缓动函数
 * @param el 滚动条的目标元素
 * @param from 起始位置
 * @param to 到达位置
 * @param duration 动画时间
 * @param endCallback 回调函数
 */
// scrollTop animation
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
