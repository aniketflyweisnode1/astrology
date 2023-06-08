const express = require("express");
const router = express.Router();
const walletController = require("../../Controller/User/walletController");

const verfiyToken = require("../../Middleware/auth");

router.post("/", verfiyToken, walletController.createWallet);
router.get("/:userId", verfiyToken, walletController.getWallet);
router.post("/:userId/transactions", verfiyToken, walletController.addTransaction);
router.delete("/:userId", verfiyToken, walletController.deleteWallet);
router.get("/:userId/earning", walletController.totalCredit);
module.exports = router;
