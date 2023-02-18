/**
 * 校验用户名
 * {4-12}
 */
export function isUsername(str) {
  let user = /^[A-Za-z][A-Za-z0-9]{5,9}$/;
  return user.test(str);
}
/**
 * 校验密码
 * {6-16}
 */
export function isPassword(str) {
  let pass = /^[a-zA-Z0-9!@#$%^&*_+]{4,16}$/;
  return pass.test(str);
}
export function isLoginName(str) {
  let login = /^[A-Za-z][A-Za-z0-9]{4,16}|[0-9]{10}$/;
  return login.test(str);
}
export function isMobile(str) {
  // let mobile = /^1[34578][0-9]\d{8}$/
  let mobile = /^[0-9]{8,11}$/;
  return mobile.test(str);
}
export function isCode(str) {
  let code = /^[0-9]{6}$/;
  return code.test(str);
}

export function isRealName(str) {
  let code = /^[A-Za-z]{2,30}$/;
  return code.test(str);
}
export function isBankNo(str) {
  let code = /^[1-9][0-9]{4,18}$/;
  return code.test(str);
}
export function isEmail(str) {
  let code = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return code.test(str);
}
export function isCity(str) {
  let code = /[a-zA-Z0-9]{2,40}/;
  return code.test(str);
}
export function isAddress(str) {
  let code = /[a-zA-Z0-9]{2,80}/;
  return code.test(str);
}
/* 邀请码 */
export function isPromoCode(str) {
  let code = /^[a-zA-Z0-9]{6}$/;
  return code.test(str);
}
export function isNumber(value) {
  const reg = /^[0-9]*$/;
  return reg.test(value);
}
export function isCoin(value) {
  const reg = /^[0-9]+\.\d{2}$/;
  return reg.test(value);
}
export function isBetAmount(value) {
  const reg = /^[1-9]+\d?$/;
  return reg.test(value);
}
export function isVerify(value) {
  let code = /^[0-9a-zA-Z]{4,6}$/;
  return code.test(value);
}
export function isAmount(value) {
  const reg = /^[1-9]+[0-9]{0,}$/;
  return reg.test(value);
}
