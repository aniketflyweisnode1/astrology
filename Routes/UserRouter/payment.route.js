const payments = require("../../Controller/User/payment.controller");

const verfiyToken = require("../../Middleware/auth");

module.exports = (app) => {
    app.post("/api/v1/payments/:id", verfiyToken, payments.CreatePaymentOrder);

    app.get("/api/v1/payments/:id", verfiyToken, payments.GetPaymentsById);
    app.get("/api/v1/payments", verfiyToken, payments.getAllPayments);
    // app.delete("/api/v1/payments/:id", payments.delete);

    app.get("/api/v1/payments/:id", payments.GetPaymentsById);
    app.get("/api/v1/payments", payments.getAllPayments);
};
