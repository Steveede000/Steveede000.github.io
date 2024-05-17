document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    function updateButtonText() {
        if (body.classList.contains("dark-theme")) {
            themeToggle.textContent = "Light";
        } else {
            themeToggle.textContent = "Dark";
        }
    }

    function applyTheme(theme) {
        body.classList.toggle("dark-theme", theme === "dark");
        localStorage.setItem("theme", theme);
        updateButtonText();
    }

    // Load the saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? "dark" : "light");
    }

    themeToggle.addEventListener("click", function() {
        const newTheme = body.classList.contains("dark-theme") ? "light" : "dark";
        applyTheme(newTheme);
    });
});
