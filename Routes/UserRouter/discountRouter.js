const express = require('express');

const discountControllers = require('../../Controller/User/discountControllers')



const router = express();


router.post('/', discountControllers.Adddiscount);
router.get('/', discountControllers.GetAllDiscount);
router.get('/:id', discountControllers.GetAllById);
router.put('/:id', discountControllers.UpdateDiscount);
router.delete('/:id', discountControllers.DeleteDiscount);



module.exports = router