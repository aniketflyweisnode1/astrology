const app = require("express");
const path = require("path");
const router = app.Router();

const product = require("../../Controller/User/productControllers");
const upload = require("../../services/upload");
// console.log(upload);
router.post("/products", upload.array("image"), product.addproduct);
router.get("/products", product.getProducts);
router.get("/products/:id", product.getProduct);
router.get("/recommended-products/:id", product.getRecommendedProducts);
router.put("/editProduct/:id", product.editProduct);
router.delete("/deleteProduct/:id", product.deleteProduct);

module.exports = router;
