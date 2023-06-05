const express = require("express");
const router = express.Router();
const support = require("../../Controller/User/supportController");

router.post('/admin/support', support.create);
router.get('/admin/support', support.read);
router.put('/admin/support/:id', support.update);
router.delete('/admin/support/:id', support.delete);
router.get('/support/', support.read);

module.exports = router;
