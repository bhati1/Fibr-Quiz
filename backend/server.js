const express = require('express')
const {PORT} = require('./constants')

const app = express()
const dbConfig = require('./config/dbConfig')

const userRoutes = require('./routes/userRoutes')
const quizRoutes = require('./routes/quizRoutes')
const participateRoutes = require('./routes/participateRoutes')
app.use(express.json())

// This is to test whether calls are right
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// user routes
app.use('/users', userRoutes)

// All CRUD operations to quiz & questions.
app.use('/quizes', quizRoutes)

// 
app.use('/participate', participateRoutes)

app.listen(PORT, ()=>{
    console.log("Server Listening on port ", PORT)
})