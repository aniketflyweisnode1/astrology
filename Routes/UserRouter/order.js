const express = require("express");
const router = express.Router();

const orderController = require("../../Controller/User/orderControllers");

const verfiyToken = require("../../Middleware/auth");

// Create a new order
router.post("/orders", verfiyToken, orderController.createOrder);

// Get all orders
router.get("/orders", verfiyToken, orderController.getOrders);

// Get a single order by ID
router.get("/orders/:id", verfiyToken, orderController.getOrderById);

// Update an order by ID
router.put("/orders/:id", verfiyToken, orderController.updateOrderById);

// Delete an order by ID
router.delete("/orders/:id", verfiyToken, orderController.deleteOrderById);

module.exports = router;
