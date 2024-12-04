
let wishlist = [];
let cart = [];
const addToCartButton = document.getElementById('addToCart');
const addToFavoriteButton = document.getElementById('addToFavorite');
const product = {
   title: document.querySelector('.product-title').textContent,
   price: document.querySelector('.current-price').textContent,
   imgSrc: document.querySelector('.product-image img').src,
};
function addToCart() {
   if (!cart.some(item => item.title === product.title)) {
       cart.push(product);
       alert(`${product.title} has been added to your cart.`);
   } else {
       alert(`${product.title} is already in your cart.`);
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
