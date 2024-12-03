document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const signupEmail = document.getElementById("signupEmail").value;
    const signupPassword = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (signupEmail === "" || signupPassword === "" || confirmPassword === "") {
        alert("Please fill out all fields.");
    } else if (signupPassword !== confirmPassword) {
        alert("Passwords do not match.");
    } else {
        alert("Account created successfully!");
    }
});
