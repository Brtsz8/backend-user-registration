const express = require('express')
const path = require('path')
const { json } = require('stream/consumers')
const authRoutes = require('./routes/authRoutes.js')
const todoRoutes = require('./routes/todoRouts.js')

const app = express()
const PORT = process.nextTick.PORT || 5000

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

//to działa na takiej zasadzie że wszystkie ścieżki zawarte w 
//authRuets bedą doklejona do końca auth czyli np. /auth/register ect
app.use('/auth', authRoutes)
app.use('/todo', todoRoutes)

app.listen(PORT, () => {
    console.log('server start')
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})