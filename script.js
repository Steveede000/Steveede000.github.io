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

    // Toggle descriptions
    const descriptionToggles = document.querySelectorAll('.toggle-description');

    descriptionToggles.forEach(button => {
        button.addEventListener('click', function() {
            const description = this.nextElementSibling;
            const container = this.parentElement;

            if (description.style.display === "block") {
                description.style.display = "none";
                container.style.height = "auto";
                this.textContent = "Show Description";
            } else {
                description.style.display = "block";
                container.style.height = container.scrollHeight + "px";
                this.textContent = "Hide Description";
            }
        });
    });

    // Image pop-out functionality
    const images = document.querySelectorAll('.pop-out');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close');

    images.forEach(image => {
        image.addEventListener('click', function() {
            const rect = this.getBoundingClientRect();
            const scaleX = rect.width / window.innerWidth;
            const scaleY = rect.height / window.innerHeight;
            const startX = rect.left - (window.innerWidth / 2 - rect.width / 2);
            const startY = rect.top - (window.innerHeight / 2 - rect.height / 2);

            modalImg.style.setProperty('--start-x', `${startX}px`);
            modalImg.style.setProperty('--start-y', `${startY}px`);
            modalImg.style.setProperty('--start-scale', scaleX < scaleY ? scaleX : scaleY);

            modalImg.src = this.src;
            modal.classList.add('show');
        });
    });

    closeModal.addEventListener('click', function() {
        modal.classList.add('hide');
        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.remove('hide');
        }, 500); // Match the CSS transition duration
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hide');
            setTimeout(() => {
                modal.classList.remove('show');
                modal.classList.remove('hide');
            }, 500); // Match the CSS transition duration
        }
    });
});
