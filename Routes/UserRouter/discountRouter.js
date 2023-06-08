const express = require('express');

const discountControllers = require('../../Controller/User/discountControllers')
const verfiyToken = require("../../Middleware/auth");


const router = express();


router.post('/', discountControllers.Adddiscount);
router.get('/', verfiyToken, discountControllers.GetAllDiscount);
router.get('/:id', discountControllers.GetAllById);
router.put('/:id', verfiyToken, discountControllers.UpdateDiscount);
router.delete('/:id', discountControllers.DeleteDiscount);



module.exports = router