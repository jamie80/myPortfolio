//HEADER-TOP-MANU adding background shadow
document.addEventListener("DOMContentLoaded", function () {
  const headerTopMenu = document.getElementById("header-top-menu");

  function addShadow() {
    if (window.scrollY >= 85) {
      headerTopMenu.classList.add("shadow-bg");
    } else {
      headerTopMenu.classList.remove("shadow-bg");
    }
  }

  window.addEventListener("scroll", addShadow);
});

//NAVIGATION showing and hiding
const navigationSection = document.getElementById("navigation-section");
const buttonClose = document.getElementById("btn-close");
const burgerIcon = document.getElementById("burger-icon");

const movingInNavigation = () => {
  navigationSection.classList.add("active");
};

const movingOutNavigation = () => {
  navigationSection.classList.remove("active");
};

burgerIcon.addEventListener("click", movingInNavigation);
buttonClose.addEventListener("click", movingOutNavigation);
