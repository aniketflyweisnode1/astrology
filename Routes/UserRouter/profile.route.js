const user = require("../../Controller/User/userController");
const router = require("express").Router();

router.put("/profiles/:id", user.updateUserProfile);
router.get("/profiles/:id", user.getProfile);
module.exports = router;
