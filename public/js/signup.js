document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('logInBtn');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const cPasswordField = document.getElementById('cPassword');
    const countryField = document.getElementById('country');
    const forgetPasswordLink = document.getElementById('forgetPassword');
    const signUpButton = document.querySelector('.buttont');

    // Form submission event
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate region selection
        if (countryField.value === "") {
            alert("Please select a region.");
            return;
        }

        // Validate email format
        const email = emailField.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate passwords match
        const password = passwordField.value;
        const confirmPassword = cPasswordField.value;
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        alert("Registration successful!");
        form.reset();
    });

    // Forgot Password click event
    forgetPasswordLink.addEventListener('click', function () {
        alert("Redirecting to password recovery page...");
    });

    // Social login events
    const gmailLogin = document.getElementById('gmail');
    const facebookLogin = document.getElementById('facebook');

    gmailLogin.addEventListener('click', function () {
        alert("Redirecting to Gmail login...");
    });

    facebookLogin.addEventListener('click', function () {
        alert("Redirecting to Facebook login...");
    });
});
