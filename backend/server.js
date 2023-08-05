const express = require('express')
const {PORT} = require('./constants')

const app = express()
const dbConfig = require('./config/dbConfig')

const userRoutes = require('./routes/userRoutes')
app.use(express.json())

// user routes
app.use('/users', userRoutes)

app.listen(PORT, ()=>{
    console.log("Server Listening on port ", PORT)
})