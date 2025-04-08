const express = require('express');
const router = express.Router();
const { loginFunc, registerFunc } = require('../controller/authController');

router.post('/login', loginFunc);
router.post('/register', registerFunc);

module.exports = router;