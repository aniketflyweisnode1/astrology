const express = require('express');

const kundliRouter = require('../../Controller/User/kundliController');
const verfiyToken = require("../../Middleware/auth");


const router = express();

router.post('/', verfiyToken, kundliRouter.AddKundli);
router.get('/', verfiyToken, kundliRouter.getKundli);
router.put('/:id', verfiyToken, kundliRouter.updateKundil);
router.delete('/:id', verfiyToken, kundliRouter.deleteKundil);


module.exports = router