// "strict mode";

const loadText = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let count = 0;

const scale = function (number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const blurring = function () {
  count++;

  if (count > 99) {
    clearInterval(int);
  }

  loadText.innerText = `${count}%`;
  loadText.style.opacity = scale(count, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(count, 0, 100, 30, 0)}px)`;
};

let int = setInterval(blurring, 30);
