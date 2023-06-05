const express = require('express');

const agoreControllers = require('../controllers/agore');



const router = express();


router.post('/', agoreControllers.nocache, agoreControllers.generateAccessToken);
router.get('/user/:id', agoreControllers.nocache, agoreControllers.generateAccessTokenUser)



module.exports = router;