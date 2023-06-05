const router = require("express").Router();

const {
    updateBirthDetails,
    getReferCodeOfAstrologer,
    getBirthDetails,
    getReferCodeOfUser,
} = require("../../Controller/User/birthDetails.controller");

router.put("/birthDetails/:id", updateBirthDetails);
router.get("/birthDetails/:id", getBirthDetails);

router.get("/user-referCode/:id", getReferCodeOfUser);
router.get("/astrologer-referCode/:id", getReferCodeOfAstrologer);
module.exports = router;
