const razerpay = require('razorpay');
const crypto = require('crypto')
const uuid = require('uuid')
const id = uuid.v4();
const payment = require('../../Model/UserModel/payments');
const ProductOrder = require('../../Model/UserModel/productOrder.model');



const Razorpay = new razerpay({
    key_id: 'rzp_live_xhEiJ4uMcMKT1r',
    key_secret: 'JSwRiz3kcqggnJSTohP1pJPy'
})

exports.CreatePaymentOrder = async (req, res) => {

    try {
        const productOrder = await ProductOrder.findOne({ _id: req.params.id });
        if (!productOrder) {
            return res.status(404).json({ message: 'productOrder not found' });
        }
        const data = {
            amount: productOrder.totalPrice,
            currency: 'INR',
            receipt: id,
            partial_payment: false,
        }
        console.log(data)
        const result = await Razorpay.orders.create(data);
        console.log(result)
        const DBData = {
            name: req.body.name,
            invoice: "123" + req.body.name,
            payment_Id: result.id,
            amount: result.amount,
            amount_paid: result.amount,
            receipt: result.receipt,
            productOrderId: req.params.id,
            orderStatus: req.body.orderStatus,
            transferType: req.body.transferType
        }
        console.log(DBData)
        const AmountData = await payment.create(DBData);
        productOrder.orderStatus = "placed";
        await productOrder.save();

        res.status(200).json({
            details: AmountData
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
};




exports.getAllPayments = async (req, res) => {
    try {
        const Data = await payment.find();
        if (Data.length === 0) {
            return res.status(204).json({ message: "orders not found" }); s

        }
        res.status(200).json({ details: Data })
    } catch (err) {
        console.log(err);
        res.state(400).json({
            message: err.message
        })
    }
}

exports.GetPaymentsById = async (req, res) => {
    try {
        const Data = await payment.findById({ _id: req.params.id });
        if (!Data.length) {
            return res.status(204).json({ message: "payment not found" });
        }
        res.status(200).json({ details: Data })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }
}



















