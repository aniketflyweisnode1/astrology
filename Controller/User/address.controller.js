const Address = require("../../Model/UserModel/address.model");

// Create a new Address
exports.create = async (req, res) => {
    try {
        const {
            userId,
            billTo,
            completeAddress,
            mobile,
            houseNumber,
            addressType,
            pincode,
        } = req.body;
        const address = new Address({
            billTo,
            completeAddress,
            userId,
            mobile,
            houseNumber,
            addressType,
            pincode,
            userId,
        });
        await address.save();
        res.status(201).json({ message: "address added ", data: address });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
};

// Read all Addresses
exports.get = async (req, res) => {
    try {
        const addresses = await Address.find();
        if (addresses.length === 0) {
            return res.status(200).json({ message: "no addresses found" });
        }
        res.status(200).json(addresses);
    } catch (error) {
        console.log(error.message);
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Read a single Address by ID
exports.getByUserId = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(204).json({
                message: "address not found",
            });
        }
        res.status(200).json(address);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update an existing Address
exports.update = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "billTo",
        "mobile",
        "pinCode",
        "houseNumber",
        "completeAddress",
        "AddressType",
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates!" });
    }

    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json();
        }
        updates.forEach((update) => (address[update] = req.body[update]));
        await address.save();
        res.status(200).json(address);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
};

// Delete an Address
exports.delete = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).json();
        }
        res.status(200).json(address);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
