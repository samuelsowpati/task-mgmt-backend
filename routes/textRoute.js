const express = require('express');
const router = express.Router();
const { sendText } = require('../controller/textController');

router.post('/send-text', sendText);

module.exports = router;

