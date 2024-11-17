function toggleDetails(extraId, button) {
    const extraDetails = document.getElementById(extraId);
    const icon = button.querySelector('i'); // Get the icon inside the button

    if (extraDetails.style.display === "none" || extraDetails.style.display === "") {
      extraDetails.style.display = "inline";
      button.textContent = '';  // Clear text to make space for the icon
      button.appendChild(icon); // Keep the icon
      button.appendChild(document.createTextNode(' Show Less')); // Add the "Show Less" text
    } else {
      extraDetails.style.display = "none";
      button.textContent = '';  // Clear text to make space for the icon
      button.appendChild(icon); // Keep the icon
      button.appendChild(document.createTextNode(' Learn More')); // Add the "Learn More" text
    }
}



// Define themes
const themes = {
  default: {
    '--primary-color': '#2D2155',
    '--white-color': 'white',
    '--button-color': '#6D40E4',
    '--hover-color': '#3d2482',
    '--background-color': '#e0f7fa',
    '--footer-color': '#2c3e50',
    '--table-header':'#b3e5fc'
  },
  green: {
'--primary-color': '#A5D6A7',  /* Soft Mint Green */
'--white-color': '#FFFFFF',  /* Pure White */
'--button-color': '#81C784',  /* Pastel Green */
'--hover-color': '#66BB6A',  /* Slightly Darker Green */
'--background-color': '#F1F8E9',  /* Very Light Mint Green */
'--footer-color': '#388E3C',  /* Muted Forest Green */
'--table-header': '#DCEDC8'  /* Soft Pale Green */

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
  const currentTheme = localStorage.getItem('theme') || 'default';
  const newTheme = currentTheme === 'default' ? 'green' : 'default';

  applyTheme(themes[newTheme]);
  localStorage.setItem('theme', newTheme);
  updateToggleButtonText(newTheme);
}

// Update button text based on theme
function updateToggleButtonText(theme) {
  const toggleButton = document.getElementById('toggleTheme');
  if (toggleButton) {
    toggleButton.textContent = theme === 'default' ? 'Switch Theme' : 'Switch Theme';
  }
}

// Apply the saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'default';
  applyTheme(themes[savedTheme]);
  updateToggleButtonText(savedTheme);
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

  services.forEach(service => {
    const newRow = createServiceRow(service.name, service.details, service.price);
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
document.getElementById("removeItemButton").addEventListener("click", function () {
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

