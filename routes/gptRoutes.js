const express = require('express');
const router = express.Router();
const { generateHouseholdTask } = require('../controller/gptController');

// Generate household task using GPT
router.post('/gpt', generateHouseholdTask);

module.exports = router; 