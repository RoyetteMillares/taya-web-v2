/**
 * socket封装
 */
import { useSocket } from "../store/socket";

/**
 * @param value
 * @returns {string}  强数据类型校验
 */

function isType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * @param event 当前事件
 *  事件轮询器
 */
function eventPoll(event, outerConditon, time, callback) {
  let timer;
  let currentCondition;
  timer = setInterval(() => {
    if (currentCondition === outerConditon) {
      clearInterval(timer);
      callback && callback();
    }
    currentCondition = event();
  }, time);
}

/**
 * @constructor 构造函数
 * action dispatch
 */

function socket(wsAddress) {
  this.timer = null;
  this.errorResetNumber = 0; // 错误重连间隔
  this.closeWs = false;
  this.errorFrom = 0; // socket断开来源
  this.errorResetTimer = null; // 错误重连轮询
  this.errorDispatchOpen = true; // 开启错误调度
  this.heartSocketOpen = false;
  this.retry = 0;
  this.wsAddress = `${wsAddress}/${this.retry}`; // socket地址
  this.$socket_init();
}

socket.prototype.$socket_init = function (callback) {
  const _this = this;
  if (_this.closeWs) {
    throw new Error(
      "socket is closed ,$socker_init is fail ,  all methods is invalid"
    );
  }

  const handelErrorMachine = () => {
    // 处理错误链接 超过2次
    if (_this.errorResetNumber >= 20) {
      handleError();
      return;
    }
    // 处理链接
    if (this.errorResetTimer) clearTimeout(this.errorResetTimer);
    _this.errorResetTimer = setTimeout(async () => {
      // 房间存在 可以重连
      if (!_this.closeWs) _this.$socket_init();
      _this.errorResetNumber++;
    }, 5000);
  };
  /**
   * 连接错误的处理 退出聊天界面 重新连接
   */
  const handleError = () => {
    _this.errorResetNumber = 0;
    _this.errorResetTimer = null;
    _this.errorFrom = 0;
    _this.errorDispatchOpen = false;
  };
  /**
   * 连接错误或者断开乱接
   * eventment 1 关闭 2 连接错误
   */
  const errorDispatch = (eventment) => {
    // console.log(eventment, 'eventment')
    const event = eventment;
    return function () {
      if (_this.errorFrom === 0 && _this.errorDispatchOpen) {
        _this.errorFrom = event;
      }
      event === 1
        ? console.log("web socket has failed  from closeState ")
        : console.log("web socket has failed  from errorState ");
      // console.log(_this.errorFrom, _this.closeWs, "关闭之前");
      if (_this.errorFrom === event && !_this.closeWs) {
        // _this.errorResetTimer && clearTimeout(_this.errorResetTimer)
        handelErrorMachine();
      }
    };
  };
  if (_this.timer) clearInterval(_this.timer);

  _this.ws = new WebSocket(this.wsAddress);

  _this.ws.onopen = async function () {
    callback && callback();
    _this.retry += 1;
    _this.errorResetNumber = 0;
    _this.errorResetTimer = null;
    _this.errorFrom = 0;
    _this.errorDispatchOpen = true;
    _this.$soctket_subscribe();
    if (_this.ws.readyState === 1) {
      // 已经成功连接上
      _this.$soctket_heartSoctket();
      console.log("web socket has connected ");
      // setTimeout(async () => {
      //   const resolveData = await store.dispatch('customer/CHECK_ROOM')
      //   console.log(resolveData, 2222)
      // }, 500)
    }

    _this.closeWs = false;
  };

  _this.ws.onclose = errorDispatch(1);
  _this.ws.onerror = errorDispatch(2);
};

/**
 * 触发器->发布信息
 * @param callback 状态处理
 * @param value 数据处理
 */
socket.prototype.$soctket_emit = async function (value, callback) {
  const _this = this;
  const poll = function () {
    return _this.ws.readyState;
  };
  if (callback && isType(callback) !== "Function") {
    throw new Error("$socket_emit arugment[1] must be a function");
  }
  if (!_this.ws) {
    throw new Error("$socket dispatch is fail please use $socket_open method");
  }
  if (_this.ws.readyState === 1) {
    // 连接成功状态
    _this.ws.send(value);
    callback && callback();
  } else if (_this.ws.readyState === 0) {
    // 连接中状态 ，轮询查询连接
    eventPoll(poll, 1, 500, () => {
      _this.ws.send(value);
      // _this.$soctket_heartSoctket()
      callback && callback();
    });
  } else if (_this.ws.readyState === 2) {
    //  2 CLOSING  连接正在关闭 3 CLOSED 连接已经关闭或不可用
    // setTimeout(() => {
    //   // 失败重新连接
    //   _this.$socket_init(() => {
    //     _this.$soctket_emit(value, callback)
    //   })
    // })
  } else if (_this.ws.readyState === 3) {
    if (!_this.closeWs) {
      _this.$socket_init(() => {
        _this.$soctket_emit(value, callback);
      });
    } else {
      _this.errorResetNumber = 0;
      _this.errorResetTimer = null;
      _this.errorFrom = 0;
    }
  }
};
/**
 * 订阅器->接受广播
 */
socket.prototype.$soctket_subscribe = function () {
  const _this = this;
  _this.ws.onmessage = function (res) {
    // console.log(res.data);
    // if (_this.actions) {
    //   if (isType(_this.actions) !== "Function") {
    //     throw new Error("actions");
    //   } else {
    useSocket().ACCEPT_MESSAGE(res.data);
    // _this.actions("ACCEPT_MESSAGE", res.data);
    //   }
    // } else {
    // }
    // _this.$soctket_heartSoctket();
  };
};
socket.prototype.checkHeart = function () {
  // const pushToken = window.localStorage.getItem("pushToken");
  this.ws.send(
    JSON.stringify({
      // 连接成功将，用户ID传给服务端
      // token: pushToken,
      // source: "mer",
      action: "KEEP_ALIVE",
      bearer: "",
      device: "",
    })
  );
};
/**
 * 发送心跳
 * 心脏搏动机制->防止断开连接
 */

socket.prototype.$soctket_heartSoctket = function () {
  if (this.timer) clearInterval(this.timer);
  this.checkHeart(); // 立即执行心跳
  this.timer = setInterval(() => {
    // console.log(this.ws.readyState)
    if (this.ws.readyState === 1) {
      this.checkHeart();
      // this.$soctket_heartSoctket();
    } else {
      // this.$soctket_close()
      // this.$socket_init()
    }
  }, 5000);
};

/**
 * 关闭socket连接
 */
socket.prototype.$soctket_close = function () {
  if (this.timer) clearInterval(this.timer);
  if (this.errorResetTimer) clearTimeout(this.errorResetTimer);
  this.closeWs = true;
  this.retry = 0;
  if (this.ws) this.ws.close();
};
/**
 * 重启socket连接
 */
socket.prototype.$soctket_open = function () {
  if (!this.closeWs) {
    throw new Error("socket is connected");
  }
  this.timer = null;
  this.errorResetNumber = 0;
  this.closeWs = false;
  this.errorFrom = 0;
  this.errorResetTimer = null;
  this.errorDispatchOpen = true;
  this.heartSocketOpen = false;
  this.closeWs = false;
  this.$socket_init();
};
/**
 * 重连次数清空
 */
socket.prototype.resetNum = function () {
  this.errorResetNumber = 0;
};
export default socket;
