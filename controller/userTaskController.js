const UserTask = require('../models/userTask.model');

const getAllUserTasks = async (req, res) => {
    try {
        const tasks = await UserTask.find({});
        if (!tasks || tasks.length === 0)
            return res.json("No Task records present");
        res.json(tasks);
    } catch (error) {
        res.status(404).json("Could not fetch task records");
    }
};

const createNewUserTaskRecord = async (req, res) => {
    try {
        const task = await UserTask.create(req.body);
        if (!task)
            return res.send("New Task record could not be Created");
        res.json(task);
    } catch (error) {
        res.status(404).send(error);
    }
};

const addUserTaskByWorkerId = async (req, res) => {
    try {
        const task = await UserTask.findByIdAndUpdate(req.params.id, req.body);
        if (!task)
            return res.send("Task array could not be added");
        const newTask = await UserTask.findById(req.params.id);
        res.json(newTask);
    } catch (error) {
        res.status(404).send(error);
    }
};

const alterUserTaskStatus = async (req, res) => {
    try{
        const record = await UserTask.findOne({ workerId: req.params.wid });
        if(!record)
            return res.send("Worker record could not be found");
        const task = record.tasks.id(req.params.tid);
        if(!task)
            return res.send("Task could not be found");
        task.status = !task.status;
        await record.save();
        res.json(record);
    } catch (error) {
        res.status(404).send(error);
    }
};

const getGroupedTasks = async (req, res) => {
    try {
        const allTasks = await UserTask.findOne({ workerId: req.params.id });
        if (!allTasks) {
            return res.status(404).json({ error: "No tasks found for this worker" });
        }
        
        // Create a map to group tasks by building
        const buildingGroups = new Map();
        
        // Process the worker's tasks
        allTasks.tasks.forEach(task => {
            const building = task.location.building;
            if (!building) return; // Skip tasks without building
            
            if (!buildingGroups.has(building)) {
                buildingGroups.set(building, []);
            }
            
            buildingGroups.get(building).push({
                name: task.name,
                status: task.status,
                taskId: task._id
            });
        });
        
        // Convert map to array format
        const result = Array.from(buildingGroups.entries()).map(([building, tasks]) => ({
            name: building,
            tasks
        }));
        
        res.json(result);
    } catch (error) {
        console.error("Error in getGroupedTasks:", error);
        res.status(500).json({ error: "Could not fetch grouped tasks" });
    }
};

module.exports = { getAllUserTasks, createNewUserTaskRecord, addUserTaskByWorkerId, alterUserTaskStatus, getGroupedTasks };

