const Wallet = require("../../Model/UserModel/wallet");
const catchAsync = require("../../utils/catchAsync");

exports.createWallet = async (req, res) => {
    try {
        const wallet = new Wallet({
            userId: req.body.userId,
            user: req.body.user,
            astrologer: req.body.astrologer,
        });
        const newWallet = await wallet.save();
        res.status(201).json({ data: newWallet });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a user's wallet by userId
exports.getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet)
            return res.status(404).json({ message: "Wallet not found" });
        res.status(200).json({ data: wallet });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a transaction to a user's wallet
exports.addTransaction = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet)
            return res.status(404).json({ message: "Wallet not found" });
        const transaction = req.body;
        wallet.transactions.push(transaction);
        if (transaction.type === "credit") {
            wallet.balance += transaction.amount;
        } else if (transaction.type === "debit") {
            wallet.balance -= transaction.amount;
        }
        const updatedWallet = await wallet.save();
        res.status(200).json({
            data: updatedWallet,
            message: `${transaction.amount} ${transaction.type}ed`,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user's wallet by userId
exports.deleteWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOneAndDelete({
            userId: req.params.userId,
        });
        if (!wallet)
            return res.status(404).json({ message: "Wallet not found" });
        res.status(200).json(wallet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.totalEarningBymonth = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet)
            return res.status(404).json({ message: "Wallet not found" });
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0);
        const totalCredit = wallet.transactions.reduce((total, transaction) => {
            if (
                transaction.type === "credit" &&
                transaction.date >= startOfMonth &&
                transaction.date <= endOfMonth
            ) {
                return total + transaction.amount;
            }
            return total;
        }, 0);
        res.status.json({ data: totalCredit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const mongoose = require("mongoose");
exports.totalCredit = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const date = req.query.date;
        // console.log(queryObj);
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const [monthName, year] = date.split("-");
        const monthNumber = monthNames.indexOf(monthName) + 1;
        console.log(monthNumber, " ", year);
        const startOfMonth = new Date(year, monthNumber - 1, 1);
        const endOfMonth = new Date(year, monthNumber, 0);

        const result = await Wallet.aggregate([
            { $match: { userId: req.params.userId } },
            { $unwind: "$transactions" },
            {
                $match: {
                    "transactions.type": "credit",
                    "transactions.date": {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalCredit: { $sum: "$transactions.amount" },
                },
            },
        ]);
        console.log(result);
        const totalCredit = result.length > 0 ? result[0].totalCredit : 0;
        res.status(200).json({ data: totalCredit });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
