const AstrologerFee = require("../../Controller/Astrologer/astrologerFee");
const Astrologer = require("../../Model/AstroModel/astrologer");
const User = require("../../Model/UserModel/User");
const Wallet = require("../../Model/UserModel/wallet");
// Create a new astrologer fee record
exports.createAstrologerFee = async (req, res) => {
    try {
        const { astrologerId } = req.body;
        if (!req.body.astrologerId) {
            return res
                .status(400)
                .json({ message: "Astrologer ID is required" });
        }
        const astrologerFeeExists = await AstrologerFee.findOne({
            astrologerId,
        });
        if (astrologerFeeExists) {
            return res.status(400).json({
                message: "Astrologer fee already exists",
            });
        }

        const astrologerFee = new AstrologerFee(req.body);
        const savedAstrologerFee = await astrologerFee.save();
        const astrologer = await Astrologer.findById(req.body.astrologerId);
        if (!astrologer) {
            return res.status(404).json({
                message: "Astrologer not found",
            });
        }
        astrologer.astrologerFee = savedAstrologerFee._id;
        await astrologer.save();
        res.status(201).json({
            message: "astrologer's fee added",
            data: savedAstrologerFee,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Get all astrologer fee records
exports.getAstrologerFees = async (req, res) => {
    try {
        const astrologerFees = await AstrologerFee.find().lean();
        res.status(200).json({ data: astrologerFees });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
const mongoose = require("mongoose");
// Get a single astrologer fee record by ID
exports.getAstrologerFeeById = async (req, res) => {
    try {
        const astrologerId = req.params.id;
        const result = await AstrologerFee.aggregate([
            {
                $match: {
                    astrologerId: new mongoose.Types.ObjectId(astrologerId),
                },
            },
            {
                $project: {
                    chat: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$chat",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$chat",
                        ],
                    },
                    callFeePerMinute: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$callFeePerMinute",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$callFeePerMinute",
                        ],
                    },
                    report: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$report",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$report",
                        ],
                    },
                    astroMall: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$astroMall",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$astroMall",
                        ],
                    },
                    liveEventOrVideoCall: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$liveEventOrVideoCall",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$liveEventOrVideoCall",
                        ],
                    },
                },
            },
        ]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Astrologer not found" });
        }

        return res.status(200).json({
            data: result[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update an existing astrologer fee record by ID
exports.updateAstrologerFee = async (req, res) => {
    try {
        const astrologerFee = await AstrologerFee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!astrologerFee) {
            return res
                .status(404)
                .json({ message: "Astrologer fee record not found" });
        }
        res.status(200).json({ data: astrologerFee });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Delete an existing astrologer fee record by ID
exports.deleteAstrologerFee = async (req, res) => {
    try {
        const astrologerFee = await AstrologerFee.findByIdAndDelete(
            req.params.id
        );
        if (!astrologerFee) {
            return res
                .status(404)
                .json({ message: "Astrologer fee record not found" });
        }
        res.status(200).json({ message: "Astrologer fee record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getAstrologerFeeByUser = async (req, res) => {
    try {
        const astrologerId = req.params.id;
        const result = await AstrologerFee.aggregate([
            {
                $match: {
                    astrologerId: new mongoose.Types.ObjectId(astrologerId),
                },
            },
            {
                $project: {
                    chat: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$chat",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$chat",
                        ],
                    },
                    callFeePerMinute: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$callFeePerMinute",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$callFeePerMinute",
                        ],
                    },
                    report: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$report",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$report",
                        ],
                    },
                    astroMall: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$astroMall",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$astroMall",
                        ],
                    },
                    liveEventOrVideoCall: {
                        $cond: [
                            { $gt: ["$discountPercentage", 0] },
                            {
                                $multiply: [
                                    "$liveEventOrVideoCall",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercentage",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$liveEventOrVideoCall",
                        ],
                    },
                },
            },
        ]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Astrologer not found" });
        }

        const wallet = await Wallet.findOne({
            userId: req.param.userId,
        }).lean();

        // console.log(wallet);
        const availableBalance = wallet.balance;
        const maximumCall = availableBalance / result[0].callFeePerMinute;
        const maximumChat = availableBalance / result[0].chat;
        const maximumVideoCall =
            availableBalance / result[0].liveEventOrVideoCall;
        return res.status(200).json({
            availableBalance,
            maximumCall,
            maximumChat,
            maximumVideoCall,
            data: result[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
