// -- Funktioner för att manipulera text -- //

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
    case "removeExtraSpaces":
      text = text
        .replace(/&shy;/gi, "") // Ta bort &shy; (case-insensitive)
        .replace(/[\u00ad]/g, "") // Ta bort faktiskt soft hyphen-tecken
        .replace(/\s+/g, " ") // Ersätt flera whitespace med ett
        .trim(); // Trimma början/slut
      break;
  }

  inputTextElement.value = text;
}

function extractInformation(type) {
  const inputTextElement = document.getElementById("inputText");
  const text = inputTextElement.value;
  let result = [];

  if (type === "email") {
    // Slightly improved regex for edge cases
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    result = text.match(emailRegex) || [];
  } else if (type === "url") {
    // Improved regex to better capture URLs, including those without http/s
    const urlRegex =
      /(?:https?:\/\/|www\.)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:[/?#][^\s]*)?/g;
    let potentialUrls = text.match(urlRegex) || [];
    // Ensure www. addresses get http:// prefix for consistency if needed elsewhere
    result = potentialUrls.map((url) =>
      url.startsWith("www.") ? "http://" + url : url
    );
  }

  // Display results clearly, perhaps indicating type
  if (result.length > 0) {
    inputTextElement.value = `Extracted ${type}(s):\n${result.join("\n")}`;
  } else {
    inputTextElement.value = `No ${type} found.`;
  }
}

// --- Darkmode-funktionalitet ---

// Ensure DOM is loaded before selecting elements
document.addEventListener("DOMContentLoaded", () => {
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
    body.classList.toggle("dark-mode"); // Use toggle for simplicity
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    setThemeIcon(); // Uppdatera ikonen efter temabyte
  }

  // Kontrollera localStorage när sidan laddas
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }
  // Sätt rätt ikon vid laddning
  setThemeIcon();

  // Lägg till event listener till knappen only if it exists
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  //--- Color Picker Funktionalitet ---
  const colorInput = document.getElementById("colorInput");
  const colorPreview = document.getElementById("colorPreview");
  const hexOutput = document.getElementById("hexOutput");
  const colorLabel = colorPreview.querySelector(".color-label"); // Get the label inside preview

  function updateColor() {
    const colorValue = colorInput.value;
    colorPreview.style.backgroundColor = colorValue;
    hexOutput.textContent = colorValue.toUpperCase();

    // --- Accessibility: Set label color based on background ---
    // Basic contrast check (can be improved with proper WCAG calculation)
    const rgb = parseInt(colorValue.substring(1), 16); // Convert hex to integer
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Calculate luminance

    if (luminance > 140) {
      // If background is light
      colorLabel.style.color = "#333"; // Dark text
      colorLabel.style.textShadow = "none"; // No shadow needed
    } else {
      // If background is dark
      colorLabel.style.color = "#fff"; // Light text
      colorLabel.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.7)"; // Add shadow for visibility
    }
    // --- End Accessibility ---
  }

  function copyHexToClipboard() {
    const hexValue = hexOutput.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        // Visuell feedback: ändra texten tillfälligt
        const originalText = colorLabel.textContent;
        colorLabel.textContent = "Kopierad!";
        setTimeout(() => {
          colorLabel.textContent = originalText; // Återställ texten
        }, 1500); // Visa i 1.5 sekunder
      })
      .catch((err) => {
        console.error("Kunde inte kopiera text: ", err);
        // Optional: Show error message to user
        const originalText = colorLabel.textContent;
        colorLabel.textContent = "Fel!";
        setTimeout(() => {
          colorLabel.textContent = originalText;
        }, 1500);
      });
  }

  document.querySelectorAll(".collapsible").forEach((btn) => {
    const originalText = btn.textContent;
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isVisible = content.style.display === "block";
      content.style.display = isVisible ? "none" : "block";
      this.innerHTML = isVisible ? originalText : "Dölj ▾";
    });
  });

  // Initial setup
  if (colorInput && colorPreview && hexOutput && colorLabel) {
    updateColor(); // Set initial color on load

    // Event Listeners
    colorInput.addEventListener("input", updateColor);
    colorPreview.addEventListener("click", copyHexToClipboard);
  } else {
    console.error("Color picker elements not found!");
  }
}); // End DOMContentLoaded listener
