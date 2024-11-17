function toggleDetails(extraId, button) {
  const extraDetails = document.getElementById(extraId);
  const icon = button.querySelector("i"); // Get the icon inside the button

  if (
    extraDetails.style.display === "none" ||
    extraDetails.style.display === ""
  ) {
    extraDetails.style.display = "inline";
    button.textContent = ""; // Clear text to make space for the icon
    button.appendChild(icon); // Keep the icon
    button.appendChild(document.createTextNode(" Show Less")); // Add the "Show Less" text
  } else {
    extraDetails.style.display = "none";
    button.textContent = ""; // Clear text to make space for the icon
    button.appendChild(icon); // Keep the icon
    button.appendChild(document.createTextNode(" Learn More")); // Add the "Learn More" text
  }
}

// Define themes
const themes = {
  default: {
    "--primary-color": "#2D2155",
    "--white-color": "white",
    "--button-color": "#6D40E4",
    "--hover-color": "#3d2482",
    "--background-color": "#e0f7fa",
    "--footer-color": "#2c3e50",
    "--table-header": "#b3e5fc",
    "--font-family": "Arial, sans-serif",
    "--font-size": "16px",
    "--text-color": "#000",
  },
  green: {
    "--primary-color": "#A5D6A7" /* Soft Mint Green */,
    "--white-color": "#FFFFFF" /* Pure White */,
    "--button-color": "#81C784" /* Pastel Green */,
    "--hover-color": "#66BB6A" /* Slightly Darker Green */,
    "--background-color": "#F1F8E9" /* Very Light Mint Green */,
    "--footer-color": "#388E3C" /* Muted Forest Green */,
    "--table-header": "#DCEDC8" /* Soft Pale Green */,
    "--font-family": "Arial, sans-serif",
    "--font-size": "16px",
    "--text-color": "#000",
  },
};

// Apply a theme
function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((key) => {
    root.style.setProperty(key, theme[key]);
  });
}

// Toggle themes and save the selection
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "default";
  const newTheme = currentTheme === "default" ? "green" : "default";

  applyTheme(themes[newTheme]);
  localStorage.setItem("theme", newTheme);
  updateToggleButtonText(newTheme);
}

// Update button text based on theme
function updateToggleButtonText(theme) {
  const toggleButton = document.getElementById("toggleTheme");
  if (toggleButton) {
    toggleButton.textContent =
      theme === "default" ? "Switch Theme" : "Switch Theme";
  }
}

// // Apply the saved theme on page load
// window.addEventListener("DOMContentLoaded", () => {
//   const savedTheme = localStorage.getItem("theme") || "default";
//   applyTheme(themes[savedTheme]);
//   updateToggleButtonText(savedTheme);
// });

// Define global styles for text changes
const globalStyles = {
  styled: {
    "--font-family": "Courier New, monospace",
    "--font-size": "18px",
    "--text-color": "#2e2e2e",
  },
  default: {
    "--font-family": "Arial, sans-serif",
    "--font-size": "16px",
    "--text-color": "#333",
  },
};

// Apply styles to the entire webpage
function applyGlobalStyles(styleSet) {
  const root = document.documentElement;
  Object.entries(styleSet).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// Save style preference to localStorage
function saveStylePreference(styleName) {
  localStorage.setItem("globalStyle", styleName);
}

// Load style preference on page load
function loadStylePreference() {
  const savedStyle = localStorage.getItem("globalStyle") || "default";
  applyGlobalStyles(globalStyles[savedStyle]);
}

// Add event listeners for "Change Text Style" and "Reset Text Style"
document.querySelectorAll(".style-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "changeTextStyle") {
      applyGlobalStyles(globalStyles.styled);
      saveStylePreference("styled");
    } else if (button.id === "resetTextStyle") {
      applyGlobalStyles(globalStyles.default);
      saveStylePreference("default");
    }
  });
});

// Apply saved style preference on page load
document.addEventListener("DOMContentLoaded", loadStylePreference);

// Apply saved style and theme on page load
document.addEventListener("DOMContentLoaded", () => {
  loadStylePreference(); // Apply saved global styles
  const savedTheme = localStorage.getItem("theme") || "default";
  applyTheme(themes[savedTheme]); // Apply the saved theme
  updateToggleButtonText(savedTheme); // Update button text for theme
});

/// Task 2 : Add remove items
// Load table data from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadTableData();
});

// Function to load table data from localStorage
function loadTableData() {
  const tableBody = document.getElementById("servicesTableBody");
  const services = JSON.parse(localStorage.getItem("servicesList")) || [];

  services.forEach((service) => {
    const newRow = createServiceRow(
      service.name,
      service.details,
      service.price
    );
    tableBody.appendChild(newRow);
  });
}

// Function to save table data to localStorage
function saveTableData(services) {
  localStorage.setItem("servicesList", JSON.stringify(services));
}

// Function to create a table row
function createServiceRow(name, details, price) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const detailsCell = document.createElement("td");
  detailsCell.textContent = details;
  row.appendChild(detailsCell);

  const priceCell = document.createElement("td");
  priceCell.textContent = price;
  row.appendChild(priceCell);

  const actionCell = document.createElement("td");
  const actionLink = document.createElement("a");
  actionLink.className = "join-now-btn";
  actionLink.textContent = "Join Now";
  actionCell.appendChild(actionLink);
  row.appendChild(actionCell);

  return row;
}

// Event listener to add a new item
document.getElementById("addItemButton").addEventListener("click", function () {
  const service = prompt("Enter the Service Name:");
  const details = prompt("Enter the Details:");
  const price = prompt("Enter the Price:");

  if (service && details && price) {
    const tableBody = document.getElementById("servicesTableBody");
    const newRow = createServiceRow(service, details, price);
    tableBody.appendChild(newRow);

    // Update localStorage
    const services = JSON.parse(localStorage.getItem("servicesList")) || [];
    services.push({ name: service, details: details, price: price });
    saveTableData(services);
  } else {
    alert("All fields are required!");
  }
});

// Event listener to remove the last non-default item
document
  .getElementById("removeItemButton")
  .addEventListener("click", function () {
    const tableBody = document.getElementById("servicesTableBody");
    const rows = Array.from(tableBody.children);
    const lastRow = rows[rows.length - 1];

    if (lastRow && lastRow.classList.contains("default-row")) {
      alert("Default rows cannot be removed!");
    } else if (lastRow) {
      tableBody.removeChild(lastRow);

      // Update localStorage
      const services = JSON.parse(localStorage.getItem("servicesList")) || [];
      services.pop();
      saveTableData(services);
    } else {
      alert("No rows available to remove!");
    }
  });

  function validateForm() {
    // Clear all previous error messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("successMessage").innerText = "";
  
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
  
    let isValid = true;
  
    // Validate name
    if (name === "") {
      document.getElementById("nameError").innerText = "Name must not be empty.";
      isValid = false;
    }
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").innerText = "Please enter a valid email address.";
      isValid = false;
    }
  
    // Validate phone
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone) || phone.length < 11) {
      document.getElementById('phoneError').textContent = 'Phone number must contain at least 11 digits and only digits.';
      isValid = false;
    }
  
    // Display success message if all fields are valid
    if (isValid) {
      document.getElementById("successMessage").innerText = "Form submitted successfully!";
    }
  }
  