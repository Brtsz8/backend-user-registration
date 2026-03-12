const express = require('express')
const path = require('path')

const app = express()
const PORT = process.nextTick.PORT || 5000

app.listen(PORT, () => {
    console.log('server start')
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"..", "public", "index.html"))
})