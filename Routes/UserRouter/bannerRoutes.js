const app = require("express");
const path = require("path");
const router = app.Router();


const {
  addBanner,
  getBanner,
  editBanner,
  deleteBanner,
} = require("../../Controller/User/BannerController");

router.post("/addBanner",  addBanner);
router.get("/getBanner", getBanner);
router.put("/editBanner/:id", editBanner);
router.delete("/deleteBanner/:id", deleteBanner);

module.exports = router;
