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
