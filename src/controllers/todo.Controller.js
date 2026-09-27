const Todo = require("../models/Todo");
const mongoose = require("mongoose");

const AddTodo =async (req,res)=>{
    try {
        const {title, completed}=req.body;

        if(!title|| typeof title!=='string'|| !title.trim() ){ 
            return res.status(400).json({message:'please enter title correctly '});
        }

        const todo = new Todo({
            title:title.trim(),
            completed:completed ===true
        })
        
        await todo.save();

        return res.status(201).json({message:`Todo is created successfully : ${todo}`})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'server error'});
        
    }
}

const GetAllTodos=async(req,res)=>{
    try {

        const todos = await Todo.find().sort({createdAt:-1});
        res.status(200).json(todos);

    } catch (error) {
        console.log(error);
        
    }
}

const GetTodoByID=async(req,res)=>{
    try {
        const {id} =req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid ID"});
        }
        const todo = await Todo.findById(id);
        
        if (!todo){
            return res.status(400).json({message:"no such Todo with this ID"});
        }
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        
    }
}

const UpdateTodo=async(req,res)=>{
    try {
        const {title,completed}=req.body;
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid ID"});
        }
        if(!title|| typeof title!=='string'|| !title.trim() ){ 
            return res.status(400).json({message:'please enter title correctly '});
        }

        const todo = await Todo.findById(id);
        
        if (!todo){
            return res.status(400).json({message:"no such Todo with this ID"});
        }
        todo.title=title;
        todo.completed= completed || false;

        await todo.save();
        res.status(200).json(todo);

    } catch (error) {
        console.log(error);
        
    }
}

const DeleteTodo=async (req,res)=>{
    try {
        const {id}=req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid ID"});
        }
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo){
            return res.status(400).json({message:`no Todo With ID ${id}`})
        }

        
        res.status(200).json({message:"Todo Deleted successfully"})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={
    AddTodo,
    GetAllTodos,
    GetTodoByID,
    UpdateTodo,
    DeleteTodo
}