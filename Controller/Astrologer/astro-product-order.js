const CartProductOrder = require("../../Model/UserModel/productOrder.model");

// Create a new CartProductOrder
exports.createCartProductOrder = async (req, res) => {
    try {
        const { astroId, product, address, totalPrice } = req.body;
        // const astroId = req.user._id;
        const cartProductOrder = await CartProductOrder.create({
            astroId,
            product,
            address,
            totalPrice,
        });

        res.status(201).json(cartProductOrder);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

// Read all CartProductOrders
exports.getCartProductOrders = async (req, res) => {
    try {
        const queryObj = {};
        if (req.query.astroId) {
            queryObj.astroId = req.query.astroId;
        }
        console.log(queryObj);

        const result = await CartProductOrder.find(queryObj).sort({
            createdAt: -1,
        });
        if (result.length === 0) {
            return res.status(200).json({ message: "no orders found" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

// Read a single CartProductOrder by ID
exports.getCartProductOrderById = async (req, res) => {
    try {
        const cartProductOrder = await CartProductOrder.findById(req.params.id);
        if (!cartProductOrder) {
            return res
                .status(404)
                .json({ error: "Cart Product Order not found" });
        }
        res.status(200).json(cartProductOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

// Update an existing CartProductOrder
exports.updateCartProductOrder = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "astroId",
        "product",
        "address",
        "totalPrice",
        "orderStatus",
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates!" });
    }

    try {
        const cartProductOrder = await CartProductOrder.findById(req.params.id);
        if (!cartProductOrder) {
            return res
                .status(404)
                .json({ error: "Cart Product Order not found" });
        }

        updates.forEach(
            (update) => (cartProductOrder[update] = req.body[update])
        );
        await cartProductOrder.save();
        res.status(200).json({
            message: "order updated ",
            data: cartProductOrder,
        });
    } catch (error) {
        console.log(error);

        res.status(400).json(error.message);
    }
};

// Delete a CartProductOrder
exports.deleteCartProductOrder = async (req, res) => {
    try {
        const cartProductOrder = await CartProductOrder.findByIdAndDelete(
            req.params.id
        );
        if (!cartProductOrder) {
            return res
                .status(404)
                .json({ error: "Cart Product Order not found" });
        }
        res.status(200).json({ message: " Order deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};
