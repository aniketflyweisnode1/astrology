const ProductCategory = require("../../Model/UserModel/productCategory");

// Create a new product category
exports.createProductCategory = async (req, res) => {
    try {
        if (!req.body.name)
            return res
                .status(400)
                .json({ message: "Name and image are required" });
        // const { name, image } = req.body;
        req.body.image = req.file.location;
        req.body.key = req.file.key;
        const productCategory = new ProductCategory(req.body);
        const savedProductCategory = await productCategory.save();
        res.status(201).json({
            message: `${req.body.name} category added`,
            data: savedProductCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all product categories
exports.getProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find();
        if (!productCategories.length) {
            return res
                .status(404)
                .json({ message: "No product categories found" });
        }
        res.status(200).json({ data: productCategories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single product category by ID
exports.getProductCategoryById = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findById(req.params.id);
        if (!productCategory) {
            return res
                .status(404)
                .json({ message: "Product category not found" });
        }
        res.status(200).json({ data: productCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Update a product category by ID
exports.updateProductCategoryById = async (req, res) => {
    try {
        const { name, image } = req.body;
        const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
            req.params.id,
            { name, image },
            { new: true }
        );
        if (!updatedProductCategory) {
            return res
                .status(404)
                .json({ message: "Product category not found" });
        }
        res.status(200).json(updatedProductCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a product category by ID
exports.deleteProductCategoryById = async (req, res) => {
    try {
        const deletedProductCategory = await ProductCategory.findByIdAndDelete(
            req.params.id
        );
        if (!deletedProductCategory) {
            return res
                .status(404)
                .json({ message: "Product category not found" });
        }
        res.status(200).json({
            message: `${deletedProductCategory.name}` + " deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
