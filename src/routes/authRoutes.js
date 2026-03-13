const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../db.js")

const router = express.Router()


//register new user endpoint, /auth/register
router.post('/register', (req,res) => { 
    const {username, password} = req.body
    console.log('registratiom')
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

        res.status(201).json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503) //server fault 
    }
})

router.post('/login', (req,res) => { 
    const { username, password } = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if(!user) {return res.status(404).send({ message : "USER NOT FOUND"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid) {return res.status(401).send({ message : "INVALID PASSWORD"})}

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503) //server fault 
    }
})

module.exports = router