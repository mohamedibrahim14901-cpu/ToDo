const express = require("express");
const router = express.Router();

const Todo = require('../models/Todo');
const  mongoose  = require("mongoose");

const {AddTodo,GetAllTodos,GetTodoByID,UpdateTodo,DeleteTodo} =require("../controllers/todo.Controller")

router.post('/todos',AddTodo)

router.get('/todos',GetAllTodos)

router.get('/todos/:id',GetTodoByID)

router.put('/todos/:id',UpdateTodo)
   
router.delete('/todos/:id',DeleteTodo)

module.exports=router;