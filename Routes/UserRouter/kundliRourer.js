const express = require('express');

const kundliRouter = require('../../Controller/User/kundliController');



const router = express();

router.post('/', kundliRouter.AddKundli);
router.get('/', kundliRouter.getKundli);
router.put('/:id', kundliRouter.updateKundil);
router.delete('/:id', kundliRouter.deleteKundil);


module.exports = router