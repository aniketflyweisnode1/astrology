const express = require("express");
const router = express.Router();
const walletController = require("../../Controller/User/walletController");

router.post("/", walletController.createWallet);
router.get("/:userId", walletController.getWallet);
router.post("/:userId/transactions", walletController.addTransaction);
router.delete("/:userId", walletController.deleteWallet);
router.get("/:userId/earning", walletController.totalCredit);
module.exports = router;
