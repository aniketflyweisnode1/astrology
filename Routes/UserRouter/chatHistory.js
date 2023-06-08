const express = require('express');

const astroCallControllers = require('../../Controller/Astrologer/astroChatControllers');
const userCallControllers = require('../../Controller/User/userchatControllers')
const verfiyToken = require("../../Middleware/auth");

const router = express();


// router.post('/add', astroCallControllers.AddChatHistory);
// router.get('/get', astroCallControllers.getCallHistory)
router.post('/added', verfiyToken, userCallControllers.AddChatHistory);
router.get('/getuser', verfiyToken, userCallControllers.getCallHistory);



module.exports = router;