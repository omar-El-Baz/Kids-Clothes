let cart = [];
const addToCartButton = document.getElementById('addToCart');
const addToFavoriteButton = document.getElementById('addToFavorite');
const sizeButtons = document.querySelectorAll('.size-button');
let selectedSize = null;

const product = {
    title: document.querySelector('.product-title').textContent,
    price: document.querySelector('.current-price').textContent,
    imgSrc: document.querySelector('.product-image img').src,
};

// Function to select size
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedSize = button.textContent;
    });
});

function addToCart() {
    if (!selectedSize) {
        alert('Please select a size before adding to cart.');
        return;
    }

    const cartProduct = { ...product, size: selectedSize };
    if (!cart.some(item => item.title === cartProduct.title && item.size === cartProduct.size)) {
        cart.push(cartProduct);
        alert(`${cartProduct.title} (Size: ${cartProduct.size}) has been added to your cart.`);
    } else {
        alert(`${cartProduct.title} (Size: ${cartProduct.size}) is already in your cart.`);
    }
    console.log("Cart:", cart);
}

function addToWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some(item => item.title === product.title)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.title} has been added to your wishlist.`);
    } else {
        alert(`${product.title} is already in your wishlist.`);
    }
    console.log("Wishlist:", wishlist);
}

addToCartButton.addEventListener('click', addToCart);
addToFavoriteButton.addEventListener('click', addToWishlist);
