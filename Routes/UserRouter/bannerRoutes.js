const app = require("express");
const path = require("path");
const router = app.Router();
const verfiyToken = require("../../Middleware/auth");

const {
  addBanner,
  getBanner,
  editBanner,
  deleteBanner,
} = require("../../Controller/User/BannerController");

router.post("/addBanner", verfiyToken,  addBanner);
router.get("/getBanner", verfiyToken, getBanner);
router.put("/editBanner/:id", verfiyToken, editBanner);
router.delete("/deleteBanner/:id", verfiyToken, deleteBanner);

module.exports = router;
