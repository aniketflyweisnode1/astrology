const Order = require("../../Model/UserModel/order");

const serverSecret = "f46d56170067f01e6cc73743e7d40c9e";

// const userId = "6447826eded471faba3e7c09";
const { generateToken04 } = require("../../services/zegoCloud");
const appID = 1592248676; // type: number
// const effectiveTimeInSeconds = 3600; //type: number; unit: s； token 过期时间，单位：秒
const payload = "";

// Create a new order
const createOrder = async (req, res) => {
    try {
        if (req.body.orderType !== "chat") {
            const userToken = generateToken04(
                appID,
                req.body.user,
                serverSecret,
                req.body.time,
                payload
            );
            const astroToken = generateToken04(
                appID,
                req.body.astroId,
                serverSecret,
                req.body.time,
                payload
            );

            console.log("userToken:", userToken);
            console.log("astroToken:", astroToken);
            req.body.userToken = userToken;
            req.body.astroToken = astroToken;
        }
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const query = { ...req.query };
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .populate(["user", "astroId"])
            .lean();

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate(["user", "astroId"])
            .lean();
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update an order by ID
const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete an order by ID
const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(deletedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
};
