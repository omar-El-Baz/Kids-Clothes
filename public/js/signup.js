// login-signup.js

document.getElementById("logInBtn").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    // Get values from the form fields
    var region = document.getElementById("country").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("cPassword").value;

    // Check if all required fields are filled
    if (region === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill out all fields.");
        return;  // Stop further execution if validation fails
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Successful registration
    alert("Registration successful!");
    // Redirect to the index.html page
    window.location.href = "../../../index.html";  // Adjust the path as necessary
});
