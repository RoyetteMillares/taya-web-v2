import noneSvg from "../../assets/default/pic-none.svg";
const load = async (el, binding) => {
  const imgURL = binding.value;

  if (imgURL) {
    const exist = await imageIsExist(imgURL);

    if (exist) el.setAttribute("src", imgURL);
    else el.setAttribute("src", noneSvg);
  } else el.setAttribute("src", noneSvg);
  // 判断一个图片是否存在, 注意是异步行为
};
function imageIsExist(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      if (img.complete) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = () => {
      resolve(false);
      img = null;
    };
  });
}
export default {
  async beforeMount(el, binding) {
    load(el, binding);
  },
  async updated(el, binding) {
    const imgURL = binding.value;
    if (imgURL) {
      const exist = await imageIsExist(imgURL);

      if (exist) el.setAttribute("src", imgURL);
      else el.setAttribute("src", noneSvg);
    } else el.setAttribute("src", noneSvg);
    // load(el, binding)
  },
};
