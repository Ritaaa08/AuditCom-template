const dateSpan = document.getElementById("currentDate");

const now = new Date();
const formatted = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

dateSpan.textContent = formatted;
