let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const emptyMessage = document.getElementById('emptyMessage');
const wishlistContainer = document.getElementById('wishlistContainer');
const wishlistItemsContainer = document.querySelector('.wishlist-items');
function removeFromWishlist(name) {
   wishlist = wishlist.filter(item => item.title !== name); // Remove the item
   localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage
   updateWishlist(); // Refresh the display
}
function updateWishlist() {
   if (wishlist.length === 0) {
       emptyMessage.style.display = 'flex'; // Show empty message
       wishlistContainer.style.display = 'none'; // Hide wishlist container
   } else {
       emptyMessage.style.display = 'none'; // Hide empty message
       wishlistContainer.style.display = 'block'; // Show wishlist container
       wishlistItemsContainer.innerHTML = wishlist
           .map(
               item => `
<div class="wishlist-item">
<img src="${item.imgSrc}" alt="${item.title}">
<p>${item.title}</p>
<p class="price">${item.price}</p>
<button class="remove-button" onclick="removeFromWishlist('${item.title}')">Remove</button>
</div>`
           )
           .join('');
   }
}
// Load the wishlist when the page is loaded
updateWishlist();
