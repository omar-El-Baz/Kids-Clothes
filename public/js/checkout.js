document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
         window.location.href = "../../index.html"; // Redirect to index.html

    alert('Payment successful! Thank you for your purchase.');
});


// Handle checkout form submission
document.getElementById("checkout-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Payment successful! Thank you for your purchase.");
    localStorage.removeItem("cart"); // Clear cart after successful checkout
});
