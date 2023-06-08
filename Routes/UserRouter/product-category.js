const express = require("express");
const router = express.Router();
const productCategoryController = require("../../Controller/User/product-category");
const upload = require("../../services/upload");

const verfiyToken = require("../../Middleware/auth");

// Create a new product category
router.post(
    "/product-categories",
    upload.single("image"), verfiyToken,
    productCategoryController.createProductCategory
);

// Get all product categories
router.get(
    "/product-categories", verfiyToken,
    productCategoryController.getProductCategories
);

// Get a single product category by ID
router.get(
    "/product-categories/:id", verfiyToken,
    productCategoryController.getProductCategoryById
);

// Update a product category by ID
router.put(
    "/product-categories/:id", verfiyToken,
    productCategoryController.updateProductCategoryById
);

// Delete a product category by ID
router.delete(
    "/product-categories/:id", verfiyToken,
    productCategoryController.deleteProductCategoryById
);

module.exports = router;
