const express = require('express');
const router = express.Router();
const { getAllUserTasks, createNewUserTaskRecord, addUserTaskByWorkerId, alterUserTaskStatus, getGroupedTasks } = require('../controller/userTaskController');

router.get('/get-user-task', getAllUserTasks);

router.post('/create-user-task/', createNewUserTaskRecord);

router.post('/add-user-task/:id', addUserTaskByWorkerId);

router.put('/alter-user-task/:wid/:tid', alterUserTaskStatus);

router.get('/get-grouped-tasks/:id', getGroupedTasks);

module.exports = router;

