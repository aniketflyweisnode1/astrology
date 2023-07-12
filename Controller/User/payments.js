const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../../Model/UserModel/payments");
const { updateMany } = require("../../Model/UserModel/User");

const Razorpay = new razerpay({
    key_id: "rzp_live_xhEiJ4uMcMKT1r",
    key_secret: "JSwRiz3kcqggnJSTohP1pJPy",
});

exports.CreatePaymentOrder = async (req, res) => {
    const data = {
        amount: req.body.amount,
        currency: "INR",
        receipt: id,
        partial_payment: false,
    };
    console.log(data);
    try {
        const result = await Razorpay.orders.create(data);
        console.log(result);
        const DBData = {
            userId: req.body.userId,
            name: req.body.name,
            invoice: "123" + req.body.name,
            payment_Id: result.id,
            amount: req.body.amount,
            amount_paid: result.amount,
            receipt: result.receipt,
            product: req.body.product,
            orderStatus: req.body.orderStatus,
        };
        console.log(DBData);
        const AmountData = await payment.create(DBData);
        console.log(AmountData);
        const wallet = await Wallet.findOne();
        res.status(200).json({
            details: AmountData,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const Data = await payment.find();
        res.status(200).json({ data: Data });
    } catch (err) {
        console.log(err);
        res.state(400).json({
            message: err.message,
        });
    }
};

exports.GetPaymentsById = async (req, res) => {
    try {
        const Data = await payment.findById({ _id: req.params.id });
        res.status(200).json({ details: Data });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

    
