/**
 * splicing for image
 */
import { useAppStore } from "../../store/app";
import noneSvg from "../../assets/default/pic-none.svg";

let staticAddress = null;
async function change(el, binding) {
  const imgURL = binding.value;
  let init = useAppStore().config;
  if (!init.length) {
    await useAppStore().GET_CONFIG();
    init = useAppStore().config;
  }
  try {
    if (!staticAddress) {
      staticAddress = init.find(
        (item) => item.title === "imageServerUrl"
      )?.value;
    }

    let isLink = /^((https|ftp|wss|http|ws):\/\/)+/;
    // console.log(isLink);
    const finalSrc = isLink.test(imgURL) ? imgURL : `${staticAddress}${imgURL}`;
    el.setAttribute("src", finalSrc);
    el.setAttribute(
      "onerror",
      `this.src='${noneSvg}';this.style='object-fit:scale-down;background-color: #272e36;'`
    );
  } catch (e) {}
}
export default {
  beforeMount(el, binding) {
    change(el, binding);
  },
  updated(el, binding) {
    if (binding.value) change(el, binding);
  },
};
