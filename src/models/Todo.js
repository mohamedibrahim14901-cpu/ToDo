const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true 
    }, 
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
    // timeStamps:{
    //     type:Boolean,
    //     default:true
    // }
}, {timestamps:true})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;

// const todoSchema = new mongoose.Schema({
//     title:String,
//     completed:Boolean,
//     createdAt:Date.now,
//     timeStamps: true,
// })