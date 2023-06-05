const express = require('express');

const astroCallControllers = require('../../Controller/Astrologer/astrocallhistory');
const userCallControllers = require('../../Controller/User/userCallhistory')
const astroStatusControllers = require('../../Controller/Astrologer/astroStatusControllers');

const router = express();


router.post('/add', astroCallControllers.AddCallHistory);
router.get('/get/:id', astroCallControllers.getCallHistory)
router.post('/added', userCallControllers.AddCallHistory);
router.get('/getuser/:id', userCallControllers.getCallHistory);
router.post('/status', astroStatusControllers.AddStatus);
router.get('/status/:id', astroStatusControllers.getStatus)


module.exports = router;