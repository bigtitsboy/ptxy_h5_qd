import Vue from 'vue';

/**
 * 检测图片真实地址是否存在
 */
function imageIsExist(src) {
  return new Promise((resolve) => {
    let img = new Image();

    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    }
    img.onerror = function () {
      resolve(false);
      img = null;
    }
    img.src = src;
  })
};

Vue.directive('real-img', async function (el, binding) {
  let realSrc = el.src, // 图片真实地址
    placeholderSrc = binding.value; // 图片占位符地址

  if (placeholderSrc) {
    let exist = await imageIsExist(realSrc);
    if (!exist) {
      el.setAttribute('src', placeholderSrc);
    }
  }
});
