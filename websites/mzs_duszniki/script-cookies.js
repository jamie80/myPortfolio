// C O O K I E S
// Sprawdzanie, czy użytkownik już zaakceptował lub odrzucił cookies
if (!localStorage.getItem("cookies-consent")) {
  // Jeśli nie, pokazujemy komunikat
  document.getElementById("cookies-banner").style.display = "flex";
}

// Funkcja akceptująca cookies
document.getElementById("accept-btn").addEventListener("click", function () {
  // Ustawiamy cookie o zaakceptowaniu
  localStorage.setItem("cookies-consent", "accepted");
  document.getElementById("cookies-banner").style.display = "none"; // Ukrywamy baner
});

// Funkcja odrzucająca cookies
document.getElementById("decline-btn").addEventListener("click", function () {
  // Ustawiamy cookie o odrzuceniu
  localStorage.setItem("cookies-consent", "declined");
  document.getElementById("cookies-banner").style.display = "none"; // Ukrywamy baner
});
// END COOKIES
