//SMOOTH SCROLLING

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

//BUTTON DOWN for MORE CONTENT ABOUT

const btnMoreContentAbout = document.querySelector(".btn-more-content-about");
const textReadMoreAbout = document.querySelector(".about-read-more");
const wrapperAbout = document.querySelector(".about-wrapper");

wrapperAbout.addEventListener("click", (e) => {
  const current = e.target;

  const isBtnMoreContentAbout = current.className.includes(
    "btn-more-content-about"
  );

  if (!isBtnMoreContentAbout) return;

  const currentText = e.target.parentNode.querySelector(".about-read-more");
  currentText.classList.toggle("about-read-more-open");
  current.innerHTML = current.innerHTML.includes("Więcej")
    ? "Mniej &uarr;"
    : "Więcej &darr;";
});
//BUTTON DOWN for MORE CONTENT STAFF

//CAROUSEL
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});
