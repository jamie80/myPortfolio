const question = document.querySelectorAll(".faq-toggle");

question.forEach((el) => {
  el.addEventListener("click", () => {
    el.parentNode.classList.toggle("active");
  });
});

const activeQuestion = document.querySelectorAll(".faq.active");
activeQuestion.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.remove("active");
  });
});
