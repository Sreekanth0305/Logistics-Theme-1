document.addEventListener("DOMContentLoaded", () => {



    // COMMON PAGE LOADER

    const loader = document.querySelector(".page-loader");



    if (loader) {

        const hideLoader = () => {

            setTimeout(() => loader.classList.add("hide"), 450);

        };



        if (document.readyState === "complete") {

            hideLoader();

        } else {

            window.addEventListener("load", hideLoader, { once: true });

            setTimeout(hideLoader, 1800);

        }

    }



    // MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.getElementById("navLinks");



    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

        });



        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => navLinks.classList.remove("open"));

        });

    }



    // SCROLL REVEAL ANIMATIONS

    const revealItems = document.querySelectorAll(".reveal");



    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, { threshold: 0.12 });



        revealItems.forEach(item => observer.observe(item));

    } else {

        revealItems.forEach(item => item.classList.add("visible"));

    }



    // DEMO STORAGE HELPERS

    const getUser = () => {

        try {

            return JSON.parse(localStorage.getItem("genzUser")) || {};

        } catch {

            return {};

        }

    };



    const saveUser = user => {

        localStorage.setItem("genzUser", JSON.stringify(user));

    };



    const showMessage = (element, message, success = false) => {

        if (!element) return;

        element.textContent = message;

        element.style.color = success ? "#16865F" : "#D94B5A";

        element.classList.add("show");

    };



    // USER PROFILE AND LOGOUT

    const profileMenu = document.getElementById("profileMenu");

    const profileButton = document.getElementById("profileButton");

    const profileName = document.getElementById("profileName");

    const profileAvatar = document.getElementById("profileAvatar");

    const logoutButton = document.getElementById("logoutButton");



    const loggedIn = localStorage.getItem("genzLoggedIn") === "true";

    const currentUser = getUser();



    // Show logged-in user's profile

    if (profileMenu) {

        if (loggedIn && currentUser.name) {

            profileMenu.style.display = "inline-block";



            if (profileName) {

                profileName.textContent = currentUser.name;

            }



            if (profileAvatar) {

                profileAvatar.textContent =

                    currentUser.name.charAt(0).toUpperCase();

            }

        } else {

            profileMenu.style.display = "none";

        }

    }



    // Open and close profile dropdown

    if (profileButton && profileMenu) {

        profileButton.addEventListener("click", () => {

            profileMenu.classList.toggle("open");

        });



        document.addEventListener("click", event => {

            if (!profileMenu.contains(event.target)) {

                profileMenu.classList.remove("open");

            }

        });

    }



    // LOGOUT

    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            localStorage.removeItem("genzLoggedIn");

            window.location.href = "login.html";

        });

    }



    // PASSWORD VISIBILITY

    document.querySelectorAll("[data-password-toggle]").forEach(button => {

        button.addEventListener("click", () => {

            const field = document.getElementById(button.dataset.passwordToggle);

            if (!field) return;

            field.type = field.type === "password" ? "text" : "password";

            button.textContent = field.type === "password" ? "Show" : "Hide";

        });

    });



    // SIGNUP

    const signupForm = document.getElementById("signupForm");



    if (signupForm) {

        signupForm.addEventListener("submit", event => {

            event.preventDefault();



            const name = document.getElementById("fullName").value.trim();

            const email = document.getElementById("signupEmail").value.trim();

            const password = document.getElementById("signupPassword").value;

            const terms = document.getElementById("agreeTerms");



            if (!name || !email || !password) {

                alert("Please complete all required fields.");

                return;

            }



            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                alert("Please enter a valid email address.");

                return;

            }



            if (password.length < 8) {

                alert("Password must contain at least 8 characters.");

                return;

            }



            if (terms && !terms.checked) {

                alert("Please accept the terms and conditions.");

                return;

            }



            saveUser({ name, email, password });

            localStorage.setItem("genzPendingEmail", email);

            window.location.href = "email-verification.html";

        });

    }



    // SHOW PENDING EMAIL

    const pendingEmail = document.getElementById("pendingEmail");



    if (pendingEmail) {

        pendingEmail.textContent =

            localStorage.getItem("genzPendingEmail") || "your email address";

    }



    // EMAIL VERIFICATION - DEMO OTP

    const verifyForm = document.getElementById("verificationForm");



    if (verifyForm) {

        verifyForm.addEventListener("submit", event => {

            event.preventDefault();



            const otp = [...document.querySelectorAll(".otp-input")]

                .map(input => input.value.trim()).join("");



            if (otp.length !== 6) {

                alert("Please enter all six digits.");

                return;

            }



            if (otp !== "123456") {

                alert("Incorrect code. For this demo, use 123456.");

                return;

            }



            localStorage.setItem("genzEmailVerified", "true");

            window.location.href = "account-created.html";

        });

    }



    // OTP AUTO ADVANCE

    const otpInputs = [...document.querySelectorAll(".otp-input")];



    otpInputs.forEach((input, index) => {

        input.addEventListener("input", () => {

            input.value = input.value.replace(/\D/g, "").slice(0, 1);

            if (input.value && otpInputs[index + 1]) {

                otpInputs[index + 1].focus();

            }

        });



        input.addEventListener("keydown", event => {

            if (event.key === "Backspace" && !input.value && otpInputs[index - 1]) {

                otpInputs[index - 1].focus();

            }

        });

    });



    // LOGIN

    const loginForm = document.getElementById("loginForm");



    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();



            const email = document.getElementById("loginEmail").value.trim();

            const password = document.getElementById("loginPassword").value;

            const user = getUser();



            if (!user.email) {

                alert("No demo account found. Please sign up first.");

                window.location.href = "signup.html";

                return;

            }



            if (email.toLowerCase() !== user.email.toLowerCase() ||

                password !== user.password) {

                alert("Invalid email or password.");

                return;

            }



            localStorage.setItem("genzLoggedIn", "true");

            window.location.href = "index.html";

        });

    }



    // FORGOT PASSWORD

    const forgotForm = document.getElementById("forgotForm");



    if (forgotForm) {

        forgotForm.addEventListener("submit", event => {

            event.preventDefault();



            const email = document.getElementById("forgotEmail").value.trim();

            const user = getUser();



            if (!user.email || email.toLowerCase() !== user.email.toLowerCase()) {

                alert("No account found with that email.");

                return;

            }



            localStorage.setItem("genzResetEmail", email);

            window.location.href = "reset-password.html";

        });

    }



    // RESET PASSWORD

    const resetForm = document.getElementById("resetForm");



    if (resetForm) {

        resetForm.addEventListener("submit", event => {

            event.preventDefault();



            const password = document.getElementById("newPassword").value;

            const confirm = document.getElementById("confirmPassword").value;



            if (password.length < 8) {

                alert("Password must contain at least 8 characters.");

                return;

            }



            if (password !== confirm) {

                alert("Passwords do not match.");

                return;

            }



            const user = getUser();



            if (!user.email) {

                alert("Please create an account first.");

                window.location.href = "signup.html";

                return;

            }



            user.password = password;

            saveUser(user);

            window.location.href = "password-reset-success.html";

        });

    }



    // SHIPMENT TRACKING DEMO

    const trackingForm = document.getElementById("trackingForm");



    if (trackingForm) {

        trackingForm.addEventListener("submit", event => {

            event.preventDefault();



            const trackingInput = document.getElementById("trackingNumber");

            const trackingNumber = trackingInput.value.trim();



            if (!trackingNumber) {

                alert("Please enter your tracking number.");

                return;

            }



            // Demo tracking ID. Use this ID to view the sample shipment.

            if (trackingNumber.toUpperCase() === "SLX4567U890") {

                localStorage.setItem("genzTrackingNumber", "SLX4567U890");

                window.location.href = "tracking-result.html";

            } else {

                localStorage.setItem("genzTrackingNumber", trackingNumber);

                window.location.href = "tracking-not-found.html";

            }

        });

    }



    // DISPLAY TRACKING NUMBER

    document.querySelectorAll("[data-tracking-number]").forEach(element => {

        element.textContent =

            localStorage.getItem("genzTrackingNumber") || "SLX4567U890";

    });



    // RESEND DEMO OTP

    const resendCode = document.getElementById("resendCode");



    if (resendCode) {

        resendCode.addEventListener("click", () => {

            alert("Demo verification code: 123456");

        });

    }



});
