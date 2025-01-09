document.addEventListener("DOMContentLoaded", function () {
    // *** Utility Functions ***
    const show = (element) => (element.style.display = "block");
    const hide = (element) => (element.style.display = "none");
    const sanitizeInput = (input) => input.replace(/[<>\/\\]/g, ""); // Remove harmful characters

    // *** Mobile Navigation Toggle ***
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".nav-links-mobile");

    menuToggle.addEventListener("click", () => {
        if (mobileNav.style.display === "flex") {
            hide(mobileNav);
        } else {
            show(mobileNav);
            mobileNav.style.flexDirection = "column"; 
        }
    });

    // *** Smooth Scrolling for Navigation Links ***
    const smoothScrollLinks = document.querySelectorAll(".nav-links a, .nav-links-mobile a");
    smoothScrollLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            // Close mobile menu after navigation (for mobile nav links)
            if (mobileNav.style.display === "flex") {
                hide(mobileNav);
            }
        });
    });

    // *** Back-to-Top Button ***
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            show(backToTopButton);
        } else {
            hide(backToTopButton);
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // *** Highlight Active Section in Navbar ***
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a, .nav-links-mobile a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // *** Form Validation with Try-Catch and Sanitization ***
    const form = document.querySelector(".contact form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        try {
            // Sanitize inputs
            nameInput.value = sanitizeInput(nameInput.value);
            emailInput.value = sanitizeInput(emailInput.value);
            messageInput.value = sanitizeInput(messageInput.value);

            // Name Validation
            if (!nameInput.value.trim()) {
                nameError.textContent = "Please enter your name.";
                nameError.classList.add("active");
                isValid = false;
            } else if (nameInput.value.length < 2) {
                nameError.textContent = "Name must be at least 2 characters long.";
                nameError.classList.add("active");
                isValid = false;
            } else {
                nameError.classList.remove("active");
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = "Email is required.";
                emailError.classList.add("active");
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = "Please enter a valid email address.";
                emailError.classList.add("active");
                isValid = false;
            } else {
                emailError.classList.remove("active");
            }

            // Message Validation
            if (!messageInput.value.trim()) {
                messageError.textContent = "Message is required.";
                messageError.classList.add("active");
                isValid = false;
            } else if (messageInput.value.length > 800) {
                messageError.textContent = "Message must be less than 800 characters.";
                messageError.classList.add("active");
                isValid = false;
            } else {
                messageError.classList.remove("active");
            }

            // Submit Form if Valid
            if (isValid) {
                alert("Thank you for your message! I will get back to you soon.");
                form.reset();
            }
        } catch (error) {
            console.error("An error occurred during form validation:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    });

    // *** Lazy Loading for Images ***
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach((image) => {
        imageObserver.observe(image);
    });

    // *** Scroll Progress Indicator ***
    const scrollProgressContainer = document.getElementById("scroll-progress-container");
    const scrollProgress = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + "%";
    });

    // *** Theme Toggle (Dark Mode) ***
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
