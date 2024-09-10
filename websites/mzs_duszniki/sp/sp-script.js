/* - - - - - MENU - - - - - */

const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenubtn = document.querySelector(".close-menu-btn");

[openMenuBtn, closeMenubtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
    menu.style.transition = "transform 0.5s ease";
  });
});

menu.addEventListener("transitioned", function () {
  this.removeAttribute("style");
});

menu.querySelectorAll(".dropdown > i").forEach((arrow) => {
  arrow.addEventListener("click", function () {
    this.closest(".dropdown").classList.toggle("active");
  });
});
