let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const emptyMessage = document.getElementById('emptyMessage');
const wishlistContainer = document.getElementById('wishlistContainer');
const wishlistItemsContainer = document.querySelector('.wishlist-items');
function removeFromWishlist(name) {
   wishlist = wishlist.filter(item => item.title !== name); 
   localStorage.setItem('wishlist', JSON.stringify(wishlist)); 
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
<img src="${item.imgSrc}" alt="${item.title}">
<p>${item.title}</p>
<p class="price">${item.price}</p>
<button class="remove-button" onclick="removeFromWishlist('${item.title}')">Remove</button>
</div>`
           )
           .join('');
   }
}
updateWishlist();
