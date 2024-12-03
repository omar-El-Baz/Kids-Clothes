// Retrieve cart data from localStorage or initialize an empty array
let cartData = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = ""; // Clear the cart before rendering

    let total = 0;
    cartData.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(li);
        total += item.price;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    saveCart();
}

// Function to add a new item to the cart
function addItem(event) {
    event.preventDefault(); // Prevent form submission

    const itemName = document.getElementById("item-name").value.trim();
    const itemPrice = parseFloat(document.getElementById("item-price").value);

    if (itemName && !isNaN(itemPrice)) {
        cartData.push({ name: itemName, price: itemPrice });
        renderCart();
        document.getElementById("add-item-form").reset(); // Clear the form
    } else {
        alert("Please enter a valid name and price.");
    }
}

// Function to add the promotional item to the cart
function addPromoItem() {
    const promoItem = { name: "Limited Edition Product", price: 25.0 };
    cartData.push(promoItem);
    renderCart();
}

// Function to remove an item from the cart
function removeItem(index) {
    cartData.splice(index, 1); // Remove item at the specified index
    renderCart();
}

// Save cart data to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartData));
}

// Navigate to the checkout page
function goToCheckout() {
    window.location.href = "checkout.html";
}

// Initialize the page by rendering the cart
renderCart();

// Add event listener for the Add Item form
document.getElementById("add-item-form").addEventListener("submit", addItem);
