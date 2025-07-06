const express = require('express');
const { saveLog } = require('../controllers/logController');
const router = express.Router();


router.post('/client-log', saveLog);

module.exports = router;
