import {
  isUsername,
  isEmail,
  isPassword,
  isCode,
  isMobile,
  isBetAmount,
  isCoin,
  isVerify,
  isAmount,
} from "../utils/validate";
import i18n from "@/locales";
const { t } = i18n.global;

export const checkUsername = (rule, value, cb) => {
  if (value) {
    if (isUsername(value)) cb();
    else cb(t("validator.text01"));
  } else cb(t("validator.text02"));
};
export const checkEmail = (rule, value, cb) => {
  if (value) {
    if (isEmail(value)) cb();
    else cb(t("validator.text03"));
  } else cb(t("validator.text04"));
};
export const checkPassword = (rule, value, cb) => {
  if (value) {
    if (isPassword(value)) cb();
    else cb(t("validator.text05"));
  } else cb(t("validator.text06"));
};
export const checkGoogleCode = (rule, value, cb) => {
  if (value) {
    if (isCode(value)) cb();
    else cb(t("validator.text07"));
  } else cb(t("validator.text08"));
};
export const checkMobile = (rule, value, cb) => {
  if (value) {
    if (isMobile(value)) cb();
    else cb(t("validator.text09"));
  } else cb(t("validator.text10"));
};
export const checkAmount = (rule, value, cb) => {
  if (value) {
    if (isAmount(value)) cb();
    else cb(t("additional.amountFormat"));
  } else cb(t("validator.text11"));
};

export const checkAmountOrBet = (rule, value, cb) => {
  if (value) {
    if (isCoin(value)) cb();
    if (isBetAmount(value)) cb();
    else cb(t("additional.amountFormat"));
  } else cb(t("validator.text11"));
};
export const checkVerify = (rule, value, cb) => {
  if (value) {
    if (isVerify(value)) cb();
    else cb(t("validator.text02"));
  } else cb(t("validator.text08"));
};
export const checkRechargeAmount = (rule, value, cb) => {};
