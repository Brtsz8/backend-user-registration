const express = require('express')
const db = require("../db.js")

const router = express.Router()

//get all todos for user (logged in)
router.get('/', (req,res) => { 
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

//create a new todo
router.post('/', (req,res) => { 

})

//update a todo
router.put('/:id', (req,res) => { 

})

//delete a todo
router.delete(':id', (req,res) => {
    
})

module.exports = router