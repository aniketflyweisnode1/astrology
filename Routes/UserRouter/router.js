const router = require("express").Router();

router.use("/auth", require("../UserRouter/auth.route"));
router.use("/user", require("../UserRouter/userRoutes"));//userRoutes
// router.use("/Conection", require("./conectionRoutes"));
router.use("/astrologer", require("../../Routes/AstroRouter/astrologer"));
router.use("/horoscope", require("../UserRouter/horoScopeRoute"))
router.use("/kundli", require("../UserRouter/kundliRourer"));
router.use("/order", require("../UserRouter/order"));
router.use("/product", require("../UserRouter/product"));
router.use("/astrocallhistory", require("../../Routes/AstroRouter/astrocallRouter"));
router.use("/discount", require("../UserRouter/discountRouter"));
router.use("/chat", require("../UserRouter/chatHistory"));
// router.use("/agora", require("./agoreRouter."));
router.use("/api/v1", require("../UserRouter/product-category"));
router.use("/api/v1", require("../UserRouter/profile.route"));
router.use("/api/v1", require("../UserRouter/followRoutes"));
router.use("/api/v1", require("../UserRouter/blog.route"));
router.use("/api/v1", require("../UserRouter/privacy.route"));
router.use("/admin", require("../Admin/adminRoute"));
router.use("/banner", require("../UserRouter/bannerRoutes"));
router.use("/api/v1", require("../UserRouter/notificationRouter"));
router.use("/api/v1", require("../UserRouter/supportRoute"));
router.use("/", require("../UserRouter/terms.route"));
router.use("/api/v1/wallet", require("../UserRouter/wallet.route"));
router.use("/api/v1", require("../../Routes/AstroRouter/astrologerFee"));
router.use("/api/v1", require("../../Routes/AstroRouter/astrologerLiveSchedule"));
router.use("/api/v1", require("../UserRouter/birthDetails.route"));
router.use("/api/v1/app-feedbacks", require("../UserRouter/feedback-app.route"));
router.use("/api/v1", require("../../Routes/AstroRouter/astrology.route"));
router.use("/api/v1", require("../../Routes/AstroRouter/astroStatus"));
router.use("/api/v1", require("../../Routes/UserRouter/order"));
module.exports = router;
