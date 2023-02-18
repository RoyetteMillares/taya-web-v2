/**
 * @author django
 * @description 字典类调用 获取数据
 */

import { computed } from "vue";
import { useAppStore } from "../store/app";
const app = useAppStore();
const dictionary = computed(() => app.dictionary);
/**
 * @description 获取某一个字典
 * @param key {string} 字典的key
 */
const getDirection = (key) => {
  let value = [];
  try {
    value = dictionary.value[key];
  } catch (e) {}
  return value;
};
/**
 * @description 根据字典的value 获取到相对应的label(文本)
 * @param list {array} 字典的列表
 * @param value {string|number} 数据的value
 * @return {string} 字典的label
 */
const getTitle = (list, value) => {
  let label = "";
  try {
    label = list.find((item) => item.code == value?.toString())?.title;
  } catch (e) {
    console.log(e);
  }
  return label;
};
export const useDictionary = () => {
  return {
    dictionary,
    getDirection,
    getTitle,
  };
};
