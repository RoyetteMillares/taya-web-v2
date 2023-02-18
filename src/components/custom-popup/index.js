import { createVNode, render } from "vue";
import Main from "./index.vue";
/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @returns 组件实例
 */
const renderInstance = (Constructor, props) => {
  const container = document.createElement("div");
  const removeEl = () => {
    render(null, container);
  };
  props.removeEl = removeEl;
  const vNode = createVNode(Constructor, props);
  render(vNode, container);
  document.body.appendChild(container.firstChild);
  return removeEl;
};
export const customPopup = (message, extra, config) => {
  return new Promise((resolve, reject) => {
    renderInstance(Main, {
      modelValue: true,
      message,
      extra,
      resolve,
      reject,
      ...config,
    });
  });
};
