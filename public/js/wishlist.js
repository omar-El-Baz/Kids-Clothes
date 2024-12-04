let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const emptyMessage = document.getElementById('emptyMessage');
const wishlistContainer = document.getElementById('wishlistContainer');
const wishlistItemsContainer = document.querySelector('.wishlist-items');

function addToWishlist(name, imgSrc, price) {
    // Check if the item already exists in the wishlist
    const itemExists = wishlist.some(item => item.title === name);
    if (!itemExists) {
        // Add the new item
        wishlist.push({ title: name, imgSrc: imgSrc, price: price });
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save to localStorage
        updateWishlist(); // Update the displayed wishlist
        alert(`${name} has been added to your wishlist!`);
    } else {
        alert(`${name} is already in your wishlist.`);
    }
}

function removeFromWishlist(name) {
    wishlist = wishlist.filter(item => item.title !== name);
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save updated list
    updateWishlist(); // Update the displayed wishlist
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

// Initialize the wishlist display on page load
updateWishlist();

