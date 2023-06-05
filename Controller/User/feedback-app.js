const AppFeedback = require("../../Model/UserModel/appFeedback");

exports.createFeedback = async (req, res) => {
    try {
        const { userId, comment, rating } = req.body;

        const feedback = new AppFeedback({
            userId,
            comment,
            rating,
        });

        const savedFeedback = await feedback.save();

        res.status(201).json(savedFeedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        const feedback = await AppFeedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.status(200).json({ data: feedback });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getFeedbacks = async (req, res) => {
    try {
        const feedback = await AppFeedback.find({ ...req.query }).lean();

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.status(200).json({ data: feedback });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await AppFeedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.status(200).json({
            message: "updated successfully",
            data: feedback,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await AppFeedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
