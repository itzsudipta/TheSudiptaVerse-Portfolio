document.addEventListener("DOMContentLoaded", () => {
    try {
        // ===== TYPING ANIMATION =====
        const el = document.getElementById("typer");

        if (el) {
            const lines = [
                "Full-Stack Developer",
                "Open Source Contributor",
                "Final Year CS @ NiT"
            ];

            let li = 0, ci = 0, deleting = false;

            function tick() {
                const word = lines[li];

                if (!deleting) {
                    el.textContent = word.slice(0, ++ci);

                    if (ci === word.length) {
                        deleting = true;
                        setTimeout(tick, 1800);
                        return;
                    }
                } else {
                    el.textContent = word.slice(0, --ci);

                    if (ci === 0) {
                        deleting = false;
                        li = (li + 1) % lines.length;
                        setTimeout(tick, 400);
                        return;
                    }
                }

                setTimeout(tick, deleting ? 40 : 75);
            }

            tick();
        } else {
            console.warn("Typer element not found — skipping typing animation");
        }

        // ===== MOBILE NAV =====
        const toggle = document.querySelector(".nav-toggle");
        const menu = document.getElementById("nav-menu");

        if (!toggle || !menu) {
            console.warn("Nav elements missing — skipping menu script");
            return;
        }

        const root = document.documentElement;

        const setOpen = (open) => {
            root.classList.toggle("nav-open", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        };

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            setOpen(!root.classList.contains("nav-open"));
        });

        menu.addEventListener("click", (e) => {
            const target = e.target;
            if (target instanceof Element && target.closest("a")) setOpen(false);
        });

        document.addEventListener("click", (e) => {
            if (!root.classList.contains("nav-open")) return;
            const target = e.target;
            if (!(target instanceof Node)) return;
            if (toggle.contains(target) || menu.contains(target)) return;
            setOpen(false);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") setOpen(false);
        });

        const mql = window.matchMedia("(max-width: 620px)");
        const handleChange = () => {
            if (!mql.matches) setOpen(false);
        };

        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", handleChange);
        } else if (typeof mql.addListener === "function") {
            mql.addListener(handleChange);
        }

        // ===== EMAILJS INIT =====
        (function () {
            emailjs.init("UcvQykz86DqewkZPW"); // Replace with your EmailJS user ID
        })();

        document.getElementById('contact-form').addEventListener('submit', function (event) {
            event.preventDefault();

            const form = this;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Change button text to show sending
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            emailjs.sendForm('service_n4s56cl', 'template_3j1vqfb', this)
                .then(function () {
                    console.log('SUCCESS!');
                    // On success, show "Message Sent" with a checkmark
                    submitButton.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Message Sent
                    `;

                    // Revert button back to original state after 3 seconds
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                        form.reset(); // Optionally reset the form fields
                    }, 3000);

                }, function (error) {
                    console.log('FAILED...', error);
                    // On failure, show an error message
                    submitButton.innerHTML = 'Failed';

                    // Revert button back to original state after 3 seconds
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                    }, 3000);
                });
        });

    } catch (err) {
        console.error("Script failed safely:", err);
    }
});