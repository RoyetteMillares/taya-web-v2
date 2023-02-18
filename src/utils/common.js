import JSEncrypt from "jsencrypt";
import md5 from "js-md5";
/**
 * @description 给传入对象 键排序
 * @param arys {Object}
 * @return {Object}
 */
const encryptor = new JSEncrypt();

/**
 * @description 暴露一个存入公钥的函数
 * @param pubKey {string}
 */

export function insertPublicKey(pubKey) {
  encryptor.setPublicKey(pubKey); // 设置公钥
}

/**
 * @description 对传入的数据加密
 * @param data 传入的数据
 */
export function encryptionData(data) {
  return encryptor.encrypt(data); // 对内容进行加密
}
export function Encrypt(params) {
  // let obj=objKeySort(params);
  const data = md5(JSON.stringify(params)); // 先用MD5加密json数据
  const pas = encryptionData(data); // 然后用rsa加密
  // console.log(data, "md5", pas);
  return pas;
}
