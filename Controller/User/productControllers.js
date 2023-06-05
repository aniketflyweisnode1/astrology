const product = require("../../Model/UserModel/product");

exports.addproduct = async (req, res) => {
    // const banner = req.files;
    try {
        // const link = req.file.location;
        // console.log(link);
        console.log(req.files);
        const {
            name,

            description,
            price,
            size,
            color,
            productCategory,
            discountPercent,
            highlights,
        } = req.body;
        console.log({
            name,

            description,
            price,
            size,
            color,
            productCategory,
            highlights,
        });
        const images = req.files.map((file) => {
            return { url: file.location, key: file.key };
        });
        req.body.image = images;
        const discountedPrice =
            price - Math.ceil(price * (discountPercent / 100));
        if (!(name && price && description)) {
            return res.status(400).json({
                message: "please fill all the fields",
            });
        }
        console.log(req.body);
        const addBanner = await product.create(req.body);
        res.status(200).json({
            msg: "product successfully added",
            data: addBanner,
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
        });
    }
};

exports.getProducts = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.name) {
            queryObj.name = RegExp(req.query.name, "i");
        }
        if (req.query.color) {
            queryObj.color = RegExp(req.query.color, "i");
        }
        if (req.query.size) {
            queryObj.size = req.query.size;
        }
        if (req.query.productCategory) {
            queryObj.productCategory = req.query.productCategory;
        }
        const getproduct = await product.find();
        if (getproduct.length === 0) {
            return res.status(200).json({
                message: "product not found",
                data: [],
            });
        }
        res.status(200).json({ status: "success", data: getproduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};
exports.getRecommendedProducts = async (req, res) => {
    try {
        const products = await product.findById(req.params.id);
        if (!products) {
            return res.status(404).send({ message: "product not found" });
        }
        const pipeline = [
            // Match products in the same category as the given product
            { $match: { category: products.category } },
            // Exclude the given product from the results
            { $match: { _id: { $ne: products._id } } },
            // Add additional stages as needed
        ];

        const recommendedProducts = await product.aggregate(pipeline);

        res.status(200).json({ data: recommendedProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.editProduct = async (req, res) => {
    try {
        const {
            name,
            index,

            description,
            price,
            productCategory,
            addSize,
            removeSize,
            removeColor,
            addColor,
            averageRating,
            highlights,
        } = req.body;
        if (
            addSize ||
            color ||
            name ||
            index ||
            productCategory ||
            description ||
            averageRating ||
            price ||
            highlights
        ) {
            var updatedProduct = await product.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        name,
                        index,

                        description,
                        price,
                        productCategory,
                        highlights,
                        averageRating,
                        color,
                    },
                    $addToSet: {
                        size: addSize,
                    },
                },
                { new: true }
            );
            console.log(updatedProduct);
        }
        if (removeSize) {
            var updatedProduct = await product.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        name,
                        index,

                        description,
                        price,
                        highlights,
                        averageRating,
                        color,
                    },
                    $pull: {
                        // color: { $in: removeColor },
                        size: { $in: removeSize },
                    },
                },
                { new: true }
            );
            console.log(updatedProduct);
        }

        res.status(200).json({
            msg: "product successfully Updated",
            data: updatedProduct,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const result = await product.findById(req.params.id);
        if (!result) {
            return res.status(200).json({
                message: "product not found",
                data: [],
            });
        }
        res.status(200).json({ status: "success", data: result });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        // const result = await product.findByIdAndDelete(req.params.id);
        // const result = await product.deleteMany();
        if (!result) {
            return res.status(404).json({
                message: "product not found",
            });
        }
        res.status(200).send({
            msg: "product  deleted successfully",
            status: true,
        });
    } catch (error) {
        res.send(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};
