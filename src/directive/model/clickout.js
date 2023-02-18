export default {
  beforeMount(el, binding) {
    document.addEventListener(
      "click",
      (e) => {
        const excepted = document.getElementsByClassName("excepted-model");
        let length = excepted.length;
        Array.from(excepted).forEach((item) => {
          if (item.contains(e.target)) {
            item.contains(e.target);
            length--;
          }
        });
        !el.contains(e.target) && length >= excepted.length && !binding.value();
      },
      false
    );
  },
  unmounted() {
    document.removeEventListener("click", () => {});
  },
};
