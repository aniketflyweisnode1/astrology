const express = require("express");
const horoScopeControllers = require('../../Controller/User/horoScopeControllers');

const verfiyToken = require("../../Middleware/auth");


const router = express();


router.post('/', verfiyToken, horoScopeControllers.AddHoroScope);
router.get('/', verfiyToken, horoScopeControllers.GetAllHoroScope);
router.get('/:id', horoScopeControllers.getHoroByID);
router.put('/:id', verfiyToken, horoScopeControllers.updateHoroScope);
router.delete('/:id', verfiyToken, horoScopeControllers.deleteHoroScope);







module.exports = router ; 