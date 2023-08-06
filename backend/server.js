const express = require('express')
const {PORT} = require('./constants')

const app = express()
const dbConfig = require('./config/dbConfig')

const userRoutes = require('./routes/userRoutes')
const quizRoutes = require('./routes/quizRoutes')
app.use(express.json())

// user routes
app.use('/users', userRoutes)

// All CRUD operations to quiz & questions.
app.use('/quiz', quizRoutes)

app.listen(PORT, ()=>{
    console.log("Server Listening on port ", PORT)
})