const express = require('express');

const astroCallControllers = require('../../Controller/Astrologer/astroChatControllers');
const userCallControllers = require('../../Controller/User/userchatControllers')

const router = express();


// router.post('/add', astroCallControllers.AddChatHistory);
// router.get('/get', astroCallControllers.getCallHistory)
router.post('/added', userCallControllers.AddChatHistory);
router.get('/getuser', userCallControllers.getCallHistory);



module.exports = router;