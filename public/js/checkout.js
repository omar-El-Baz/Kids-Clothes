document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
         window.location.href = "../../index.html"; // Redirect to index.html

    alert('Payment successful! Thank you for your purchase.');
});
function goToCheckout() {
    window.location.href = "checkout.html";
}
// Load cart data on the checkout page
function loadCheckoutCart() {
    const cartItemsContainer = document.getElementById("checkout-cart-items");
    const cartTotalElement = document.getElementById("checkout-cart-total");

    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = ""; // Clear the cart before rendering

    let total = 0;
    cartData.forEach((item) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(li);
        total += item.price;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Call loadCheckoutCart if we're on the checkout page
if (document.getElementById("checkout-cart-items")) {
    loadCheckoutCart();
}

// Handle checkout form submission
document.getElementById("checkout-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Payment successful! Thank you for your purchase.");
    localStorage.removeItem("cart"); // Clear cart after successful checkout
});
