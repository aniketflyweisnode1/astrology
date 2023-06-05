const Cart = require("../../Model/UserModel/cart.model");

exports.addToCart = async (req, res) => {
    try {
        const cartObj = {
            product: req.body.productId,
            quantity: req.body.quantity,
        };
        // const { productId, quantity } = req.body;
        const userId = req.user._id;
        // Assuming you're using JWT authentication middleware to get user ID
        if (req.user.role === "astrologer") {
            cartObj.astrologer = user;
        }
        if (req.user.role === "user") {
            cartObj.user = user;
        }
        const cart = await Cart.findOne({ userId });

        if (cart) {
            // If the product already exists in the cart, update the quantity
            cart.quantity += quantity;
            const updatedCart = await cart.save();
            return res.status(200).json({
                message: "Product quantity updated in the car",
                data: updatedCart,
            });
        }

        // If the product doesn't exist in the cart, create a new cart item
        const newCartItem = new Cart(cartObj);

        const updatedCart = await newCartItem.save();

        return res
            .status(201)
            .json({ message: " added to cart", data: updatedCart });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error " + error.message,
        });
    }
};

exports.getItemInCartOfUser = async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.params.id }).populate(
            "product"
        );
        if (!cartItems || cartItems.length === 0) {
            return res.status(204).json({
                message: "Cart is empty",
            });
        }
        // console.log(cartItems[0].product.price);
        var total = 0;

        for (const item of cartItems) {
            console.log(item.product.price, " ", item.quantity);
            total = total + item.quantity * parseInt(item.product.price);
        }
        console.log(total);

        res.status(200).json({
            data: cartItems,
            subTotal: total,
            tax: 40,
            shipping: 40,
            totalCost: total + 40 + 40,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

exports.updateItemInCartOfUser = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        if (quantity > 1) {
            cartItem.quantity -= 1;
            let updatedCartItem = await cartItem.save();
        } else if (quantity == 1) {
            let updatedCartItem = await cartItem.remove();
        } else {
            return res.status(400).json({ message: "product not found" });
        }

        res.status(200).json({
            message: "Cart item updated",
            data: updatedCartItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};
