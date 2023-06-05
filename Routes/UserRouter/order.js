const express = require("express");
const router = express.Router();

const orderController = require("../../Controller/User/orderControllers");

// Create a new order
router.post("/orders", orderController.createOrder);

// Get all orders
router.get("/orders", orderController.getOrders);

// Get a single order by ID
router.get("/orders/:id", orderController.getOrderById);

// Update an order by ID
router.put("/orders/:id", orderController.updateOrderById);

// Delete an order by ID
router.delete("/orders/:id", orderController.deleteOrderById);

module.exports = router;
