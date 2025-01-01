<?php
// config/Database.php
class Database {
   private $host = "localhost";
   private $db_name = "kids_clothing_store";
   private $username = "root"; // Update with your database username
   private $password = ""; // Update with your database password
   private $conn;
   public function getConnection() {
       $this->conn = null;
       try {
           $this->conn = new PDO(
               "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
               $this->username,
               $this->password
           );
           $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       } catch(PDOException $e) {
           echo "Connection Error: " . $e->getMessage();
       }
       return $this->conn;
   }
}
// classes/WishlistController.php
class WishlistController {
   private $conn;
   private $table_name = "wishlist";
   public function __construct($db) {
       $this->conn = $db;
   }
   // Add product to wishlist
   public function addToWishlist($customer_id, $product_id) {
       // First check if product exists and is in stock
       if (!$this->checkProductAvailability($product_id)) {
           return [
               'success' => false,
               'message' => 'Product is not available'
           ];
       }
       // Check if item is already in wishlist
       if ($this->isInWishlist($customer_id, $product_id)) {
           return [
               'success' => false,
               'message' => 'Product is already in wishlist'
           ];
       }
       try {
           $query = "INSERT INTO " . $this->table_name . "
                   (customer_id, product_id)
                   VALUES (:customer_id, :product_id)";
           $stmt = $this->conn->prepare($query);
           // Sanitize input
           $customer_id = htmlspecialchars(strip_tags($customer_id));
           $product_id = htmlspecialchars(strip_tags($product_id));
           $stmt->bindParam(":customer_id", $customer_id);
           $stmt->bindParam(":product_id", $product_id);
           if ($stmt->execute()) {
               return [
                   'success' => true,
                   'message' => 'Product added to wishlist successfully'
               ];
           }
       } catch (PDOException $e) {
           return [
               'success' => false,
               'message' => 'Database error: ' . $e->getMessage()
           ];
       }
       return [
           'success' => false,
           'message' => 'Unable to add product to wishlist'
       ];
   }
   // Remove product from wishlist
   public function removeFromWishlist($customer_id, $product_id) {
       try {
           $query = "DELETE FROM " . $this->table_name . "
                   WHERE customer_id = :customer_id
                   AND product_id = :product_id";
           $stmt = $this->conn->prepare($query);
           // Sanitize input
           $customer_id = htmlspecialchars(strip_tags($customer_id));
           $product_id = htmlspecialchars(strip_tags($product_id));
           $stmt->bindParam(":customer_id", $customer_id);
           $stmt->bindParam(":product_id", $product_id);
           if ($stmt->execute()) {
               return [
                   'success' => true,
                   'message' => 'Product removed from wishlist successfully'
               ];
           }
       } catch (PDOException $e) {
           return [
               'success' => false,
               'message' => 'Database error: ' . $e->getMessage()
           ];
       }
       return [
           'success' => false,
           'message' => 'Unable to remove product from wishlist'
       ];
   }
   // Get all wishlist items for a customer
   public function getWishlistItems($customer_id) {
       try {
           $query = "SELECT
                       w.wishlist_id,
                       w.added_date,
                       p.product_id,
                       p.name,
                       p.description,
                       p.price,
                       p.image_url,
                       p.stock_quantity,
                       p.category
                   FROM " . $this->table_name . " w
                   JOIN products p ON w.product_id = p.product_id
                   WHERE w.customer_id = :customer_id
                   ORDER BY w.added_date DESC";
           $stmt = $this->conn->prepare($query);
           // Sanitize input
           $customer_id = htmlspecialchars(strip_tags($customer_id));
           $stmt->bindParam(":customer_id", $customer_id);
           $stmt->execute();
           return $stmt->fetchAll(PDO::FETCH_ASSOC);
       } catch (PDOException $e) {
           return false;
       }
   }
   // Check if product exists and is in stock
   private function checkProductAvailability($product_id) {
       try {
           $query = "SELECT stock_quantity
                   FROM products
                   WHERE product_id = :product_id";
           $stmt = $this->conn->prepare($query);
           $stmt->bindParam(":product_id", $product_id);
           $stmt->execute();
           if ($stmt->rowCount() > 0) {
               $row = $stmt->fetch(PDO::FETCH_ASSOC);
               return $row['stock_quantity'] > 0;
           }
           return false;
       } catch (PDOException $e) {
           return false;
       }
   }
   // Check if product is already in wishlist
   private function isInWishlist($customer_id, $product_id) {
       try {
           $query = "SELECT wishlist_id
                   FROM " . $this->table_name . "
                   WHERE customer_id = :customer_id
                   AND product_id = :product_id";
           $stmt = $this->conn->prepare($query);
           $stmt->bindParam(":customer_id", $customer_id);
           $stmt->bindParam(":product_id", $product_id);
           $stmt->execute();
           return $stmt->rowCount() > 0;
       } catch (PDOException $e) {
           return false;
       }
   }
}
// api/wishlist/add.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../../config/Database.php';
include_once '../../classes/WishlistController.php';
// Get database connection
$database = new Database();
$db = $database->getConnection();
// Initialize wishlist controller
$wishlist = new WishlistController($db);
// Get posted data
$data = json_decode(file_get_contents("php://input"));
// Validate input
if (empty($data->customer_id) || empty($data->product_id)) {
   http_response_code(400);
   echo json_encode(array("message" => "Missing required parameters."));
   exit();
}
// Add to wishlist
$result = $wishlist->addToWishlist($data->customer_id, $data->product_id);
if ($result['success']) {
   http_response_code(200);
} else {
   http_response_code(400);
}
echo json_encode($result);
// api/wishlist/remove.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../../config/Database.php';
include_once '../../classes/WishlistController.php';
$database = new Database();
$db = $database->getConnection();
$wishlist = new WishlistController($db);
$data = json_decode(file_get_contents("php://input"));
if (empty($data->customer_id) || empty($data->product_id)) {
   http_response_code(400);
   echo json_encode(array("message" => "Missing required parameters."));
   exit();
}
$result = $wishlist->removeFromWishlist($data->customer_id, $data->product_id);
if ($result['success']) {
   http_response_code(200);
} else {
   http_response_code(400);
}
echo json_encode($result);
// api/wishlist/get.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../../config/Database.php';
include_once '../../classes/WishlistController.php';
$database = new Database();
$db = $database->getConnection();
$wishlist = new WishlistController($db);
if (!isset($_GET['customer_id'])) {
   http_response_code(400);
   echo json_encode(array("message" => "Missing customer ID."));
   exit();
}
$items = $wishlist->getWishlistItems($_GET['customer_id']);
if ($items) {
   http_response_code(200);
   echo json_encode($items);
} else {
   http_response_code(404);
   echo json_encode(array("message" => "No items found in wishlist."));
}
