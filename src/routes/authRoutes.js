const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../db.js")

const router = express.Router()


//register new user endpoint, /auth/register
router.post('/register', (req,res) => { 
    const {username, password} = req.body
    
    //pass encryption
    const hashedPassword = bcrypt.hashSync(password, 8)

    try {
        const insertUser = db.prepare(`
            INSERT INTO users (username, password)
            VALUES (?,?)`)
        const result = insertUser.run(username, hashedPassword)

        const firtsTodo = `Add your first todo!`
        const insertTodo = db.prepare(`
            INSERT INTO todos (user_id, task)
            VALUES (?,?)
            `)
        insertTodo.run(result.lastInsertRowid, firtsTodo)

        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.json({ token })
    } catch (err) {
        console.log(err)
        res.sendStatus(503) //server fault 
    }

    res.sendStatus(201)
})

router.post('/login', (req,res) => { 

})

module.exports = router