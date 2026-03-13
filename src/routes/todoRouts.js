const express = require('express')
const db = require("../db.js")

const router = express.Router()

//get all todos for user
router.get('/', (req,res) => { 

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