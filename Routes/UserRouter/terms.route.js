
const terms = require("../../Controller/User/terms.controller");
const router = require("express").Router();

router.post("/api/v1/admin/terms", terms.create);
router.put("/api/v1/admin/terms/:id", terms.update);
router.get("/api/v1/admin/terms/:id", terms.getId);
router.get("/api/v1/admin/terms", terms.get);
router.delete("/api/v1/admin/terms/:id", terms.delete);

router.get("/api/v1/terms/:id", terms.getId);
router.get("/api/v1/terms", terms.get);

module.exports = router;