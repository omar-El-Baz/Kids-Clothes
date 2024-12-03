// login.js

document.getElementById("loginBtn").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevents the form from submitting

    // Get the values from the email and password input fields
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Basic validation
    if (validateEmail(email) && password !== "") {
        // Successful login
        alert("Login successful!");
        // Redirect to another page or dashboard
        window.location.href = "dashboard.html"; // Example redirect
    } else {
        // Show an error message
        alert("Please enter a valid email and password.");
    }
});

// Function to validate email format using regex
function validateEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}
