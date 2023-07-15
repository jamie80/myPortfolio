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
