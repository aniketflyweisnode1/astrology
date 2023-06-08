const router = require("express").Router();
const verfiyToken = require("../../Middleware/auth");
 
const {
    updateBirthDetails,
    getReferCodeOfAstrologer,
    getBirthDetails,
    getReferCodeOfUser,
} = require("../../Controller/User/birthDetails.controller");

router.put("/birthDetails/:id", verfiyToken, updateBirthDetails);
router.get("/birthDetails/:id", verfiyToken, getBirthDetails);

router.get("/user-referCode/:id", verfiyToken, getReferCodeOfUser);
router.get("/astrologer-referCode/:id", verfiyToken, getReferCodeOfAstrologer);

module.exports = router;
