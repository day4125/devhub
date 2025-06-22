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

// --- Text Manipulator Copy/Paste Functionality ---
// const textManipulatorTextArea = document.getElementById("inputText"); // Use the correct ID
// const copyButton = document.getElementById("tmCopyButton"); // Use the new button ID
// const pasteButton = document.getElementById("tmPasteButton"); // Use the new button ID

// --- All DOMContentLoaded related scripts ---
document.addEventListener("DOMContentLoaded", () => {
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

  const collapsibleButton = document.querySelector(".collapsible");
  if (collapsibleButton) {
    collapsibleButton.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isVisible = content.style.display === "block";
      content.style.display = isVisible ? "none" : "block";
      this.innerHTML = isVisible ? "Fler verktyg ▸" : "Dölj ▾"; // Changed text to match original "Fler verktyg"
    });
  }

  // Initial setup for color picker
  if (colorInput && colorPreview && hexOutput && colorLabel) {
    updateColor(); // Set initial color on load

    // Event Listeners
    colorInput.addEventListener("input", updateColor);
    colorPreview.addEventListener("click", copyHexToClipboard);
  } else {
    console.error("Color picker elements not found!");
  }

  // --- Diff Checker Functionality (integrated from script1.js) ---
  // Get references to HTML elements
  const originalTextarea = document.getElementById("originalText");
  const newTextarea = document.getElementById("newText");
  const compareButton = document.getElementById("compareBtn");
  const diffResultDiv = document.getElementById("diffResult");

  // Attach event listener to the button
  if (compareButton) {
    // Added a check to ensure button exists before adding listener
    compareButton.addEventListener("click", compareTexts);
  } else {
    console.error("Compare button not found! Check your HTML ID.");
  }

  function compareTexts() {
    const originalText = originalTextarea.value;
    const newText = newTextarea.value;

    // Basic word-by-word tokenizer for comparison
    // It splits words and keeps spaces/punctuation as separate tokens for slightly better granularity
    const words1 = originalText
      .split(/(\b\w+\b|\s+|[^\s\w]+)/)
      .filter((word) => word.trim().length > 0 || /\s+/.test(word));
    const words2 = newText
      .split(/(\b\w+\b|\s+|[^\s\w]+)/)
      .filter((word) => word.trim().length > 0 || /\s+/.test(word));

    // The core diffing logic
    const diffWords = (arr1, arr2) => {
      const result = [];
      let i = 0; // pointer for arr1
      let j = 0; // pointer for arr2

      while (i < arr1.length || j < arr2.length) {
        const word1 = arr1[i];
        const word2 = arr2[j];

        if (word1 === word2 && word1 !== undefined) {
          // Words are identical and exist
          result.push(`<span>${word1}</span>`);
          i++;
          j++;
        } else {
          // Words are different or one array is exhausted
          let foundInNew = -1;
          // Check if word1 (from original) exists later in new text
          for (let k = j + 1; k < arr2.length; k++) {
            if (arr2[k] === word1) {
              foundInNew = k;
              break;
            }
          }

          let foundInOriginal = -1;
          // Check if word2 (from new) exists later in original text
          for (let k = i + 1; k < arr1.length; k++) {
            if (arr1[k] === word2) {
              foundInOriginal = k;
              break;
            }
          }

          if (
            foundInNew !== -1 &&
            (foundInOriginal === -1 || foundInNew - j <= foundInOriginal - i)
          ) {
            // Word1 found later in New, and this path is shorter or original has no match for word2
            // Mark words from New up to the match as added
            for (let l = j; l < foundInNew; l++) {
              result.push(`<span class="added">${arr2[l]}</span>`);
            }
            j = foundInNew; // Move new pointer to the matched word
          } else if (foundInOriginal !== -1) {
            // Word2 found later in Original
            // Mark words from Original up to the match as removed
            for (let l = i; l < foundInOriginal; l++) {
              result.push(`<span class="removed">${arr1[l]}</span>`);
            }
            i = foundInOriginal; // Move original pointer to the matched word
          } else {
            // No clear match ahead, or both found but no clear shorter path
            // Assume current word1 is removed and current word2 is added
            if (word1 !== undefined) {
              result.push(`<span class="removed">${word1}</span>`);
              i++;
            }
            if (word2 !== undefined) {
              result.push(`<span class="added">${word2}</span>`);
              j++;
            }
          }
        }
      }
      // Join with a non-breaking space for better word separation in the output, but keep original spaces too.
      // A simple join might collapse multiple spaces. The tokenizer above tries to handle this.
      return result.join(""); // Join without extra space, as tokens include their own spaces
    };

    if (originalText.length === 0 && newText.length === 0) {
      diffResultDiv.innerHTML = "Enter text in one or both boxes to compare.";
    } else {
      const diffHtml = diffWords(words1, words2);
      if (
        diffHtml.replace(/<\/?span[^>]*>/g, "").trim() ===
          originalText.replace(/\s+/g, " ").trim() &&
        diffHtml.replace(/<\/?span[^>]*>/g, "").trim() ===
          newText.replace(/\s+/g, " ").trim() &&
        originalText.trim() === newText.trim()
      ) {
        diffResultDiv.innerHTML = "The texts are identical!";
      } else {
        diffResultDiv.innerHTML = diffHtml;
      }
    }
  }
}); // End DOMContentLoaded listener
