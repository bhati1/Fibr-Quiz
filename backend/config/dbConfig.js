const { error } = require('console')
const mongoose = require('mongoose')
const {MONGO_URI}  = require('../constants')
mongoose.connect(MONGO_URI)

// console.log(process.env.MONGO_URL)
const connection = mongoose.connection

connection.on('connected', ()=>{
    console.log('connected to mongo')
})

connection.on('error', (err)=>{
    console.log('failed to connect to mongo')
})

module.exports = {
    connection
}