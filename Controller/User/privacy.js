const Privacy = require("../../Model/UserModel/privacy");

exports.createPrivacy = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content)
            return res.status(400).json({ error: "Content is required" });
        const privacy = new Privacy({ content });
        const savedPrivacy = await privacy.save();

        res.status(201).json({
            message: "created successfully",
            data: savedPrivacy,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getPrivacy = async (req, res) => {
    try {
        const privacy = await Privacy.find();
        if (!privacy || privacy.length === 0) {
            return res.status(404).json({ error: "Privacy policy not found" });
        }

        res.status(200).json({ data: privacy[privacy.length - 1] });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updatePrivacy = async (req, res) => {
    try {
        const updatedPrivacy = await Privacy.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedPrivacy) {
            return res.status(404).json({ error: "Privacy policy not found" });
        }

        res.status(200).json({
            message: "updated successfully",
            data: updatedPrivacy,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deletePrivacy = async (req, res) => {
    try {
        const deletedPrivacy = await Privacy.findByIdAndDelete(req.params.id);

        if (!deletedPrivacy) {
            return res.status(404).json({ error: "Privacy policy not found" });
        }

        res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
