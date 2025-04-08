const mongoose = require('mongoose');

const userTaskSchema = mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    workerName: {
        type: String,
        required: true
    },
    tasks: [{
        name: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false
        },
        location: {
            building: {
                type: String,
                default: ""
            },
            lat: {
                type: Number,
                default: 0
            },
            long: {
                type: Number,
                default: 0
            }
        }
    }]
}, { timestamps: true });

const UserTask = mongoose.model('UserTask', userTaskSchema);

module.exports = UserTask;
