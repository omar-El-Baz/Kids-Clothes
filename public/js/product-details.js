
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

function addToCart() {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.some(item => item.title === product.title)) {

        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.title} has been added to your cart.`);

    } else {

        alert(`${product.title} is already in your cart.`);

    }

    console.log("Cart:", cart);

}
addToCartButton.addEventListener('click', addToCart);

addToFavoriteButton.addEventListener('click', addToWishlist); 
