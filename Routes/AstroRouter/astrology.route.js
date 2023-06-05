const router = require("express").Router();
const { getPanchang } = require("../../Controller/Astrologer/astrology");
router.get("/panchang", getPanchang);
router.get("/horoscope", getPanchang);
module.exports = router;
