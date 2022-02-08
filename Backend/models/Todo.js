const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String
    },
    createdOn: {
        type: String
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;