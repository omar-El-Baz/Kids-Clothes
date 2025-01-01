<?php
// Database connection
$host = 'localhost';
$dbname = 'kids_clothing_store';
$username = 'root';
$password = '';
try {
   $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
   die("Database connection failed: " . $e->getMessage());
}
// Fetch product data
$product_id = $_GET['id'] ?? 1; // Default to product ID 1 if no ID is passed
$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$product_id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$product) {
   die("Product not found.");
}
// Decode sizes (stored as JSON in the database)
$sizes = json_decode($product['sizes'], true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($product['name']); ?></title>
<link rel="stylesheet" href="../../public/css/product-details.css">
</head>
<body>
<header class="header">
<div class="logo">
<a href="../../index.html"><img src="../../public/images/baby-boy.svg" alt="Logo"></a>
</div>
<div class="search-bar">
<input type="text" placeholder="Search...">
</div>
<div class="icons">
<div class="icon">
<img src="../../public/images/user.svg" width="30" height="30">
<div class="icon-dropdown">
<a href="./user/profile.html">Profile</a>
<a href="./user/orders.html">Orders</a>
</div>
</div>
<div class="icon"><a href="./auth/signup.html"><img src="../../public/images/login.png" width="30" height="30"></a></div>
<div class="icon"><a href="./wishlist.html"><img src="../../public/images/e-commerce.svg" width="30" height="30"></a></div>
<div class="icon"><a href="./cart.html"><img src="../../public/images/shopping-cart.svg" width="30" height="30"></a></div>
</div>
</header>
<div class="product-page">
<div class="product-image">
<img src="../../public/images/<?php echo htmlspecialchars($product['image']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
</div>
<div class="product-details">
<h1 class="product-title"><?php echo htmlspecialchars($product['name']); ?></h1>
<p><?php echo htmlspecialchars($product['description']); ?></p>
<p class="product-price">
<span class="current-price"><?php echo number_format($product['price'], 2); ?> EGP</span>
<?php if ($product['discount'] > 0): ?>
<span class="original-price"><?php echo number_format($product['price'] / (1 - $product['discount'] / 100), 2); ?> EGP</span>
<span class="discount">Save <?php echo htmlspecialchars($product['discount']); ?>%</span>
<?php endif; ?>
</p>
<div class="size-selection">
<p>Choose Size</p>
<?php foreach ($sizes as $size): ?>
<button class="size-button"><?php echo htmlspecialchars($size); ?></button>
<?php endforeach; ?>
</div>
<button class="order-button" id="addToCart">ADD TO CART</button>
<button class="order-button" id="addToFavorite">ADD TO FAVORITE</button>
</div>
</div>
<script src="../../public/js/product-details.js"></script>
</body>
</html>
