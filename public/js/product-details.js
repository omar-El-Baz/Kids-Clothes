let wishlist = [];
const emptyMessage = document.getElementById('emptyMessage');
const wishlistContainer = document.getElementById('wishlistContainer');
const wishlistItemsContainer = document.querySelector('.wishlist-items');
function addToWishlist(name, imgSrc, price) {
 if (!wishlist.some(item => item.name === name)) {
   wishlist.push({ name, imgSrc, price });
   updateWishlist();
 }
}
function removeFromWishlist(name) {
 wishlist = wishlist.filter(item => item.name !== name);
 updateWishlist();
}
function updateWishlist() {
 if (wishlist.length === 0) {
   emptyMessage.style.display = 'flex';
   wishlistContainer.style.display = 'none';
 } else {
   emptyMessage.style.display = 'none';
   wishlistContainer.style.display = 'block';
   wishlistItemsContainer.innerHTML = wishlist
     .map(
       item => `
<div class="wishlist-item">
<img src="${item.imgSrc}" alt="${item.name}">
<p>${item.name}</p>
<p class="price">${item.price}</p>
<button class="remove-button" onclick="removeFromWishlist('${item.name}')">Remove</button>
</div>`
     )
     .join('');
 }
}
 
updateWishlist();
