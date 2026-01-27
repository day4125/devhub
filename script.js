// -- Functions for text manipulation -- //

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
        .replace(/&shy;/gi, "") // Remove &shy; (case-insensitive)
        .replace(/[\u00ad]/g, "") // Remove actual soft hyphen character
        .replace(/\s+/g, " ") // Replace multiple whitespace with single space
        .trim(); // Trim beginning/end
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

// --- Tab Switching Functionality ---
function switchTab(tabId) {
  // Remove active class from all tabs and content
  document.querySelectorAll(".tab-item").forEach((item) => {
    item.classList.remove("active");
  });
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Add active class to selected tab and content
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
  document.getElementById(tabId).classList.add("active");
}

// --- All DOMContentLoaded related scripts ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Tab Switching Event Listeners ---
  document.querySelectorAll(".tab-item").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // --- Dark mode functionality ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Function to set correct icon based on theme
  function setThemeIcon() {
    if (body.classList.contains("dark-mode")) {
      themeToggle.textContent = "🌙"; // Moon for dark theme
    } else {
      themeToggle.textContent = "☀️"; // Sun for light theme
    }
  }

  // Function to toggle theme
  function toggleTheme() {
    body.classList.toggle("dark-mode"); // Use toggle for simplicity
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    setThemeIcon(); // Update icon after theme change
  }

  // Check localStorage when page loads
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }
  // Set correct icon on load
  setThemeIcon();

  // Add event listener to button only if it exists
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  //--- Color Picker Functionality ---
  const colorInput = document.getElementById("colorInput");
  const colorPreview = document.getElementById("colorPreview");
  const hexOutput = document.getElementById("hexOutput");
  const colorLabel = colorPreview.querySelector(".color-label"); // Get the label inside preview

  // --- Color Conversion Utilities ---
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // --- Color Converter Logic ---
  function setupColorConverter() {
    const inputFormat = document.getElementById("inputFormat");
    const outputFormat = document.getElementById("outputFormat");
    const inputContainer = document.getElementById("inputContainer");
    const converterOutput = document.getElementById("converterOutput");
    const copyBtn = document.getElementById("copyConverterOutput");

    if (!inputFormat || !outputFormat || !inputContainer) return;

    // Helper to clear and create inputs
    function renderInputs() {
      const format = inputFormat.value;
      inputContainer.innerHTML = "";

      const input = document.createElement("input");
      input.type = "text";
      input.id = "colorTextInput";
      input.addEventListener("input", handleConversion);
      inputContainer.appendChild(input);

      if (format === "hex") {
        input.placeholder = "#000000";
        input.maxLength = 7;
      } else if (format === "rgb") {
        input.placeholder = "rgb(255, 0, 0)";
      } else if (format === "hsl") {
        input.placeholder = "hsl(0, 100%, 50%)";
      }
      // Don't trigger conversion immediately on switch to keep input empty/clean or preserve value?
      // Since we clear input, we can't really convert. Maybe clear output too.
      converterOutput.value = "";
    }

    function handleConversion() {
      const iFormat = inputFormat.value;
      const oFormat = outputFormat.value;
      const inputValue = document.getElementById("colorTextInput").value.trim();

      if (!inputValue) {
        converterOutput.value = "";
        return;
      }

      let r, g, b;

      // Parse Input
      if (iFormat === "hex") {
        // Allow partial input, check validity
        if (!/^#?[0-9A-F]{3,6}$/i.test(inputValue)) {
          converterOutput.value = "Ogiltig HEX";
          return;
        }
        const rgb = hexToRgb(inputValue);
        if (!rgb) {
          converterOutput.value = "Ogiltig HEX";
          return;
        }
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      } else if (iFormat === "rgb") {
        // Match numbers, ignore other chars slightly but respect order
        const matches = inputValue.match(/-?\d+(\.\d+)?/g);
        if (!matches || matches.length < 3) {
          // Don't show error immediately while typing? Or maybe subtle one.
          // For now, if incomplete, maybe just return
          return;
        }
        r = parseFloat(matches[0]);
        g = parseFloat(matches[1]);
        b = parseFloat(matches[2]);

        // Clamp
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

      } else if (iFormat === "hsl") {
        const matches = inputValue.match(/-?\d+(\.\d+)?/g);
        if (!matches || matches.length < 3) {
          return;
        }
        let h = parseFloat(matches[0]);
        let s = parseFloat(matches[1]);
        let l = parseFloat(matches[2]);

        // Clamp
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        l = Math.max(0, Math.min(100, l));

        const rgb = hslToRgb(h, s, l);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      }

      // Convert RGB to Output Format
      let result = "";
      if (oFormat === "hex") {
        result = rgbToHex(r, g, b).toUpperCase();
      } else if (oFormat === "rgb") {
        result = `rgb(${r}, ${g}, ${b})`;
      } else if (oFormat === "hsl") {
        const hsl = rgbToHsl(r, g, b);
        result = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
      }

      converterOutput.value = result;
    }

    // copy functionality
    copyBtn.addEventListener("click", () => {
      if (converterOutput.value && converterOutput.value !== "Ogiltig HEX") {
        navigator.clipboard.writeText(converterOutput.value).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = "✅";
          setTimeout(() => copyBtn.textContent = original, 1500);
        });
      }
    });

    // Listeners
    inputFormat.addEventListener("change", renderInputs);
    outputFormat.addEventListener("change", handleConversion);

    // Initial render
    renderInputs();
  }

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
        // Visual feedback: temporarily change text
        const originalText = colorLabel.textContent;
        colorLabel.textContent = "Kopierad!";
        setTimeout(() => {
          colorLabel.textContent = originalText; // Restore text
        }, 1500); // Show for 1.5 seconds
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
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

    // Initialize Converter
    setupColorConverter();
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
