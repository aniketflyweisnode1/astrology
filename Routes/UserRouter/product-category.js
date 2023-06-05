const express = require("express");
const router = express.Router();
const productCategoryController = require("../../Controller/User/product-category");
const upload = require("../../services/upload");

// Create a new product category
router.post(
    "/product-categories",
    upload.single("image"),
    productCategoryController.createProductCategory
);

// Get all product categories
router.get(
    "/product-categories",
    productCategoryController.getProductCategories
);

// Get a single product category by ID
router.get(
    "/product-categories/:id",
    productCategoryController.getProductCategoryById
);

// Update a product category by ID
router.put(
    "/product-categories/:id",
    productCategoryController.updateProductCategoryById
);

// Delete a product category by ID
router.delete(
    "/product-categories/:id",
    productCategoryController.deleteProductCategoryById
);

module.exports = router;
