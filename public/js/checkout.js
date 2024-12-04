

// Handle checkout form submission
document.getElementById("checkout-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Payment successful! Thank you for your purchase.");
    window.location.href = "../../index.html"; // Redirect to index.html
    localStorage.removeItem("cart"); // Clear cart after successful checkout
});
