function transformText(operation) {
  const inputTextElement = document.getElementById("inputText");
  let text = inputTextElement.value;

  switch (operation) {
    case "toUpperCase":
      text = text.toUpperCase();
      break;
    case "toLowerCase":
      text = text.toLowerCase();
      break;
    case "capitalize":
      const words = text.split(" ");
      const capitalizedWords = words.map((word) => {
        if (word.length > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return "";
        }
      });
      text = capitalizedWords.join(" ");
      break;
    case "removeExtraSpaces":
      text = text.replace(/\s+/g, " ").trim();
      break;
  }

  inputTextElement.value = text;
}

function extractInformation(type) {
  const inputTextElement = document.getElementById("inputText");
  const text = inputTextElement.value;
  let result = [];

  if (type === "email") {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    result = text.match(emailRegex) || [];
  } else if (type === "url") {
    const urlRegex = /(https?:\/\/|www\.)[^\s]+/g;
    result = text.match(urlRegex) || [];
  }

  inputTextElement.value = result.join("\n");
}

// --- Darkmode-funktionalitet ---

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Funktion för att sätta rätt ikon baserat på tema
function setThemeIcon() {
  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "🌙"; // Måne för mörkt tema
  } else {
    themeToggle.textContent = "☀️"; // Sol för ljust tema
  }
}

// Funktion för att växla tema
function toggleTheme() {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
  // Uppdatera ikonen efter temabyte
  setThemeIcon();
}

// Kontrollera localStorage när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }
  // Sätt rätt ikon vid laddning
  setThemeIcon();
});

// Lägg till event listener till knappen
themeToggle.addEventListener("click", toggleTheme);
