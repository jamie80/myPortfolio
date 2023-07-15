const burgerBtn = document.querySelector(".btn-menu");
const burgerIcon = document.getElementById("burger");
const closeIcon = document.getElementById("x");
const navigation = document.querySelector(".navigation-list");

const handleNavigation = () => {
  navigation.classList.toggle("active");
  burgerBtn.classList.toggle("active");
  burgerIcon.classList.toggle("hide");
  closeIcon.classList.toggle("hide");
};

burgerBtn.addEventListener("click", handleNavigation);
