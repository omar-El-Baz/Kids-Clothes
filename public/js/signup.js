// signup.js

document.getElementById("logInBtn").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission

    // Get the form input values
    var region = document.getElementById("country").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("cPassword").value;

    // Validate required fields
    if (region === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Validate email format
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Successful registration
    alert("Registration successful!");

    // Redirect to the index.html page
    window.location.href = "../../../index.html";  // Adjust the path if needed
});
