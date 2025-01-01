// Dynamically load sizes and add interactivity
document.addEventListener("DOMContentLoaded", () => {
   const sizeContainer = document.querySelector(".size-selection");
   const availableSizes = sizeContainer.dataset.sizes.split(",");
   // Create size buttons dynamically
   availableSizes.forEach(size => {
       const sizeButton = document.createElement("button");
       sizeButton.className = "size-button";
       sizeButton.textContent = size;
       sizeContainer.appendChild(sizeButton);
       // Add click event to select a size
       sizeButton.addEventListener("click", () => {
           document.querySelectorAll(".size-button").forEach(btn => btn.classList.remove("selected"));
           sizeButton.classList.add("selected");
       });
   });
   // Add to Cart button event
   document.querySelector(".add-to-cart").addEventListener("click", (e) => {
       const productId = e.target.dataset.productId;
       const selectedSize = document.querySelector(".size-button.selected")?.textContent;
       if (!selectedSize) {
           alert("Please select a size before adding to cart!");
           return;
       }
       alert(`Product ID: ${productId}, Size: ${selectedSize} added to cart.`);
       // Replace alert with AJAX call to add to cart
   });
   // Add to Wishlist button event
   document.querySelector(".add-to-wishlist").addEventListener("click", (e) => {
       const productId = e.target.dataset.productId;
       alert(`Product ID: ${productId} added to wishlist.`);
       // Replace alert with AJAX call to add to wishlist
   });
});
