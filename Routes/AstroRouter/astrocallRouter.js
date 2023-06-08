const express = require('express');

const astroCallControllers = require('../../Controller/Astrologer/astrocallhistory');
const userCallControllers = require('../../Controller/User/userCallhistory')
const astroStatusControllers = require('../../Controller/Astrologer/astroStatusControllers');

const verfiyToken = require("../../Middleware/auth");

const router = express();


router.post('/add', verfiyToken, astroCallControllers.AddCallHistory);
router.get('/get/:id', verfiyToken, astroCallControllers.getCallHistory)
router.post('/added', verfiyToken, userCallControllers.AddCallHistory);
router.get('/getuser/:id', verfiyToken, userCallControllers.getCallHistory);
router.post('/status', verfiyToken, astroStatusControllers.AddStatus);
router.get('/status/:id', verfiyToken, astroStatusControllers.getStatus)


module.exports = router;

