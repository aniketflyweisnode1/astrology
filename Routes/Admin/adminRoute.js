const express = require("express");
const router = express.Router();
const admin = require("../../Controller/Admin/adminCtrl");
const { isAuthenticated } = require("../../Controller/User/auth.controller");
const astroControllers = require("../../Controller/Astrologer/astroChatControllers");
const app = require("express");
const path = require("path");
var multer = require("multer");
const notificationControllers = require("../../Controller/User/notificationControllers");
const user = require("../../Model/UserModel/User");
const UserControllers = require("../../Controller/User/userController");
const AstroFeeback = require("../../Controller/Astrologer/astroFeedback");
const testimonalControllers = require("../../Controller/User/testimonial");
const product = require("../../Controller/User/productControllers");
const uploads3 = require("../../Controller/User/privacy");
const terms = require("../../Controller/User/terms.controller");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = require("../../services/upload");
// var upload = multer({ storage: storage });

router.post("/login-admin", admin.login);
router.post("/signup", admin.signUpUser);
router.post(
    "/user-blog",
    upload.single("myField"),
    isAuthenticated,
    admin.postuserBlogs
);
router.get("/get-blogs/:id", admin.ViewDataBlogs);
router.patch(
    "/edit-user-blog/:id",
    upload.single("myField"),
    isAuthenticated,
    admin.UpdateBlogs
);

//user
router.get("/users/:id", UserControllers.getProfile);
router.get("/users", UserControllers.getAllUsers);
router.put("/users/:id", UserControllers.updateUserProfile);
router.delete("/users/:id", UserControllers.deleteUserName);

// Add Charges Router
router.post("/fees/:id", isAuthenticated, admin.AddChargesofAstro);
router.get("/fees", isAuthenticated, admin.GetAllFessDetails);
router.delete("/fees", isAuthenticated, admin.DeleteFeedetails);
router.put("/fees", isAuthenticated, admin.UpdateFees);
router.get("/fees/:id", isAuthenticated, admin.GetFeesByAstroId);

//blogs
router.delete("/remove-blog/:id", admin.RemovedBlogs);
router.post("/blogs", admin.postuserBlogs);
router.put("/blogs/:id", admin.UpdateBlogs);
router.get("/blogs/:id", admin.ViewDataBlogs);
router.get("/blogs", admin.GetBlogs);

//Products
router.delete("/products", product.deleteProduct);
router.post("/products", upload.array("images"), product.addproduct);
router.put("/products/:id", product.editProduct);
router.get("/products/:id", product.getProduct);
router.get("/products", product.getProducts);

router.post("/add-feedback", admin.UserFeedback);
router.get("/view-feedback", admin.ViewAllFeedback);
// router.get("feedbacks", isAuthenticated,)


// Astrologer
router.get("/astro", admin.allAstro);
// router.post("/astro", astroControllers.signUpUser);
// router.delete("/astro/:id", astroControllers.deleteAstroName);
// router.put("/astro/:id", astroControllers.updateAstro);
// router.get("/astro/:id", astroControllers.getAstro);


//Add Notification
// router.post('/notification', notificationControllers.AddNotification);
// router.get('/notification', notificationControllers.getNotification);
// router.put('/notification', notificationControllers.updateNotification);
// router.delete('/notification', notificationControllers.deleteNotification);

//testimaonal

//terms
router.post("terms", terms.create);
router.put("terms/:id", terms.update);
router.get("terms/:id", terms.getId);
router.get("term", terms.get);
router.delete("terms/:id", terms.delete);

module.exports = router;
