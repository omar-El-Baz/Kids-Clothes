// wishlist.js
document.addEventListener('DOMContentLoaded', function() {
   // Check if user is logged in
   const customerId = localStorage.getItem('customer_id');
   if (!customerId) {
       showEmptyMessage('Please log in to view your wishlist');
       return;
   }
   loadWishlistItems();
});
async function loadWishlistItems() {
   const customerId = localStorage.getItem('customer_id');
   const loadingSpinner = document.getElementById('loadingSpinner');
   const wishlistContainer = document.getElementById('wishlistContainer');
   const emptyMessage = document.getElementById('emptyMessage');
   try {
       loadingSpinner.style.display = 'block';
       wishlistContainer.style.display = 'none';
       emptyMessage.style.display = 'none';
       const response = await fetch(`/api/wishlist/get.php?customer_id=${customerId}`);
       const data = await response.json();
       if (!response.ok) {
           throw new Error(data.message || 'Error loading wishlist');
       }
       if (data.length === 0) {
           showEmptyMessage();
           return;
       }
       displayWishlistItems(data);
   } catch (error) {
       console.error('Error loading wishlist:', error);
       showError('Failed to load wishlist items');
   } finally {
       loadingSpinner.style.display = 'none';
   }
}
function displayWishlistItems(items) {
   const container = document.querySelector('.wishlist-items');
   const wishlistContainer = document.getElementById('wishlistContainer');
   container.innerHTML = '';
   items.forEach(item => {
       const itemElement = document.createElement('div');
       itemElement.className = 'wishlist-item';
       itemElement.innerHTML = `
<img src="${item.image_url || '../../public/images/placeholder.jpg'}"
                alt="${item.name}"
                onerror="this.src='../../public/images/placeholder.jpg'">
<h3 class="product-name">${item.name}</h3>
<p class="product-price">$${parseFloat(item.price).toFixed(2)}</p>
<p class="stock-status ${item.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
               ${item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
</p>
<div class="button-group">
<button class="remove-button" onclick="removeFromWishlist(${item.product_id})">
<i class="fas fa-trash-alt"></i> Remove
</button>
<button class="add-to-cart-button"
                       onclick="addToCart(${item.product_id})"
                       ${item.stock_quantity === 0 ? 'disabled' : ''}>
<i class="fas fa-shopping-cart"></i> Add to Cart
</button>
</div>
       `;
       container.appendChild(itemElement);
   });
   document.getElementById('emptyMessage').style.display = 'none';
   wishlistContainer.style.display = 'block';
}
async function removeFromWishlist(productId) {
   const customerId = localStorage.getItem('customer_id');
   if (!customerId) return;
   try {
       const response = await fetch('/api/wishlist/remove.php', {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               customer_id: customerId,
               product_id: productId
           })
       });
       const data = await response.json();
       if (response.ok) {
           loadWishlistItems(); // Reload the wishlist
       } else {
           throw new Error(data.message || 'Failed to remove item');
       }
   } catch (error) {
       console.error('Error removing item:', error);
       showError('Failed to remove item from wishlist');
   }
}
async function addToCart(productId) {
   const customerId = localStorage.getItem('customer_id');
   if (!customerId) {
       showError('Please log in to add items to cart');
       return;
   }
   try {
       const response = await fetch('/api/cart/add.php', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               customer_id: customerId,
               product_id: productId,
               quantity: 1
           })
       });
       const data = await response.json();
       if (response.ok) {
           showSuccess('Item added to cart successfully');
       } else {
           throw new Error(data.message || 'Failed to add item to cart');
       }
   } catch (error) {
       console.error('Error adding to cart:', error);
       showError('Failed to add item to cart');
   }
}
function showEmptyMessage(message = 'Your Wishlist Is Empty!') {
   const emptyMessage = document.getElementById('emptyMessage');
   const wishlistContainer = document.getElementById('wishlistContainer');
   const messageElement = emptyMessage.querySelector('p');
   messageElement.textContent = message;
   emptyMessage.style.display = 'flex';
   wishlistContainer.style.display = 'none';
}
function showError(message) {
   // Implement your error notification system here
   alert(message); // Basic implementation, consider using a toast notification system
}
function showSuccess(message) {
   // Implement your success notification system here
   alert(message); // Basic implementation, consider using a toast notification system
}
