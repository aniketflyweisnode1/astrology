const payments = require("../../Controller/User/payment.controller");

module.exports = (app) => {
    app.post("/api/v1/payments/:id", payments.CreatePaymentOrder);

    app.get("/api/v1/payments/:id", payments.GetPaymentsById);
    app.get("/api/v1/payments", payments.getAllPayments);
    // app.delete("/api/v1/payments/:id", payments.delete);

    app.get("/api/v1/payments/:id", payments.GetPaymentsById);
    app.get("/api/v1/payments", payments.getAllPayments);
};
